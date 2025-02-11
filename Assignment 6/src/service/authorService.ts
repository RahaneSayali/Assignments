import Author from "../models/Author";

export const getAuthors = async () => {
  try {
    return await Author.findAll();
  } catch (error: any) {
    throw new Error("Failed to fetch authors" + error.message);
  }
};

export const createAuthor = async (
  name: string,
  bio?: string,
  birthdate?: Date
) => {
  try {
    const newAuthor = await Author.create({ name, bio, birthdate });
    return newAuthor;
  } catch (error: any) {
    throw new Error("Failed to create author: " + error);
  }
};

export const getAuthor = async (id: string) => {
  try {
    const author = await Author.findByPk(id);
    return author;
  } catch (error) {
    throw new Error("Failed to fetch author" + error);
  }
};

export const updateAuthor = async (id: string, updateData: any) => {
  try {
    const author = await Author.findByPk(id);
    if (!author) {
      return null;
    }
    const updatedAuthor = await author.update(updateData);
    return updatedAuthor;
  } catch (error) {
    throw new Error("Failed to update author" + error);
  }
};

export const deleteAuthor = async (id: string) => {
  try {
    const author = await Author.findByPk(id);
    if (!author) {
      return null;
    }
    await author.destroy();
    return author;
  } catch (error) {
    throw new Error("Failed to delete author" + error);
  }
};
