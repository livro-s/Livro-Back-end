import crypto from "crypto";

export const hashPassword = async (password: string): Promise<string> => {
  return await crypto
    .createHmac(process.env.HASH_ALGORITHM, process.env.PW_HASH_KEY)
    .update(password)
    .digest()
    .toString();
};
