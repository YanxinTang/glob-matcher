import React, { useState } from 'react';
import './App.css';
import DropZone from './components/DropZone/DropZone';
import Main from './components/Main/Main';

function App() {

  const [fileTree, setFileTree] = useState<DirType>()

  const fileTreeChangedHandler = (root: DirType) => {
    setFileTree(root);
    console.log('file tree changed')
  }

  return (
    <div className="App">
      { 
        fileTree
        ? <Main tree={fileTree}/>
        : <DropZone onFileTreeChaned={fileTreeChangedHandler} />
      }
    </div>
  );
}

export default App;
