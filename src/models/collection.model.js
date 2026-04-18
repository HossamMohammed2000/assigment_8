const Collection = {
  collection: "collections",

  validate(data) {
    if (!data.name || typeof data.name !== "string") {
      return "Name is required and must be a string";
    }

    if (data.items && !Array.isArray(data.items)) {
      return "Items must be an array";
    }

    if (data.items && !data.items.every((item) => typeof item === "string")) {
      return "All items must be strings";
    }

    return null;
  },
};

export default Collection;
