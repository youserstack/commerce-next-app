import { createAccessToken, createRefreshToken } from "lib/server/utils/createJWT";
import User from "lib/server/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<signup>`);
  // get
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing payload" });
  // find
  const duplicatedUser = await User.findOne({ name }).exec();
  if (duplicatedUser) return res.status(409).json({ message: "Duplicated name" });
  // create
  const newUser = await User.create({ name, email, password });
  console.log({ newUser });
  // out
  res.status(201).json({ newUser });
};

export const signin = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<signin>`);
  // get
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required." });
  }
  // find
  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(401).json({ message: "Your email was not found" });
  }
  // compare
  const salt = 10; // 이동이 필요(서버 회원가입 핸들러에서 처리)
  const hashedPassword = await bcrypt.hash(foundUser.password, salt); // 이동이 필요(서버 회원가입 핸들러에서 처리)
  const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordMatched) return res.status(401).json({ message: "Invalid Password" });
  // issue the tokens
  const user = {
    _id: foundUser._id,
    name: foundUser.name,
    email: foundUser.email,
    role: foundUser.role,
    image: foundUser.image,
  };
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  // save
  foundUser.refreshToken = refreshToken;
  await foundUser.save();
  // out
  res.setHeader("Set-Cookie", [`refreshToken=${refreshToken};path=/`]);
  res.status(200).json({ user, accessToken });
  // log
  console.log({
    user: user,
    accessToken: accessToken.slice(-5),
    refreshToken: refreshToken.slice(-5),
  });
};

export const refresh = async (req: any, res: any) => {
  // console.log(`\x1b[32m\n<refresh>`);

  // get
  const { refreshToken } = req.cookies;
  // console.log({ refreshToken });
  if (!refreshToken) return res.status(401).json({ message: "No refreshToken" });

  // find
  const foundUser = await User.findOne({ refreshToken })
    // .select("-password -createdAt -updatedAt -refreshToken")
    .select("_id name email password role image")
    .exec();
  if (!foundUser) return res.status(401).json({ message: "The foundUser do not exist." });
  // verify the refreshToken
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    if (error) {
      console.log(`\x1b[31mThe refreshToken was expired.\x1b[0m`);
      return res.status(403).json({ error });
    }
  }

  // issue the new tokens
  const user = {
    _id: foundUser._id,
    name: foundUser.name,
    email: foundUser.email,
    role: foundUser.role,
    image: foundUser.image,
  };
  const newAccessToken = createAccessToken(user);
  const newRefreshToken = createRefreshToken(user);

  // save
  foundUser.refreshToken = newRefreshToken;
  const savedUser = await foundUser.save();

  // out
  res.setHeader("Set-Cookie", [`refreshToken=${newRefreshToken};path=/`]);
  res.status(200).json({ user, accessToken: newAccessToken });

  // log
  console.log({
    user: savedUser,
    // user: user,
    // accessToken: newAccessToken.slice(-5),
    // refreshToken: newRefreshToken.slice(-5),
  });
};
