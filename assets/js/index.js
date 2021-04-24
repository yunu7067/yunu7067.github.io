var index = new FlexSearch({
  preset: "score",
  cache: true,
  doc: {
    id: "id",
    field: ["title", "description", "content"],
    store: ["href", "title", "description"],
  },

  encode: false,
  tokenize: function (str) {
    return str.replace(/[\x00-\x7F]/g, "").split("");
  },
});
