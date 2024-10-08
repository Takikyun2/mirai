import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";

// validacao de dados

const userSchema = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

// função para registrar um novo usuario
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body; // pega os dados da requisição

  const { error } = userSchema.validate(req.body); // valida os dados
  if (error) {
    res.status(400).json({ error: error.details[0].message }); // retorna o erro
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10); // encripta a senha

  try {
    // tenta registrar o usuario
    const user = await User.query().insert({
      // insere os dados na tabela
      username,
      email,
      password_hash: hashedPassword,
    });
    res.status(201).json(user); // retorna o novo usuario
  } catch (err) {
    // caso ocorra um erro
    res.status(400).json({ error: "erro ao registrar usuario" }); // retorna o erro
    console.error(err); // exibe o erro no console
  }
};

// função para logar um usuario
export const login = async (req: Request, res: Response) => {
  // pega os dados da requisição
  console.log(req.body); //  exibe os dados no console
  const { email, password } = req.body; // pega os dados da requisição

  try {
    const user = await User.query().findOne({ email }); // tenta encontrar o usuario

    if (!user) {
      res.status(401).json({ error: "Usuario não encontrado!" }); // retorna o erro
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash); // compara a senha

    if (!isPasswordValid) {
      res.status(401).json({ error: "Senha invalida!" }); // retorna o erro
      return;
    }

    const token = generateToken(user); // gera o token
    res.status(200).json({ token }); // retorna o token
  } catch (err) {
    res.status(500).json({ error: "Erro ao fazer login." }); // retorna o erro
  }
};

// função para autenticar um usuario
const generateToken = (user: any) => {
  return jwt.sign(
    // gera o token
    { id: user.id, username: user.username }, // dados
    process.env.JWT_SECRET || "secreta", // chave secreta
    { expiresIn: "1h" } // expira em 1h
  );
};
