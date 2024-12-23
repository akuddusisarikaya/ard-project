import { Request, Response } from "express";
import Case from "../models/case";

export const createCase = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = new Case(req.body);
    const newCase = await data.save();
    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ message: "Dosya oluşturulamadı", error });
  }
};

export const getAllCases = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cases = await Case.find();
    res.status(201).json(cases);
  } catch (error) {
    res.status(500).json({ message: "Dosyalar bulunamadı", error });
  }
};

export const getCaseByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const data = await Case.findById(id);
    if (!data) res.status(404).json({ message: "Dosya bulunamadı" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Dosya bulunamadı", error });
  }
};

export const deleteCase = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await Case.findByIdAndDelete(id);
    res.status(200).json({ message: "Dosya başarıyla silindi" });
  } catch (error) {
    res.status(500).json({ message: "Dosya silinemedi", error });
  }
};

export const updateCase = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const updatedCase = await Case.findByIdAndUpdate(id, newData, {
      new: true,
    });
    res.status(200).json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: "Dosya güncellenemedi", error });
  }
};

export const patchCase = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const updatedCase = await Case.findByIdAndUpdate(id, newData);
    res.status(200).json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: "Dosya güncellenemedi", error });
  }
};

export const addToCase = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { newCourt } = req.body;

    if (!newCourt) {
      res.status(400).json({ message: "veri bulunamadı" });
    }

    const updatedCase = await Case.findByIdAndUpdate(
      id,
      { $addToSet: { courts: newCourt } },
      { new: true, runValidators: true }
    );

    if (!updatedCase) {
      res.status(404).json({ message: "Avukat bulunamadı" });
    }
    res.status(200).json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const addToCaseNewDocs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {id} = req.params;
    const {newDocs} = req.body;
    if(!newDocs){
      res.status(400).json({message : "veri bulunamadı"});
    }
    const updatedCase = await Case.findByIdAndUpdate(
      id,
      {$addToSet: {docs : newDocs}},
      {new : true,runValidators : true}
    );
    if (!updatedCase) {
      res.status(404).json({ message: "Dava dosyası bulunamadı" });
    }
    res.status(200).json(updatedCase);

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
