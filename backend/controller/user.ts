import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {name, user_name,password, role  } = req.body;
  try {
    const hashedPassword= await bcryptjs.hash(password, 10);
    const data = new User({name, user_name, role, password : hashedPassword});
    const newUser = data.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı eklenemedi", error });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: "Kullanıcılar bulunamadı" });
  }
};

export const getUserByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bulunamadı" });
  }
};

export const getAllLawyers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lawyers = await User.find({ role: "User" });
    res.status(200).json(lawyers);
  } catch (error) {
    res.status(500).json({ messsage: "Avukatlar bulunamadı", error });
  }
};

export const getAllAdmins = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const admins = await User.find({ role: "Admin" });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Adminler bulunamadı", error });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Kullanıcı başarıyla silindi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Kullanıcı silme işlemi başarısız", error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const updatedUser = User.findByIdAndUpdate(id, newData, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı güncellenmedi", error });
  }
};

export const patchUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const updatedUser = User.findByIdAndUpdate(id, newData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı güncellenmedi", error });
  }
};

export const addToUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const {newCase} = req.body;

  if(!newCase) {
    res.status(400).json({message: "veri bulunamadı"});
  }

  const updatedLawyer = await User.findByIdAndUpdate(
    id,
    { $addToSet : {cases :newCase}},
    {new : true, runValidators: true}
  )

  if(!updatedLawyer){
    res.status(404).json({ message: 'Avukat bulunamadı' });
  }
  res.status(200).json(updatedLawyer);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }


}