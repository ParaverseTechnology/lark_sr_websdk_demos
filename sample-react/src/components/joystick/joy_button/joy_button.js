import React from "react";
import "./joy_button.scss"

export default class JoyButton extends React.Component {
    // props: ["keyName", 'repeatTimeout'],
    // onStart, onEnd, onMove, onLongPress, onRepeat,

    root = null;

    showTip = false;
    timeout = null;
    touched = false;
    touchStartTime = 0;
    longPressed = false;

    constructor() {
        super();
        this.state = {
        }
        console.log("props", this.props);
    }

    getRootElement() {
        return this.root;
    }

    onTouchStart(e) {
        // TODO add prevent default
        // e.preventDefault();
        e.stopPropagation();
        // console.log("onTouchStart");
        // this.showTip = true;
        this.touched = true;
        this.touchStartTime = Date.now();
        // this.$emit("start", this.keyName, e);
        this.props.onStart(this.keyName, e);
        this.repeatPress();
    }

    onTouchEnd(e) {
        e.preventDefault();
        e.stopPropagation();
        // console.log("onTouchEnd");
        // this.showTip = false;
        this.touched = false;
        this.longPressed = false;
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
        this.touchStartTime = 0;
        // this.$emit("end", this.keyName, e);
        this.props.onEnd(this.keyName, e);
    }
    
    onTouchMove(e) {
        // e.preventDefault();
        e.stopPropagation();
        // this.$emit("move", this.keyName, e);
        this.props.onMove(this.keyName, e);
    }

    repeatPress() {
        if (this.touched) {
            // check long press
            if (!this.longPressed && this.touchStartTime != 0 && Date.now() - this.touchStartTime > 1000) {
                this.longPressed = true;
                // this.$emit("longPress",this.keyName);
                this.props.onLongPress(this.keyName);
            }
            this.timeout = window.setTimeout(() => {
                // this.$emit("repeat", this.keyName);
                this.props.onRepeat(this.keyName);
                this.repeatPress();
            }, this.repeatTimeout ? this.repeatTimeout : 100);
        }
    }

    onSelect(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    getClassName() {
        let parentClassName = this.props.className ? this.props.className : "";
        return this.touched ? "key keyPress " + parentClassName : "key " + parentClassName
    }

    render() {
        return ( 
          <div ref={root => this.root = root} 
              className={this.getClassName()}
              style={this.props.style}
              onTouchStart={(e) => { this.onTouchStart(e); }}
              onTouchMove={(e) => { this.onTouchMove(e); }}
              onTouchEnd={(e) => { this.onTouchEnd(e); }}
              onTouchCancel={(e) => { this.onTouchEnd(e); }}
              onSelect={(e) => { this.onSelect(e); }}
          >
            {this.props.children}
          </div>
        );
      }
}