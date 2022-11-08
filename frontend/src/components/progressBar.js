import { textAlign } from "@mui/system";
import React, { useState, useEffect } from 'react';

const ProgressBar = (props) => {
    const { bgcolor, base, compare } = props;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress((compare / base) * 100 >= 100 ? 100 : (compare / base) * 100);
        console.log(compare/base, compare, base);
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

    console.log(progress);
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
        </div>
        <p style={labelStyles}>{`${progress}%`}</p>
      </div>
    );
  };
  
  export default ProgressBar;