import jwt from 'jsonwebtoken';

interface IUser {
  _id: string;
  username: string;
  email: string;
}

interface Headers {
  [key: string]: string;
}

async function generateJwt(user: IUser): Promise<string | null> {
  try {
    const payload = {
      sub: user._id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    };

    const token = await jwt.sign(payload, process.env._SECRET_KEY as string, { algorithm: 'HS256' });
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default generateJwt;
