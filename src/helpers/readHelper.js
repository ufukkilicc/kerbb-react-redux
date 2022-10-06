export const ReadHelper = (content) => {
  const wordCount = content.split(" ").length;
  const value = wordCount / 200;
  return parseInt(value) + 1;
};
