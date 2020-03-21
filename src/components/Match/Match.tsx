import React, { useState } from 'react';
import './Match.scss';
import { MatcherType } from '../../type';

type Props = {
  matcher: Matcher,
  onMatcherChanged: (matcher: Matcher) => void,
}

function Matcher(props: Props) {

  const [pattern, setPattern] = useState<string>(props.matcher.pattern)

  const onPatternChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPattern(event.target.value);
  }

  // Update pattern when press enter
  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.onMatcherChanged({ pattern, type: MatcherType.Glob });
    } else if (event.key === 'Escape') {
      setPattern('');
    }
  }

  return (
    <div className="matcher">
      <div className="matcher-form">
        <input
          type="text" 
          className="matcher-form_input"
          placeholder="Glob Pattern"
          value={pattern}
          onChange={onPatternChangedHandler}
          onKeyDown={onKeyPressHandler}
        />
      </div>
    </div>
  )
}

export default Matcher;