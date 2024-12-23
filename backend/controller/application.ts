import { Request, Response } from "express";
import Application from "../models/application";

export const createApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = new Application(req.body);
    const newApplication = await data.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({ message: "Başvuru kaydı yapılamadı", error });
  }
};

export const getAllApplications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const applications = await Application.find();
    res.status(201).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Başvular bulunmadı", error });
  }
};

export const getCasebleApplications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const casebleApplications = await Application.find({ caseble: true });
    res.status(201).json(casebleApplications);
  } catch (error) {
    res.status(500).json({ message: "Başvurular alınamadı", error });
  }
};

export const getUncasebleApplications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const uncasebleApplications = await Application.find({ caseble: false });
    res.status(201).json(uncasebleApplications);
  } catch (error) {
    res.status(500).json({ message: "Başvurular bulunamadı", error });
  }
};

export const getApplicationByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await Application.findById(id);
    if (!data) {
      res.status(404).json({ message: "Başvuru bulunmadı" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Başvuru bulunmadı", error });
  }
};

export const deleteApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await Application.findByIdAndDelete(id);
    res.status(200).json({ message: "Başvuru başarıyla silindi" });
  } catch (error) {
    res.status(500).json({ message: "Başvuru silinirken hata oluştu", error });
  }
};

export const updateApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      newData,
      { new: true }
    );
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: "Başvuru güncellmesi başarısız", error });
  }
};

export const patchApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const updatedApplication = await Application.findByIdAndUpdate(id, newData);
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: "Başvuru güncellmesi başarısız", error });
  }
};
