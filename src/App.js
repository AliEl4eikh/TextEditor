import './App.css';
import React, {useState} from "react";
import { EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import MyEditor from "./components/MyEditor.jsx";
import TextDisplay from "./components/TextDisplay.jsx"

function App() {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );  

  return (
  <>
    <MyEditor editorState={editorState} setEditorState={setEditorState} />
    <TextDisplay editorState={editorState}/>
  </>
  )
}

export default App;
