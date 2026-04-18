const Log = {
  collection: "logs",

  validate(data) {
    if (!data.action || typeof data.action !== "string") {
      return "Action is required and must be a string";
    }

    return null;
  },

  format(data) {
    return {
      ...data,
      date: data.date ? new Date(data.date) : new Date(), // زي default Date.now
    };
  },
};

export default Log;
