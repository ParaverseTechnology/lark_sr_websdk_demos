import { useSelector } from 'react-redux';
import './joystickIndex.scss';
import Joystick from '../joystick/joystick'
import Key from './key/key'
import Log from '@/utils/log';
import { useEffect, useRef, useState } from 'react';

export default function JoystickIndex() {
  const larksr = useSelector(state => state.comm.larksr);
  const [controls, setControls] = useState(null);

  const [leftJoyPosition, setLeftJoyPosition] = useState({});
  const viewPort = useRef({ width: 1920, height: 1080 });
  useEffect(() => {
    viewPort.current = larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };
  }, [larksr]);
  useEffect(() => {
    setLeftJoyPosition({
      'left': 30,
      'top': viewPort.current.height > 500 ? viewPort.current.height - 220 : viewPort.current.height - 150,
  })
  }, [viewPort]);

  
  const [leftJoyPositionStyle, setLeftJoyPositionStyle] = useState({});
  useEffect(() => {
    setLeftJoyPositionStyle({
      'left': leftJoyPosition.left + "px",
      'top': leftJoyPosition.top + "px",
    })
  }, [leftJoyPosition]);

  const [keyClass, setKeyClass] = useState('');
  const [joysticks, setJoysticks] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    setKeyClass(controls && controls.keySize ? 'keys keys-size-' + controls.keySize : "keys");
    setJoysticks(controls && controls.ctrls ?  controls.ctrls.filter(ctrl => ctrl.ctrlType == 2) : []);
    setKeys(controls && controls.ctrls ?  controls.ctrls.filter(ctrl => ctrl.ctrlType == 1) : []);
  }, [controls]);

  // 方法
  const onKeyStart = (keys) => {
    Log.info("onKeyStart", keys);
    // sync pressed key
    keys.forEach(key => {
        larksr?.keyDown(key, false);
    });
  };
  const onKeyEnd = (keys) => {
    Log.info("onKeyEnd", keys);
    // sync pressed key
    keys.forEach(key => {
        larksr?.keyUp(key, true);
    });
  };
  const onRepeat = (keys) => {
    Log.info("onRepeat", keys);
    keys.forEach(key => {
        larksr?.keyDown(key, true);
    });
  };
  const getPositionNumber = (ctrl) => {
    return {
        'left': ctrl.ctrlLoc.x * viewPort.current.width,
        'top': ctrl.ctrlLoc.y * viewPort.current.height,
    }
  };
  const getPosition = (ctrl) => {
    // Log.info('getPosition', ctrl);
    return {
        'left': ctrl.ctrlLoc.x * viewPort.current.width + "px",
        'top': ctrl.ctrlLoc.y * viewPort.current.height + "px",
        'position': 'absolute',
        "zIndex": '1012',
    }
  };
  const updateControl =  async() => {
    if (!larksr) {
        return;
    }
    try {
        const res = await larksr?.getTouchCtrMapping();
        Log.info("updateControl ", res);
        setControls(res);
    } catch (e) {
        Log.info("getTouchCtrMapping failed ", e);
    }
  };

  useEffect(() => {
    Log.info("joystick mounted");
    updateControl();
  }, []);
  return(
    <div className="joyindex-container" >
      {
        controls == null?
        <div >
          <Joystick style={leftJoyPositionStyle} position={leftJoyPosition}></Joystick>
        </div>
        :
        <div>
          {
            joysticks.map((item, index) => {
              return <Joystick key={index + 1000} style={getPosition(item)} position={getPositionNumber(item)} subType={item.subType}></Joystick>
            })
          }
          {
            keys.map((item, index) => {
              return <Key key={index} className={keyClass} keyName={item.keyCodes} style={getPosition(item)}
                  start={onKeyStart} end={onKeyEnd} repeat={onRepeat}
                  content={<span>{item.keyCodes.join(" ")}</span>} />
            })
          }
        </div>
      }
    </div>
  )
}