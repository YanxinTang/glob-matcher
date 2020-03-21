import React, { useState, useEffect } from 'react';
import './App.css';
import DropZone from './components/DropZone/DropZone';
import Main from './components/Main/Main';
import minimatch from 'minimatch';
import { MatcherType, NodeType } from './type';

function App() {
  const [fileTree, setFileTree] = useState<DirNode>()
  const [matcher, setMatcher] = useState<Matcher>({ pattern: '**/*', type: MatcherType.Glob });

  useEffect(() => {
    if (fileTree) {
      const newTree = patternTest(fileTree);
      setFileTree(newTree as DirNode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matcher])

  const fileTreeChangedHandler = (root: DirNode) => {
    setFileTree(patternTest(root) as DirNode);
  }

  const matcherChangedHandler = (matcher: Matcher): void => {
    setMatcher(matcher);
  }

  function patternTest(tree: FileOrDir): FileOrDir {
    if (tree.type === NodeType.File) {
      // glob pattern test
      let active = false;
      if (matcher.type === MatcherType.Glob && matcher.pattern) {
        active = minimatch(tree.path, matcher.pattern);
      }
      return {
        ...tree,
        active,
        siblingActive: false,   // pattern changed, siblingActive is uncertian, so set to false
      };
    }

    const dir: DirNode = {
      ...tree,
      children: [],
      siblingActive: false,   // pattern changed, siblingActive is uncertian, so set to false
    };

    const childrenLength = (tree as DirNode).children.length;
    let siblingActive = false;
    for (let i = 0; i < childrenLength; i++) {
      // traversal last child first
      const child = (tree as DirNode).children[childrenLength - i - 1];
      // use `unshift` to make last child at bottom of array
      dir.children.unshift(patternTest(child));
      // if one of next siblings is active, siblingActive should be true
      if (!siblingActive && i > 0) {
        siblingActive = dir.children[1].active;
      }
      if (siblingActive) {
        dir.children[0].siblingActive = true;
      }
    }

    return {
      ...dir,
      active: dir.children.some(child => child.active)
    }
  }

  return (
    <div className="App">
      { 
        fileTree
        ? <Main tree={fileTree} onMatcherChanged={matcherChangedHandler} matcher={matcher}/>
        : <DropZone onFileTreeChaned={fileTreeChangedHandler}/>
      }
    </div>
  );
}

export default App;
