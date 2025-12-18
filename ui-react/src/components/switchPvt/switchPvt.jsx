import './switchPvt.scss';


export default function SwitchPvt(props) {
  const { disabled, checked } = props;

  const onSwitch = () => {
    props.change(!checked);
  }

  const switchClick = (e) => {
    disabled ? e => e.preventDefault() : onSwitch()
  }
  return(
    <div className="m-switch-wrap">
      <div onClick={switchClick} className={`m-switch${checked? ' switch-checked': ''}${disabled? ' disabled':''}`}>
        <div className={`u-switch-inner${checked?' inner-checked': ''}${!checked?' inner-unchecked': ''}`}></div>
        <div className={`u-node${checked? ' node-checked': '' }`}></div>
      </div>
    </div>
  )
}