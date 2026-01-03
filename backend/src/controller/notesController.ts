import { Request, Response } from "express";
import Note from "../models/Note";

export async function getAllNotes(_: Request, res: Response) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //newest first
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function getNoteById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.log("Error in getNoteById controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function createNote(req: Request, res: Response) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.log("Error in createNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req: Request, res: Response) {
  try {
    const { title, content } = req.body;
    const id = req.params.id;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error in updateNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(id, { new: true });
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
