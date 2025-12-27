import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function getUserById(userId: string) {
  return User.findById(userId).select("-password");
}
