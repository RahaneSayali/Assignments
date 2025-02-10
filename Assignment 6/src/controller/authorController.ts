import { Request, Response } from "express";
import * as authorService from "../service/authorService";
import { getAuthor } from "../service/authorService";

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await authorService.getAuthors();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching authors" });
  }
};

export const addAuthor = async (req: Request, res: Response) => {
  try {
    const { name, bio, birthdate } = req.body;
    if (!name) {
      res.status(400).json({ message: "Name is required" });
      return;
    }
    const newAuthor = await authorService.createAuthor(name, bio, birthdate);
    res.status(201).json(newAuthor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchAuthorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const author = await getAuthor(id);

    if (!author) {
      res.status(404).json({ message: "Author not found" });
      return;
    }
    res.status(200).json(author);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
