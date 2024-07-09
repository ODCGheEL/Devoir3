export function truncateText(text, maxWords = 20) {
    if (!text) {
      return "";
    }
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords - 1).join(" ") + "...";
    }
    return text;
  }
  