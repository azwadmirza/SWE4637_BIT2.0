import { useState } from "react";

export const useQuill = () => {
  const [content, setContent] = useState<string>("");
  
  const contentModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      [{ size: [] }],
      [{ color: [] }, { background: [] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bulleted" }, { indent: "-1" }, { indent: "+1" }],
    ],
  };


  const getStringFromHtml = (html: string | null): string => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

  const handleQuillLengthCheck = (
    prevValue: string,
    change: string,
    maxLength: number,
    setChanges: (value: string) => void
  ) => {
    const stringContent = getStringFromHtml(change);
    if (stringContent.length <= maxLength) {
      setChanges(change);
    } else {
      setChanges(prevValue);
    }
  };


  return {
    content,
    setContent,
    getStringFromHtml,
    contentModules,
    handleQuillLengthCheck
  };
};
