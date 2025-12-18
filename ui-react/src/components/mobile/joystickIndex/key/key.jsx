import { useEffect, useRef, useState } from 'react';
import styles from './key.module.scss';

export default function Key(props) {
  const {circle, size, keyName, start, end,longPress,repeat} = props;

  const [showTip, setShowTip] = useState(false);
  const timeout = useRef(null);
  const [touched, setTouched] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [longPressed, setLongPressed] = useState(false);

  const [isInput, setIsInput] = useState(false);
  const [keyClass, setKeyClass] = useState("");
  useEffect(() => {
    if (circle) {
      return size ? setKeyClass("key circle ") + size : setKeyClass("key circle");
    } else {
        return size ? setKeyClass("key ") + size : setKeyClass("key");
    }
  }, [circle, size]);

  const onTouchStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Log.info("onTouchStart");
    setShowTip(true);
    setTouched(true);
    setTouchStartTime(Date.now())
    start(keyName);
    timeout.current = window.setTimeout(() => {
      repeatPress();
    }, 500);
  };
  const onTouchEnd = (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Log.info("onTouchEnd");
      setShowTip(false);
      setTouched(false);
      setLongPressed(false);
      if (timeout.current) {
          window.clearTimeout(timeout.current);
      }
      setTouchStartTime(0);
      end(keyName);
  };
  const repeatPress = () => {
      if (touched) {
          // check long press
          if (!longPressed && touchStartTime != 0 && Date.now() - touchStartTime > 2000) {
            setLongPressed(true);
            longPress(keyName);
          }
          timeout.current = window.setTimeout(() => {
              repeat(keyName);
              repeatPress();
          }, 250);
      }
  };
  const onSelect = (e) => {
      e.preventDefault();
      e.stopPropagation();
  };
  return(
    <div className={styles.container}>
      <div className={keyClass}
        onSelectStart={onSelect}
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchCancle={onTouchEnd} >
          {
            (showTip && isInput) &&
            <div className="tip">
              <slot onSelectStart={onSelect}></slot>
            </div>
          }
        {props.content}
      </div>
    </div>
  )
}