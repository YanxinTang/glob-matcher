import React from 'react';
import './Main.css';
import Tree from '../Tree/Tree';
import Match from '../Match/Match';

type Props = {
  tree: FileOrDir,
  matcher: Matcher,
  onMatcherChanged: (matcher: Matcher) => void,
}

function Main(props: Props) {

  return (
    <div className="main">
      <div className="tree-wrapper">
        <h1>tree</h1>
        <Tree node={props.tree} />
      </div>
      <div className="matcher-wrapper">
        <Match onMatcherChanged={props.onMatcherChanged} matcher={props.matcher}/>
      </div>
    </div>
  )
}

export default Main;