import './aerialView.scss';
import Log from "@/utils/log";
import ContentAlert from '../customContentAlert/customContentAlert';
import { setCustomContentAlertTitle } from '../../store/modules/customContentAlert';
import { setAerialViewCheck, setAeriaViewBoxEnd } from '../../store/modules/modalSetting';
import { setShowAerialView, toggleAerailView } from '../../store/modules/comm';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import Btn from '../button/button';

export default function AerialView() {
  const dispatch = useDispatch();

  const isMobile = useSelector(state => state.comm.isMobile);
  const ui = useSelector(state => state.comm.ui);
  const larksr = useSelector(state => state.comm.larksr);
  const aeriaViewBoxEnd = useSelector(state => state.modalSetting.aeriaViewBoxEnd);

  const [alertPositionStyle, setAlertPositionStyle] = useState({});
  const [containerSize, setContainerSize] = useState({width: 0, height: 0});
  const [boxSize, setBoxSize] = useState({width: 0, height: 0});
  const [start, setStart] = useState(false);
  const [boxPosition, setBoxPosition] = useState({x: 0, y: 0});
  const [offsetPositon, setOffsetPositon] = useState({x: 0, y: 0});
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    if(isMobile) {
      setAlertPositionStyle({
          top: '75px',
          left: '20px',
          position: 'absolute'
      });
  } else {
    setAlertPositionStyle({
          top: '75px',
          right: '20px',
          position: 'absolute'
      });
  }
  }, [isMobile]);

  
  const [containerStyle, setContainerStyle] = useState({});
  useEffect(() => {
    let res = {};
    if (containerSize.width && containerSize.height) {
      res.width = containerSize.width + "px";
      res.height = containerSize.height + "px";
    } 
    if (backgroundImage) {
      res.backgroundImage = `url( ${backgroundImage})`;
    }
    setContainerStyle(preData => res);
  }, [backgroundImage, containerSize]);

  const onCancel = () => {
    dispatch(setCustomContentAlertTitle(''));
    dispatch(setAerialViewCheck(false));
    onClose();
  };

  const aerialViewContainerRef = useRef(null);
  const aerialViewBoxRef = useRef(null);
  const onStart = (e) => {
      // e.preventDefault();
      e.stopPropagation();

      let clientX = 0;
      let clientY = 0;

      let screenOrientation = larksr?.screenState.screenOrientation;

      let isLandscape = screenOrientation === 'landscape';

      if (e.changedTouches) {
          clientX = e.changedTouches[0].clientX;
          clientY = e.changedTouches[0].clientY;
      } else {
          clientX = e.clientX;
          clientY = e.clientY;
      }

      let containerSize = aerialViewContainerRef.current.getBoundingClientRect();
      let viewboxSize = aerialViewBoxRef.current.getBoundingClientRect();

      if (isLandscape) {
          const containerWidth = containerSize.width;
          containerSize.width = containerSize.height;
          containerSize.height = containerWidth;

          const viewboxWidth = viewboxSize.width;
          viewboxSize.width = viewboxSize.height;
          viewboxSize.height = viewboxWidth;
      }

      let px = clientX - viewboxSize.left;
      let py = clientY - viewboxSize.top;

      if (isLandscape) {
          px = clientY - viewboxSize.top;
          py = viewboxSize.height - (clientX - viewboxSize.left);

          // Log.info("start isLandscape X", px, viewboxSize, containerSize);
          // Log.info("start isLandscape Y", py, clientX, viewboxSize, containerSize);
      }

      setOffsetPositon({
        x: px,
        y: py
      });
      setStart(true);
      Log.info("aerial box drag start", viewboxSize, offsetPositon);
  };
  const onMove = (e) => {
      if (!start) {
          return;
      }

      // e.preventDefault();
      e.stopPropagation();

      let screenOrientation = larksr?.screenState.screenOrientation;

      let isLandscape = screenOrientation === 'landscape';

      let clientX = 0;
      let clientY = 0;

      if (e.changedTouches) {
          clientX = e.changedTouches[0].clientX;
          clientY = e.changedTouches[0].clientY;
      } else {
          clientX = e.clientX;
          clientY = e.clientY;
      }

      let containerSize = aerialViewContainerRef.current.getBoundingClientRect();
      let viewboxSize = aerialViewBoxRef.current.getBoundingClientRect();

      if (isLandscape) {
          const containerWidth = containerSize.width;
          containerSize.width = containerSize.height;
          containerSize.height = containerWidth;

          const viewboxWidth = viewboxSize.width;
          viewboxSize.width = viewboxSize.height;
          viewboxSize.height = viewboxWidth;
      }

      let offsetX = clientX - viewboxSize.left;
      let offsetY = clientY - viewboxSize.top;

      let px = clientX - offsetPositon.x - containerSize.x;
      let py = clientY - offsetPositon.y - containerSize.y;

      if (isLandscape) {
          px = clientY - offsetPositon.x - containerSize.y;
          py = viewboxSize.height - (clientX - containerSize.x) + offsetPositon.y;

      }

      if (px < 0) {
          px = 0;
      }

      if (py < 0) {
          py = 0;
      }

      if (px > containerSize.width - viewboxSize.width) {
          px = containerSize.width - viewboxSize.width;
      }

      if (py > containerSize.height - viewboxSize.height) {
          py = containerSize.height - viewboxSize.height;
      }
      setBoxPosition({
        x: px,
        y: py
      });
      
  };
  const onEnd = (e) => {
      // if(e)e.preventDefault();
      if(e)e.stopPropagation();

      let screenOrientation = larksr?.screenState.screenOrientation;

      let isLandscape = screenOrientation === 'landscape';
      
      let containerSize = aerialViewContainerRef.current.getBoundingClientRect();
      let viewboxSize = setBoxSizeFn(containerSize);

      if (isLandscape) {
          const containerWidth = containerSize.width;
          containerSize.width = containerSize.height;
          containerSize.height = containerWidth;

          const viewboxWidth = viewboxSize.width;
          viewboxSize.width = viewboxSize.height;
          viewboxSize.height = viewboxWidth;
      }

      let px = boxPosition.x;
      let py = boxPosition.y;

      let scale = larksr?.currentAppSize ? larksr.currentAppSize.width / containerSize.width : 1;

      let box = {
          x: px * scale,
          y: py * scale,
          width: viewboxSize.width * scale,
          height: viewboxSize.height * scale,
      };

      Log.info("update box " ,viewboxSize, scale, box);

      if (larksr.updateAerialview) {
          larksr.updateAerialview(box);
          dispatch(setAeriaViewBoxEnd(box));
      }
      setStart(false);
  };
  const onHide = () => {
      dispatch(setShowAerialView(false));
  };
  const onClose = () => {
      larksr.stopAerialview();
      dispatch(toggleAerailView());
      dispatch(setAeriaViewBoxEnd(null));
  };
  const init = () => {
      let screenOrientation = larksr?.screenState.screenOrientation;

      let isLandscape = screenOrientation === 'landscape';

      let containerSize = aerialViewContainerRef.current.getBoundingClientRect();
      // console.log('初始化传值',aerialViewContainerRef.current.getBoundingClientRect().height,containerSize)
      let viewboxSize = setBoxSizeFn(containerSize);

      if (isLandscape) {
          const containerWidth = containerSize.width;
          containerSize.width = containerSize.height;
          containerSize.height = containerWidth;

          const viewboxWidth = viewboxSize.width;
          viewboxSize.width = viewboxSize.height;
          viewboxSize.height = viewboxWidth;
      }

      if (!larksr) {
          Log.warn("larksr not inited");
          return;
      }

      let scale = larksr.currentAppSize.width / containerSize.width;

      let asp = larksr.currentAppSize.height / larksr.currentAppSize.width;

      containerSize.height = asp * containerSize.width;
      viewboxSize.height = asp * viewboxSize.width;


      Log.info('aerial view mounted', larksr.currentAppSize, asp, containerSize, viewboxSize);

      if (larksr.startAerialview) {
          // 恢复隐藏选择框之前的坐标位置
          if(aeriaViewBoxEnd) {
            setBoxPosition({
              x: aeriaViewBoxEnd.x/scale,
              y: aeriaViewBoxEnd.y/scale
            });
            larksr.startAerialview(aeriaViewBoxEnd, 1000, containerSize.width, containerSize.height);
          } else {
              larksr.startAerialview({
                  x: 0,
                  y: 0,
                  width: viewboxSize.width * scale,
                  height: viewboxSize.height * scale,
              }, 1000, containerSize.width, containerSize.height);
              setBoxPosition({
                x: 0,
                y: 0
              });
          }            
      }
      setContainerSize({
        width: containerSize.width,
        height: containerSize.height
      });

      // larksr.on("aerialviewscreen", (e) => {
      //     // Log.info("on aerialviewscreen", e, {"background-image": "url(" + e.data + ")" });
      //     setBackgroundImage(e.data);
      // })
  };

  const aeriaViewSelectScale = useSelector(state => state.modalSetting.aeriaViewSelectScale);
  const setBoxSizeFn = (containerSize) => {
      let val = {}
      if(aeriaViewSelectScale==='21') {
        val = {
          width: containerSize.width/2,
          height: containerSize.height/2
        }
      } else if(aeriaViewSelectScale==='31') {
        val = {
          width: containerSize.width/3,
          height: containerSize.height/3
        };
      } else if(aeriaViewSelectScale==='41') {
        val = {
          width: containerSize.width/4,
          height: containerSize.height/4
        }
      } 
      setBoxSize(val);  
      return val;
  };

  const [boxStyle, setBoxStyle] = useState({
    width: 'px2rem(250)',
    height: 'px2rem(250)'
  });
  useEffect(() => {
    let size = {};
    if(boxSize.width && boxSize.height) {
      size.width = boxSize.width + "px";
      size.height = boxSize.height + "px"
    };

    setBoxStyle({
      top: boxPosition.y + "px",
      left: boxPosition.x + "px",
      ...size
    })
  }, [boxPosition, boxSize, backgroundImage]);

  // 是否执行过初始化方法
  const [initFlag, setInitFlag] = useState(false);
  useEffect(() => {
    larksr.on("aerialviewscreen", (e) => {
      if(!initFlag) setInitFlag(true);
      // Log.info("on aerialviewscreen", e, {"background-image": "url(" + e.data + ")" });
      setBackgroundImage(preData => e.data);
    })
  }, [aeriaViewSelectScale, larksr]);
  useEffect(() => {
    dispatch(setAeriaViewBoxEnd(null));
    init(); 
    onEnd();    
  }, [initFlag])
  const showAerialView = useSelector(state => state.comm.showAerialView);
  return(
    <ContentAlert 
      alertPositionStyle={alertPositionStyle}
      close={
        <div onClick={onCancel}>
          <CloseOutlined style={{fontSize: '1.8rem'}} />
        </div>
      }
      content={
        <div>
          <div ref={aerialViewContainerRef} className="aerial-view-container" style={containerStyle}>
                <div ref={aerialViewBoxRef} className="aerial-view-box" style={boxStyle}
                    onMouseDown={onStart}
                    onMouseUp={onEnd}
                    onMouseLeave={onEnd}
                    onMouseMove={onMove}
                    onTouchStart={onStart}
                    onTouchMove={onMove}
                    onTouchEnd={onEnd}
                >
                </div>
            </div>
            <div className="customContentAlert-divider"></div>
            <div className="button-group" >
              <p>{JSON.stringify(showAerialView)}</p>
              <Btn className="submit" title={ui.hideAerial} submit={false} click={onHide} />
            </div>
        </div>
      }
    >
    </ContentAlert>
  )
}