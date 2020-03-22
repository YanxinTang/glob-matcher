import React, { useState, useEffect } from 'react';
import { AsciiTree } from 'oo-ascii-tree';
import { NodeType } from '../../type';
import './AsciiTree.scss';

type Props = {
  tree: FileOrDir,
}

function AsciiTreeViewer(props: Props) {
  const [ascii, setAscii] = useState<string>('');

  useEffect(() => {
    function _generate(tree: FileOrDir): AsciiTree {
      if (tree.type === NodeType.File) {
        return new AsciiTree(tree.name)
      }
      const asciiTree = new AsciiTree(tree.name);
      for (const child of (tree as DirNode).children) {
        if (child.active) {
          asciiTree.add(_generate(child));
        }
      }
      return asciiTree;
    }

    const asciiTree = _generate(props.tree);
    setAscii(asciiTree.toString())
  }, [props.tree])

  const onCopyClickHandler = () => {
    navigator.clipboard.writeText(ascii);
  }

  return (
    <div className="ascii-tree">
      <div className="toolbar">
        <button
          className="tool"
          onClick={onCopyClickHandler}
        >
          Copy
        </button>
      </div>
      <pre>
        <code>
          {ascii}
        </code>
      </pre>
    </div>
  )
}

export default AsciiTreeViewer;