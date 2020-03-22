import React from 'react';
import './Tree.scss';
import { NodeType } from '../../type';
import { ReactComponent as FileIcon } from '@/assets/icons/file.svg';
import { ReactComponent as DirIcon } from '@/assets/icons/folder.svg';

type Props = {
  node: FileOrDir,
}

function Tree (props: Props) {
  let nodeChildren;
  if (props.node.type === NodeType.Dir) {
    nodeChildren = (props.node as DirNode).children.map(node => (
      <Tree node={node} key={node.path + node.name} />
    ))
  }

  return (
    <div className={`node${ props.node.active ?  ' active' : '' }${ props.node.siblingActive ? ' sibling-active' : ''}`}>
      <div className="node-path" title={props.node.name}>
        { props.node.type === NodeType.File ? <FileIcon className="node-path_icon--file"/> : <DirIcon className="node-path_icon--dir"/> }
        <span className="node-path_value">{props.node.name}</span>
      </div>
      {
        props.node.type === NodeType.Dir
        && nodeChildren
      }
    </div>
  )
}

export default Tree;