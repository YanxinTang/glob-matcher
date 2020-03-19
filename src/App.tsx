import React, { useState } from 'react';
import './App.css';
import DropZone from './components/DropZone/DropZone';

function App() {

  const [fileTree, setFileTree] = useState<FileOrDir[]>([])

  const fileTreeChangedHandler = (fileTree: FileOrDir[]) => {
    setFileTree(fileTree);
    console.log('file tree changed')
  }

  return (
    <div className="App">
      <DropZone
        onFileTreeChaned={fileTreeChangedHandler}
      ></DropZone>
    </div>
  );
}

export default App;
