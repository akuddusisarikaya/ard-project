import { Request, Response } from "express";
import Court from "../models/court";

export const createCourt = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = new Court(req.body);
    const newCourt = await data.save();
    res.status(201).json(newCourt);
  } catch (error) {
    res.status(500).json({ message: "Mahkeme kayıdı yapılamadı", error });
  }
};

export const getCourtByCaseID = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const data = await Court.find({ case_number: id });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Mahkeme bulunamadı", error });
  }
};

export const getCourtByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const court = await Court.findById(id);
    res.status(201).json(court);
  } catch (error) {
    res.status(500).json({ message: "Mahkeme bulunamadı", error });
  }
};

export const deleteCourt = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await Court.findByIdAndDelete(id);
    res.status(200).json({ message: "Mahkeme verisi silindi" });
  } catch (error) {
    res.status(500).json({ message: "Mahkeme verisi silinemedi", error });
  }
};

export const updateCourt = async (
  req: Request,
  res: Response
): Promise<void> => {
    const {id} = req.params;
    try {
        const data = await req.body
        const updatedCourt = await Court.findByIdAndUpdate(id, data, {new:true});
        res.status(200).json({message : "Mahkeme verisi güncellendi", updatedCourt})
    } catch (error) {
        res.status(500).json({message: "Mahkeme verisi güncellenmedi"})
    }
};

export const patchCourt = async (
    req: Request,
    res: Response
  ): Promise<void> => {
      const {id} = req.params;
      try {
          const data = await req.body
          const updatedCourt = await Court.findByIdAndUpdate(id, data);
          res.status(200).json({message : "Mahkeme verisi güncellendi", updatedCourt})
      } catch (error) {
          res.status(500).json({message: "Mahkeme verisi güncellenmedi"})
      }
  };
