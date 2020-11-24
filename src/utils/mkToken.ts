import jwt from "jsonwebtoken";

export const mkAccess = async (
  userId: string,
  admin: boolean,
  secret: string
): Promise<string> => {
  const token = await jwt.sign(
    {
      userId,
      admin,
    },
    secret,
    {
      expiresIn: "50000m",
    }
  );
  return token;
};
