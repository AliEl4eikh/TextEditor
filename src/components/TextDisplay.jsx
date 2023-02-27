import React from "react";
import { convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

function TextDisplay({ editorState }) {
  const contentState = editorState.getCurrentContent();
  const rawContent = convertToRaw(contentState);

  const html = rawContent.blocks.map((block) => {
    let { text, inlineStyleRanges } = block;
    // sort the array to apply the longer style first so we don't have problems in text
    inlineStyleRanges.sort(function (a, b) {
      return b.length - a.length;
    });
    inlineStyleRanges.forEach((style) => {
      let startIndex = getOffset(text, style.offset);
      let word = text.substring(startIndex, startIndex + style.length);
      let styledWord;
      let endIndex = startIndex + style.length;
      if (style.style === "BOLD") {
        styledWord = `<b>${word}</b>`;
      } else if (style.style === "ITALIC") {
        styledWord = `<i>${word}</i>`;
      } else if (style.style === "STRIKETHROUGH") {
        styledWord = `<s>${word}</s>`;
      } else if (style.style === "UNDERLINE") {
        styledWord = `<u>${word}</u>`;
      }
      text = text.slice(0, startIndex) + styledWord + text.slice(endIndex);
    });
    return text;
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function getOffset(string, index) {
  let isInsideTag = false;
  let j = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i - 1] === ">") {
      isInsideTag = false;
    }
    if (string[i] === "<") {
      isInsideTag = true;
    }
    if (isInsideTag === true) {
      continue;
    } else if (isInsideTag === false && j === index) {
      return i;
    }
    j++;
  }
}

export default TextDisplay;


