import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import connectDB from "lib/server/config/connectDB";
import User from "lib/server/models/User";
import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        await connectDB();

        console.log("\n[...nextauth]/authorize");

        // if (!credentials) throw new Error("No credentials");

        // get
        const { email, password }: any = credentials;

        // find
        const user = await User.findOne({ email })
          // .select("+username +email +role +image")
          .select("-refreshToken -createdAt -updatedAt -__v")
          .exec();
        if (!user) throw new Error("Invalid Email");
        // console.log({ user });

        // compare
        const salt = 10; // 이동이 필요(서버 회원가입 핸들러에서 처리)
        const hashedPassword = await bcrypt.hash(user.password, salt); // 이동이 필요(서버 회원가입 핸들러에서 처리)
        // console.log({ hashedPassword });
        const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordMatched) throw new Error("Invalid Password");

        return user; // 리턴값은 jwt의 user property에 저장한다.
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    // credentials을 통해서 로그인시, providers authorize(인가)를 실행후, signIn을 실행한다.
    signIn({ user, account, profile }) {
      console.log("\n[...nextauth]/signIn", { user, account });
      // if (account?.provider === "naver") return true;
      return true;
    },

    // client token (jwt)
    async jwt({ token, user, account, trigger, session }: any) {
      // console.log("\n[...nextauth]/jwt");

      // 토큰에 유저데이터를 저장한다.
      // user : returned by authorize function
      // account : returned by oauth provider?
      if (user) token.user = user; // credentials
      if (account) token.account = account; // oauth

      // client에서 session update를 trigger한 경우, 토큰을 업데이트한다.
      // console.log({ trigger, session });
      if (trigger === "update") {
        token.user = session.user;
        console.log({ token });
        return token;
      }

      // console.log({ token });
      return token;
    },

    // server session
    async session({ session, token }: any) {
      // server session 에 user token 을 저장한다.
      // token : returned by jwt function
      if (token.user) session.user = token.user; // credentials
      if (token.account) session.account = token.account; // oauth

      // console.log("\n[...nextauth]/session", { session });

      return session;
    },
  },

  pages: { signIn: "/auth/signin" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
