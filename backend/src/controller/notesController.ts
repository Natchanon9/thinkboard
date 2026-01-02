import { Request, Response } from "express";
import Note from "../models/Note";

export async function getAllNotes(req: Request, res: Response) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export function createNote(req: Request, res: Response) {
  res.status(200).send("Note created successfully");
}

export function updateNote(req: Request, res: Response) {
  res.status(200).send("Note updated successfully");
}

export function deleteNote(req: Request, res: Response) {
  res.status(200).send("Note deleted successfully");
}

export function getNoteById(req: Request, res: Response) {
  res.status(200).send("Note fetched successfully");
}
