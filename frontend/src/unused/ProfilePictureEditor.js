// ImageDisplay.js
import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';

import {Buffer} from 'buffer';



import '../styles/Home.css';

export default function ProfileImage(props) { 

    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(1);
    const [editor, setEditor] = useState(null);
    const [rotate, setRotate] = useState(0);


    const handleSave = () => {
        if (editor && image) {
            const canvas = editor.getImageScaledToCanvas();
            canvas.toBlob(blob => {
                const file = new File([blob], 'image.png', { type: 'image/png' });

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    let base64data = reader.result;
                    let buffer = Buffer.from(base64data.split(',')[1], 'base64');
                    props.setImage(buffer);
                }
            });
        } else {
            alert("Please select an image to upload");
        }
    };
    

    let fileInput = React.createRef();

    const handleDrop = (files) => {
        setImage(files[0]);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div style = {{width: '100%'}}>

            <div style ={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <p><h6>Either Drop Image into Zone or Upload</h6></p>
                <input 
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInput}
                style ={{marginBottom: '3%'}}
                 />
                    
                <Dropzone
                onDrop={handleDrop}
                noClick
                noKeyboard
                style={{ width: '250px', height: '250px', backgroundColor: 'transparent'}}
                >
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                    <AvatarEditor 
                    width={250} 
                    height={250} 
                    image={image} 
                    ref = {editor => setEditor(editor)}
                    border = {40}
                    color = {[255, 255, 255, 0.6]}
                    scale = {scale}
                    rotate = {rotate}
                    style = {{border: '2px solid black'}}
                    />
                    </div>

                )}
                </Dropzone>
            </div>
            <div style = {{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <p><h7>Scale</h7></p><input type="range" min="1" max="2" step="0.01" value={scale} onChange={e => setScale(parseFloat(e.target.value))} />
                <p><h7>Rotate</h7></p><input type="range" min="0" max="360" step="1" value={rotate} onChange={e => setRotate(parseInt(e.target.value))} />
            </div>
            <button type ="button" className = "buttonDesign" style ={{height: '20%', margin: 'auto', marginBottom: '5%', marginTop: '3%'}} onClick={handleSave}>Upload File</button>
        </div>
      );
}