/// <reference types="react-scripts" />

type FileNode = {
  name: string,
  path: string,
  type: NodeType.File,
  active: boolean,
  siblingActive: boolean,
}

type DirNode = {
  name: string,
  path: string,
  type: NodeType.Dir,
  children: Array<FileOrDir>,
  active: boolean,
  siblingActive: boolean,
}

type FileOrDir = FileNode | DirNode;

type Matcher = {
  pattern: string,
  type: MatcherType,
}