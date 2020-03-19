/// <reference types="react-scripts" />

declare global {
  enum NodeType {
    File = 0,
    Dir
  }  
}

type FileType = {
  name: string,
  path: string,
  type: NodeType.File,
}

type DirType = {
  name: string,
  path: string,
  type: NodeType.Dir,
  children: Array<FileOrDir>,
}

type FileOrDir = FileType | DirType;