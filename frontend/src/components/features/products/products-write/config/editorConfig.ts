export const editorConfig = {
  namespace: "ProductEditor",
  theme: {
    paragraph: "editorParagraph",
    text: {
      bold: "textBold",
      italic: "textItalic",
      underline: "textUnderline",
      strikethrough: "textStrikethrough",
    },
  },
  onError: (error: Error) => {
    console.error(error);
  },
};




