import jwt from "jsonwebtoken";

export const mkAccess = async (
  uuid: string,
  admin: boolean,
  secret: string
): Promise<string> => {
  const token = await jwt.sign(
    {
      uuid,
      admin,
    },
    secret,
    {
      expiresIn: "50000m",
    }
  );
  return token;
};
