import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

const MyEditor = ({ editorState, setEditorState }) => {
  const editor = React.useRef(null);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not handled";
  };

  const _onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const _onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const _onStrikeThroughClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  }

  const _onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  }

  return (
    <div className="border-2 border-gray-300 h-fit w-96 m-4 m-x-auto">
      <Editor
        ref={editor}
        placeholder="What are your thoughts?"
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
      />
      <div >
      <button className="text-sm font-bold py-2 px-4 rounded" onClick={_onBoldClick}>Bold</button>
      <button className="text-sm font-bold italic py-2 px-4 rounded" onClick={_onItalicClick}>Italic</button>
      <button className="text-sm font-bold italic py-2 px-4 rounded" onClick={_onStrikeThroughClick}>StrikeThrough</button>
      <button className="text-sm font-bold italic py-2 px-4 rounded" onClick={_onUnderlineClick}>Underline</button>
      </div>
    </div>
  );
};

const styles = {
  editor: {
    border: "1px solid gray",
    minHeight: "6em",
  },
};

export default MyEditor;
