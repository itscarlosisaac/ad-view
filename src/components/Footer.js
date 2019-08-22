import React, { Component } from 'react'
import CopySVG from './icons/Copy';

export default class Footer extends Component {
  constructor(props){
    super(props);
    this.saveToImage = this.saveToImage.bind(this);
  }

  saveToImage(){
    // Implement the save image
    console.log("SAVE IMAGE");
  }

  render() {
    return (
      <footer className="app__footer">
        <div className="app__url__holder">
          <p>{this.props.url}</p>
        </div>
        <div className="app__save__images" onClick={this.saveToImage}>
          <CopySVG/>
          <small>Save Images</small>
        </div>
      </footer>
    )
  }
}
