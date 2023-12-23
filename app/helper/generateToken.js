import jwt from "jsonwebtoken";
export async function generateToken(savedUser) {
  const tokenContent = {
    user_id: savedUser._id,
    user_name: savedUser.name,
    user_email: savedUser.email,
  };
  const token = await jwt.sign(tokenContent, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  return token;
}
