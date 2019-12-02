import React, { useState } from 'react';
import './Anamation';
import Animation from './Anamation';

/**
 * @description 获取className
 * @param {string} inner 'showing' | 'fading'
 * @returns {object} return one react component
 */
function App () {
  const [isShow, setIsShow] = useState(false);
  const handleClick = () => {
    setIsShow(!isShow);
  };
  return (
    <div className="wrapper">
      <button onClick={handleClick}>toggle</button>
      <Animation isShow={isShow} name="demo">
        <div className="demo">demo</div>
      </Animation>
    </div>
  );
}

export default App;
