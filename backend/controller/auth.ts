import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/user";
dotenv.config();
export const login = async (req: Request, res: Response): Promise<void> => {
  const { user_name, password } = req.body;
  const masterAdmin = process.env.USER_EMAIL;
  try {
    // Master Admin Kontrolü
    if (user_name === masterAdmin) {
      if (authenticateMasterAdmin(user_name, password)) {
        const token = generateAdminToken(user_name);
        res.status(200).json({ ok: true, message: "Giriş başarılı", token });
        return; // Yanıt gönderildikten sonra fonksiyonu bitiriyoruz
      } else {
        res.status(401).json({ error: "Eksik bilgi" });
        return; // Yanıt gönderildikten sonra fonksiyonu bitiriyoruz
      }
    }
    // Kullanıcı Bulma ve Şifre Doğrulama
    const user = await User.findOne({ user_name });
    if (!user) {
      res.status(404).json({ error: "Kullanıcı bulunamadı" });
      return; // Yanıt gönderildikten sonra fonksiyonu bitiriyoruz
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Parola yanlış" });
      return; // Yanıt gönderildikten sonra fonksiyonu bitiriyoruz
    }
    // Kullanıcı Rolü Kontrolü
    if (["Admin", "admin", "ADMIN"].includes(user.role)) {
      const token = generateAdminToken(user_name);
      res.status(200).json({ message: "Giriş başarılı", token, user });
      return; // Yanıt gönderildikten sonra fonksiyonu bitiriyoruz
    }
    // Token Üretimi
    const token = generateUserToken(user_name);
    res.status(200).json({ message: "Giriş başarılı", token, user });
  } catch (error) {
    console.error("Giriş hatası :", error);
    res.status(500).json({ error: "Giriş yapılamadı" });
  }
};
export const register = async (req: Request, res: Response) => {
  const {name, user_name, password, role } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({name, user_name, role, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Kullanıcı kaydı başarılı" });
  } catch (error) {
    console.error("Kayıt hatası:", error);
    res.status(500).json({ error: "Kullanıcı kaydı başarısız" });
  }
};
export const authenticateMasterAdmin = (
  username: string,
  password: string
): boolean => {
  const envUser = process.env.USER_EMAIL;
  const envPassword = process.env.USER_PASSWORD;
  return username === envUser && password === envPassword;
};
export const findUserRole = async (
  user_name: string
): Promise<"error" | "Admin" | "User"> => {
  try {
    const user = await User.findOne({ user_name });
    if (!user) return "error";
    return ["admin", "Admin", "ADMIN"].includes(user.role) ? "Admin" : "User";
  } catch (error) {
    console.error("Kullanıcı rol hatası:", error);
    return "error";
  }
};
export const generateUserToken = (user_name: string): string => {
  const jwtSecret = process.env.USER_JWT_SECRET as string;
  return jwt.sign({ user_name }, jwtSecret, { expiresIn: "1h" });
};
export const generateAdminToken = (user_name: string): string => {
  const jwtSecret = process.env.ADMIN_JWT_SECRET as string;
  return jwt.sign({ user_name }, jwtSecret, { expiresIn: "1h" });
};