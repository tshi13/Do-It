import { textAlign } from "@mui/system";
import React, { useState, useEffect } from 'react';

const ProgressBar = (props) => {
    const { bgcolor } = props;
    const [progress, setProgress] = useState(0);



    useEffect(() => {
      let compare = props.compare ? props.compare : 0;
      let base = props.base ? props.base : 0;
      let progress = compare/base * 100;
      if(progress > 100) {
        progress = 100;
      } else if(progress === NaN || progress === null || base === 0) {
        progress = 0;
      }
      setProgress(progress);
        
    }, [props]);


    const containerStyles = {
      height: 20,
      width: '100%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,

    }
  
    const fillerStyles = {
      height: '100%',
      width: `${progress}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    const labelStyles = {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center',
      allignItems: 'center',
      width: '100%',
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
        </div>
        <p style={labelStyles}>{`${progress}%`}</p>
      </div>
    );
  };
  
  export default ProgressBar;