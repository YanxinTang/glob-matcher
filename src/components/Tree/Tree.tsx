import React from 'react';
import './Tree.css';
import { NodeType } from '../../type';

type Props = {
  node: FileOrDir,
}

function Tree (props: Props) {
  let nodeChildren;
  if (props.node.type === NodeType.Dir) {
    nodeChildren = (props.node as DirType).children.map(node => (
      <Tree node={node} key={node.path + node.name}/>
    ))
  }

  return (
    <div className="node">
      <div className="node-path">
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