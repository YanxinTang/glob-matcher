import React from 'react';
import './Main.scss';
import Tree from '../Tree/Tree';
import Match from '../Match/Match';
import { MatcherType } from '../../type';

type Props = {
  tree: FileOrDir,
  matcher: Matcher,
  changeMatcher: (matcher: Matcher) => void,
  changeFileTree: (root: DirNode|null) => void,
}

function Main(props: Props) {

  const onBackClickHandler = () => {
    props.changeMatcher({ pattern: '**/*', type: MatcherType.Glob });
    props.changeFileTree(null);
  }

  return (
    <div className="main">
      <div className="tree-wrapper">
        <button
          className="back-button"
          onClick={onBackClickHandler}
        >
          BACK
        </button>
        <Tree node={props.tree} />
      </div>
      <div className="matcher-wrapper">
        <Match changeMatcher={props.changeMatcher} matcher={props.matcher}/>
      </div>
    </div>
  )
}

export default Main;