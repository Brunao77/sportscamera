import { jwtVerify } from "jose";

export const authenticateUser = async (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) return res.status(401).json({ message: "Acceso no autorizado" });

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      jwt,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );

    req.user_id = payload.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
