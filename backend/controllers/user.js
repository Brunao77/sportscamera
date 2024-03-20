import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Los campos son requeridos" });

    const user = await this.userModel.findWithEmail({ email });
    console.log(user);

    if (!user)
      return res.status(401).json({ error: "Credenciales incorrectas" });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res.status(400).json({ error: "Credenciales incorrectas" });

    const jwtConstructor = new SignJWT({ id: user.user_id });

    const encoder = new TextEncoder();
    const jwt = await jwtConstructor
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuedAt()
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    res.cookie("jwt", jwt, { httpOnly: true });

    return res.send({ message: "Inicio de sesión exitoso." });
  };

  signup = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Los campos son requeridos" });

    const user = await this.userModel.findWithEmail({ email });

    if (user) return res.status(400).json({ error: "Email ya registrado" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await this.userModel.signup({
      email,
      password: hashedPassword,
    });

    if (newUser)
      return res.status(200).json({ message: "Usuario creado con exito" });

    return res.status(400).json({ error: "Usuario no creado" });
  };

  profile = async (req, res) => {
    const { user_id } = req;
  };
}
