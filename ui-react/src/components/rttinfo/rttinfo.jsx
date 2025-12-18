import { useEffect, useRef, useState } from 'react';
import './rttinfo.scss'
import { useSelector } from 'react-redux';

export default function RttInfo() {

  const aggregatedStats = useSelector(state => state.comm.aggregatedStats);

  const [rttCheckTimeout, setRttCheckTimeout] = useState(-1);
  const [rttLimitTimeout, setRttLimitTimeout] = useState(-1);

  const [states, setStates] = useState(0);
  const [rttClass, setRttClass] = useState('');
  const statesRef = useRef(states);

  useEffect(() => {
    if(aggregatedStats) {
      let rttms = aggregatedStats.currentRoundTripTime * 1000;
      let rtt = rttms.toFixed(2);
      
      const val = {
        hasPacketsLost: aggregatedStats.packetsLost != 0,
        packetsLost: aggregatedStats.packetsLost.toFixed(2),
        packetsLostPerc: aggregatedStats.packetsLostPerc.toFixed(3) + "%",
        hasBitrate: aggregatedStats.bitrate != 0,
        bitrate: (aggregatedStats.bitrate / 1000).toFixed(2),
        hasCurrentRoundTripTime: aggregatedStats.currentRoundTripTime != 0,
        // hasCurrentRoundTripTime: true,
        currentRoundTripTime: rtt,
        rttMs: rttms,
        // rttMs: 10,
      };
      setStates(val);
      if (val.rttMs < 30) {
        setRttClass('rttInfo rttGood');
      } else {
        setRttClass('rttInfo rttBad');
      }
    }
  }, [aggregatedStats]);
  useEffect(() => {
    statesRef.current = states;
  }, [states])

  // const [showTimeoutInfo, setShowTimeoutInfo] = useState(null);
  const [lastRttLimitToast, setLastRttLimitToast] = useState(null);
  const onRttCheck = () => {
      if (statesRef.current.rttMs > 30 && rttLimitTimeout == -1 && Date.now() - lastRttLimitToast > 20 * 1000) {
        // setShowTimeoutInfo(true);
        let timer = null;
        timer = window.setTimeout(() => {
          // setShowTimeoutInfo(false);
          setRttLimitTimeout(-1);
          setLastRttLimitToast(Date.now());
        }, 8 * 1000);
        setRttLimitTimeout(timer);
      }
  }

  useEffect(() => {
    let timer = window.setInterval(() => {onRttCheck()}, 1000);
    setRttCheckTimeout(timer);
    return () => {
      if (rttCheckTimeout != -1) {
        window.clearInterval(rttCheckTimeout);
      }
      if (rttLimitTimeout != -1) {
          window.clearInterval(rttLimitTimeout);
      }
    }
  }, []);
  return (
    <div className={rttClass}>
        <div className="icon-rtt"></div>
        {
          statesRef.current?.hasCurrentRoundTripTime && 
          <span>{statesRef.current?.currentRoundTripTime || ''} ms</span>
        }
        
    </div>
  )
}