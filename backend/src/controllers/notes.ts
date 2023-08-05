import { RequestHandler } from "express";
import NoteModel from "./../models/note";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    const note = await NoteModel.findById(noteId).exec();
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote: RequestHandler = async (req, res, next) => {
  const { title, text, from, to } = req.body;

  try {
    const newNote = await NoteModel.create({
      title,
      text,
      from,
      to,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
