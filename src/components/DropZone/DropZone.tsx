import React, { useState } from 'react';
import './DropZone.css';

function DropZone() {

  const [active, setActive] = useState(false);

  const dragEnterHandler = (event: React.DragEvent<HTMLDivElement>) => {
    setActive(true);
  }

  const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
    setActive(false);
  }

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const df = event.dataTransfer;

    console.log(event)
  }

  return (
    <div
      className={`dropzone ${ active ? 'active' : '' }`} 
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      <h1>DropZone</h1>
    </div>
  )
}

export default DropZone;