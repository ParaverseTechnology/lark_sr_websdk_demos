import { useState } from 'react';
import './mouseButton.scss';

export default function MouseButton(props) {

  const [isPressed, setIsPressed] = useState(false);
  const [dragStarted, setDragStarted] = useState(false);
  const [lastMovePositon, setLastMovePositon] = useState({
      x: 0,
      y: 0,
  });

  const onTouchStart = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    props.touchstart(e);
    setIsPressed(true);
  };
  const onTouchMove = (e) => {
      // e.preventDefault();
      e.stopPropagation();
      // props.touchmove(e);
      const current = {
          x: e.targetTouches[0].clientX,
          y: e.targetTouches[0].clientY,
      } ;
      if (!dragStarted) {
        setDragStarted(true);
        setLastMovePositon(current);
        return;
      }
      const motion = {
          x: current.x - lastMovePositon.x, 
          y: current.y - lastMovePositon.y ,
      };
      props.drag(motion);
      setLastMovePositon(current);
  };
  const onTouchEnd = (e) => {
      // e.preventDefault();
      e.stopPropagation();
      props.touchend(e);
      setIsPressed(false);
      setDragStarted(false);
  }
  return(
    // onTouchCancle={onTouchEnd}
    <div className={`vmouse${props.classNameStr?props.classNameStr:''}`}
        style={props.style}
        onTouchStart={onTouchStart} 
        onTouchMove={onTouchMove} 
        onTouchEnd={onTouchEnd} >
        {props.content}
    </div>
  )
}