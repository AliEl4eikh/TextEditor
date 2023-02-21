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

  return (
    <div style={styles.editor}>
      <Editor
        ref={editor}
        placeholder="What are your thoughts?"
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
      />
      <button onClick={_onBoldClick}>Bold</button>
      <button onClick={_onItalicClick}>Italic</button>
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
