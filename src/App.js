import React, { Component } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import axios from 'axios';

class App extends Component {
  /**
   * Event response triggered when camera takes a photo, posts image string to backend service
   * 
   * @param {string} dataUri base64 String of the image in data uri schema standard 
   */
  onTakePhoto (dataUri) {
    
    let formData = new FormData();
    formData.append('image', dataUri);

    axios({
        method: 'post',
        url: `https://shielded-stream-30532.herokuapp.com/api/image`,
        headers: {
            'Content-Type': 'text/plain'
        }, 
        data: dataUri
      });
    
    }
  /**
   * Event response triggered when camera photo shoot encounters an error, logs error message
   * 
   * @param {string} error String describing error state that will be made available on client console as error
   */
  onCameraError (error) {
    console.error('onCameraError', error);
  }

  /**
   * Render method as part of Component, responsible for utilizing HTML5 plugin via HTML tag
   */
  render () {
    return (
      <div className="App">
       <div className="Camera">
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
          onCameraError = { (error) => { this.onCameraError(error); } }
          idealFacingMode = {FACING_MODES.ENVIRONMENT}
          idealResolution = {{width: 480, height: 480}}
          imageType = {IMAGE_TYPES.JPG}
          imageCompression = {0.97}
          isMaxResolution = {false}
          isImageMirror = {false}
          isDisplayStartCameraError = {true}
          sizeFactor = {1}
        />
        </div>
      </div>
    );
  }
}

export default App;