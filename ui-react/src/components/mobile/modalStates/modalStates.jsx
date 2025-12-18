import { useDispatch, useSelector } from 'react-redux';
import './modalStates.scss';
import { useEffect, useRef, useState } from 'react';
import { setIsShowMobileStateModal } from '../../../store/modules/stateModal';

export default function ModalStates() {
  const dispatch = useDispatch();

  const ui = useSelector(state => state.comm.ui);
  const aggregatedStats = useSelector(state => state.comm.aggregatedStats);
  const larksr = useSelector(state => state.comm.larksr);
  const mobileForceLandScape = useSelector(state => state.comm.mobileForceLandScape);
  const isShowMobileStateModal = useSelector(state => state.stateModal.isShowMobileStateModal);
  const [states, setStates] = useState({});
  useEffect(() => {
    let runTime = (aggregatedStats.timestamp - aggregatedStats.timestampStart) / 1000;
    let timeValues = [];
    let timeDurations = [60, 60]
    for(let timeIndex = 0; timeIndex < timeDurations.length; timeIndex ++)
    {
        timeValues.push(runTime % timeDurations[timeIndex]);
        runTime = runTime / timeDurations[timeIndex];
    }
    timeValues.push(runTime);

    let runTimeSeconds = timeValues[0];
    let runTimeMinutes = Math.floor(timeValues[1]);
    let runTimeHours = Math.floor(timeValues[2]);

    let receivedBytesMeasurement = 'B'
    let receivedBytes = Object.prototype.hasOwnProperty.call(aggregatedStats, 'bytesReceived')? aggregatedStats.bytesReceived : 0;
    let dataMeasurements = ['kB', 'MB', 'GB'];
    for(let index = 0; index < dataMeasurements.length; index++) {
        if(receivedBytes < 100 * 1000)
            break;
        receivedBytes = receivedBytes / 1000;
        receivedBytesMeasurement = dataMeasurements[index];
    }
    let numberFormat = new Intl.NumberFormat(window.navigator.language, { maximumFractionDigits: 0 });
    let timeFormat = new Intl.NumberFormat(window.navigator.language, { maximumFractionDigits: 0, minimumIntegerDigits: 2 });

    let rtt = (aggregatedStats.currentRoundTripTime * 1000).toFixed(2);

    // set states
    setStates({
      runTimeSeconds: timeFormat.format((runTimeSeconds)),
      runTimeMinutes: timeFormat.format((runTimeMinutes)),
      runTimeHours: timeFormat.format((runTimeHours)),
      frameWidth: aggregatedStats.frameWidth, 
      frameHeight: aggregatedStats.frameHeight,
      receivedBytesMeasurement, 
      receivedBytes: numberFormat.format(receivedBytes),
      framesDecoded: numberFormat.format(aggregatedStats.framesDecoded),
      packetsLost: aggregatedStats.packetsLost,
      bitrate: (aggregatedStats.bitrate / 1000).toFixed(2),
      framerate: aggregatedStats.framerate,
      framesDropped: aggregatedStats.framesDropped, 
      currentRoundTripTime: rtt,
      packetsLostPerc: aggregatedStats.packetsLostPerc.toFixed(3),
      avgDecodeDelay: aggregatedStats.avgDecodeDelay,
      avgProcessDelay: aggregatedStats.avgProcessDelay,
      serverStatics: aggregatedStats.serverStatics,
    })
  },[aggregatedStats]);


  
  const viewPort = useRef({ width: 1920, height: 1080 });
  const [screenOrientation, setScreenOrientation] = useState('portrait');
  useEffect(() => {
    viewPort.current = larksr ? larksr.screenState.viewPort : { width: 1920, height: 1080 };
    const screenOrientation = larksr ? larksr.screenState.screenOrientation : 'portrait';
    setScreenOrientation(screenOrientation);
  }, [larksr]);


  const [helpStyle, setHelpStyle] = useState({});
  useEffect(() => {
    let obj = {};
    if(screenOrientation==='landscape' || mobileForceLandScape) {
      obj = {
        'width': '34.31rem',
        'height': viewPort.current.height +'px',
        'right': isShowMobileStateModal ? '0' : '-'+ '34.31rem'
      }
    } else {
      obj = {
        'width': '100%',
        'height': viewPort.current.height +'px',
        'right': isShowMobileStateModal ? '0' : '-'+ '100%'
      }
    }
    setHelpStyle(obj)
  }, [viewPort,isShowMobileStateModal,screenOrientation,mobileForceLandScape]);
  const closeModal = () => {
    dispatch(setIsShowMobileStateModal(false));
  }
  return(
    <div className="mobile-modal-states" style={helpStyle}>
      <div className="mobile-modal-states-title">
        <i className="iconfont icon-arrow" onClick={closeModal}></i>
        <span className="mobile-modal-states-title-text">
          { ui.net}
        </span>
      </div>
      <div className="state-content">
        <div className="state">
            <div className="state-row">
                <p>{ ui.statusRes }</p>
                <p>{states.frameWidth}x{states.frameHeight}</p>
            </div>
            <div className="state-row">
                <p>{ ui.statusFps }</p>
                <p>{states.framerate}</p>
            </div>
            <div className="state-row">
                <p>{ ui.statusBiterate }</p>
                <p>{states.bitrate} Mbps</p>
            </div>
            <div className="state-row">
                <p>{ ui.statusRtt }</p>
                <p>{states.currentRoundTripTime} ms</p>
            </div>
            <div className="state-row">
                <p>{ ui.statusPackgeLost }</p>
                <p>{states.packetsLostPerc} %</p>
            </div>
            {
              states.serverStatics &&
              <div>
                <div className="customContentAlert-divider"></div>
                <div className="state-row">
                    <p>Client:</p>
                </div>
                <div className="state-row">
                    <p>{ ui.avgDecodeDelay }</p>
                    <p>{ states.avgDecodeDelay?.toFixed(2) } ms</p>
                </div>
                <div className="state-row">
                    <p>{ ui.avgProcessDelay }</p>
                    <p>{ states.avgProcessDelay?.toFixed(2) } ms</p>
                </div>
                <div className="customContentAlert-divider"></div>
                <div className="state-row">
                    <p>Server:</p>
                </div>
                <div className="state-row">
                    <p>{ ui.serverStaticsRenderDelay }</p>
                    <p>{states.serverStatics?.renderDelay?.toFixed(2)} ms/frame ({ states.serverStatics?.renderFramerate?.toFixed(1) }FPS)</p>
                </div>
                <div className="state-row">
                    <p>{ ui.serverStaticsCaptureDelay }</p>
                    <p>{states.serverStatics?.captureDelay?.toFixed(2)} ms/frame ({ states.serverStatics?.captureFramerate?.toFixed(1) }FPS)</p>
                </div>
                <div className="state-row">
                    <p>{ ui.serverStaticsEncoderDelay }</p>
                    <p>{states.serverStatics?.encoderDelay?.toFixed(2)} ms/frame ({ states.serverStatics?.encoderFramerate?.toFixed(1) }FPS)</p>
                </div>
              </div>
            }
        </div>
      </div>
    </div>
  )
}