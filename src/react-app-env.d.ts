/// <reference types="react-scripts" />

type FileType = {
  name: string,
  path: string,
  type: 0,
}

type DirType = {
  name: string,
  path: string,
  type: number,
  children: Array<FileOrDir>,
}

type FileOrDir = FileType | DirType;