import React, { Component } from 'react';

import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

// TODO - GET RESULT FROM SERVER AND BRING IT HERE

class Uploader extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      matchResult: null
    }
  }

  render() {
    return (
      <div className="upload-container" >
        <FilePond
        server={{
          url:"/api/upload",
          process: {
            onload: (res) => {
              this.props.getResult(res);
            },
            onerror: (res) => {
              console.warn(res);
            }
          }
        }}
        name={"file"}
        />
      </div>
    );
  }

}

export default Uploader;
