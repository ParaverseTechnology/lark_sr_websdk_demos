import './slider.scss';
import Log from '@/utils/log';
import Unit from '@/utils/unit';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Slider(props) {
  const {min, max, defaultValue, change} = props;

  const larksr = useSelector(state => state.comm.larksr);

  const [tooltip, setTooltip] = useState(false);
  const [valueVolumn, setValueVolumn] = useState(100);

  const [sliderSize, setSliderSize] = useState({
    width: 0,
    height: 0,
  });
  const [started, setStarted] = useState(false);
  const [touchX, setTouchX] = useState(0);

  const sliderRef = useRef(null);

  useEffect(() => {
    const volumn = defaultValue ? JSON.parse(JSON.stringify(defaultValue)) : 100;
    setValueVolumn(volumn);
  }, [defaultValue]);

  const [computedValue, setComputedValue] = useState(100);
  useEffect(() => {
    const minVal = min ? min : 0;
    const maxVal = max ? max : 100;
    const range = maxVal - minVal; 
    setComputedValue(Math.round(range * valueVolumn / 100) + minVal);
  }, [min, max, valueVolumn])

  const onEnter = () => {
    setTooltip(true);
  };
  const onLeave = () => {
    setTouchX(0);
    setTooltip(false);
  };
  const onStart = () => {
    setStarted(true);
  };
  const onEnd = () => {
    setTouchX(0);
    setStarted(false);
  };

  const onMove = (e) => {
    if (!started) {
        return;
    }
    if (sliderSize.width == 0 && sliderRef.current) {
      setSliderSize(Unit.getBoundingClientRectSize(sliderRef.current));
    }
    if (sliderSize.width == 0) {
        return;
    }

    let movementX = 0;

    if (e.movementX) {
        movementX = e.movementX;
    } else if (e.targetTouches && e.targetTouches[0]) {
      const screenOrientation = larksr ? larksr.screenState.screenOrientation : 'portrait'
      const clientX = screenOrientation == 'landscape' ? e.targetTouches[0].clientY : e.targetTouches[0].clientX;
      movementX = touchX == 0 ? 0 : (clientX - touchX) * 0.1;
      setTouchX(clientX);
    } else {
        // WARNING not handle touch
        Log.warn("slider not support event", e, touchX);
        return;
    }
    
    let value = valueVolumn + movementX / sliderSize.width * 100;
    // value = Math.round(value);
    if (value > 99) {
        value = 100;
    }
    if (value < 1) {
        value = 0;
    }
    setValueVolumn(value);
    change(computedValue);
  };
  

  useEffect(() => {
    Log.info("slider size", Unit.getBoundingClientRectSize(sliderRef.current));
    if (sliderRef.current) {
      setSliderSize(Unit.getBoundingClientRectSize(sliderRef.current))
    }
  }, [sliderRef])
  return (
    <div className="slider-wraper"
        onMouseUp={onEnd}
        onMouseCancel={onEnd}
        onMouseLeave={onEnd}
        onMouseMove={onMove}
        onTouchMove={onMove}
        onTouchCancle={onEnd}
        onTouchEnd={onEnd}
    >
        <div className="slider" ref={sliderRef}>
            <div className="slider-bar" style={{'width': valueVolumn+"%"}}></div>
            <div className="slider-button-wraper" 
                style={{'left': + valueVolumn + "%"}}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                onMouseDown={onStart}
                onTouchStart={() => { onStart(); onEnter(); }}
                onTouchEnd={onLeave}
                onTouchCancle={onLeave}
            >
                <div className={tooltip ? 'slider-button-tooltip' : 'slider-button-tooltip hide'}>{computedValue}</div>
                <div className="slider-button"></div>
            </div>
        </div>
    </div>
  )
}