const Book = {
  collection: "books",

  validate(data) {
    if (!data.title || typeof data.title !== "string") {
      return "Title is required and must be a string";
    }
    if (!data.author || typeof data.author !== "string") {
      return "Author is required and must be a string";
    }
    if (data.year && typeof data.year !== "number") {
      return "Year must be a number";
    }
    return null;
  },
};

export default Book;
