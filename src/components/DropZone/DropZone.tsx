import React, { useState, useEffect } from 'react';
import './DropZone.css';
import { NodeType } from '../../type';

type Props = {
  onFileTreeChaned: (root: DirType) => void,
}

function DropZone(props: Props) {
  // Control drop zone background
  const [active, setActive] = useState<boolean>(false);
  // Save dataTransfer from drop event 
  const [dataTransfer, setDataTransfer] = useState<DataTransfer>()

  const dragEnterHandler = (event: React.DragEvent<HTMLDivElement>) => {
    setActive(true);
  }

  const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
    setActive(false);
  }

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    // Prevent default handler of dragOver event to make drop event fired
    event.preventDefault();
  }

  const dropHandler = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setActive(false);
    const children = await readDataTransfer(event.dataTransfer);
    const root: DirType = {
      name: '/',
      path: '/',
      type: NodeType.Dir,
      children,
    }
    props.onFileTreeChaned(root);
  }


  /**
   * Async read data transfer
   */  
  async function readDataTransfer(df: DataTransfer) : Promise<Array<FileOrDir>> {
    const traverseFileTreePromises: Array<Promise<FileOrDir | undefined>> = [];
    for (var i = 0; i < df.items.length; i++) {
      var entry = df.items[i].webkitGetAsEntry();
      traverseFileTreePromises.push(traverseFileTree(entry));
    }
    const result = await Promise.all(traverseFileTreePromises);
    return  result.filter<FileOrDir>((tree): tree is FileOrDir => tree !== undefined);
  }

  /**
   * Traverse file tree
   */
  async function traverseFileTree(entry: any, path: string = '/') : Promise<FileOrDir | undefined> {
    if (entry.isFile) {
      return await new Promise<FileType>((resolve) => {
        entry.file((file: any) => {
          resolve({
            name: file.name,
            path: path,
            type: 0,
          })
        });
      });
    } else if (entry.isDirectory) {
      return await new Promise<DirType>((resolve) => {
        var dirReader = entry.createReader();
        dirReader.readEntries(async (entries: any) => {
          const result: DirType = {
            name: entry.name,
            path: path,
            type: 1,
            children: [],
          };
          for (var i = 0; i < entries.length; i++) {
            const tree = await traverseFileTree(entries[i], path + entry.name);
            if (tree) {
              result.children.push(tree)
            }
          }
          resolve(result);
        });
      });
    }
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