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
      expiresIn: "10m",
    }
  );
  return token;
};

export const mkRefresh = async (
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
      expiresIn: "1w",
    }
  );
  return token;
};
