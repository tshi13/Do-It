import { textAlign } from "@mui/system";

const ProgressBar = (props) => {
    const { bgcolor, progress } = props;

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