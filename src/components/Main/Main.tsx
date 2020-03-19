import React from 'react';
import './Main.css';
import Tree from '../Tree/Tree';

type Props = {
  tree: FileOrDir,
}

function Main(props: Props) {
  return (
    <div className="main">
      <div className="tree-wrapper">
        <h1>tree</h1>
        <Tree node={props.tree}/>
      </div>
      <div className="glob-wrapper">
        <h1>glob</h1>
      </div>
    </div>
  )
}

export default Main;