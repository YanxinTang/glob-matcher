import React from 'react';
import './Tree.css';
import { NodeType } from '../../type';

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
        {props.node.name}
      </div>
      {
        props.node.type === NodeType.Dir
        && nodeChildren
      }
    </div>
  )
}

export default Tree;