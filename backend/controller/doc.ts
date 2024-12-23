import { Request, Response } from "express";
import Doc from "../models/doc";


export const createDoc = async (req : Request, res: Response): Promise<void> => {
    try {
        const data = new Doc(req.body);
        const newDoc = await data.save();
        res.status(201).json(newDoc);
    } catch (error) {
        res.status(500).json({message:"Döküman eklenemedi", error});
    }
};

export const getAllDocs = async (req : Request, res: Response): Promise<void> => {
    try {
        const docs = await Doc.find();
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).json({message: "Dökümanlar bulunamadı", error});
    }
};

export const getDocByID = async (req : Request, res: Response): Promise<void> => {
    const {id} = req.params;
    try {
        const doc = await Doc.findById(id);
        res.status(200).json(doc);
    } catch (error) {
        res.status(500).json({message:"Döküman bulunamadı", error});
    }
}

export const deleteDoc = async (req : Request, res: Response): Promise<void> => {
    const {id} = req.params;
    try {
        await Doc.findByIdAndDelete(id);
        res.status(200).json({message:"Döküman başarıyla silindi"});
    } catch (error) {
        res.status(500).json({message:"Döküman silinemedi"})
    }
}

export const updateDoc = async (req : Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const newData = req.body;

    try {
        const newDoc = await Doc.findByIdAndUpdate(id, newData, {new:true});
        res.status(200).json(newDoc);
    } catch (error) {
        res.status(500).json({message:"Döküman güncellenemedi", error});
    }
};

export const patchDoc = async (req : Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const newData = req.body;

    try {
        const newDoc = await Doc.findByIdAndUpdate(id, newData);
        res.status(200).json(newDoc);
    } catch (error) {
        res.status(500).json({message:"Döküman güncellenemedi", error});
    }
};

