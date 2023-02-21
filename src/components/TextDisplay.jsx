import React from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

function TextDisplay({ editorState }) {
  const contentState = editorState.getCurrentContent();
  const rawContent = convertToRaw(contentState);

  const html = rawContent.blocks.map((block) => {
    let { text, inlineStyleRanges } = block;
    inlineStyleRanges.forEach((style) => {
      let startIndex = getOffset(text, style.offset);
      let endIndex = startIndex + style.length;
      let word = text.substring(startIndex, endIndex);
      if (style.style == "BOLD") {
        text =
          text.slice(0, startIndex) +
          `<span style="font-weight: bold">${word}</span>` +
          text.slice(endIndex);
      } else if (style.style == "ITALIC") {
        text =
          text.slice(0, startIndex) +
          `<span style="font-style: italic">${word}</span>` +
          text.slice(endIndex);
      }
    });

    return text;
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function getOffset(string, index) {
  let isInsideTag = false;
  let j = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i - 1] == ">") {
      isInsideTag = false;
    }
    if (string[i] == "<") {
      isInsideTag = true;
    }
    if (isInsideTag == true) {
      continue;
    } else if (isInsideTag == false && j == index) {
      return i;
    }
    j++;
  }
}

export default TextDisplay;


