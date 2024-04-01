import disconnectDB from "lib/server/config/disconnectDB";

export default function handler(req: any, res: any) {
  try {
    disconnectDB();
    return res.status(200).json({ message: "Database is disconnected" });
  } catch (error) {
    return res.status(500).json(error);
  }
}
