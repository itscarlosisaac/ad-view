import React, { Component } from 'react'
import $ from 'jquery';
import Packery from 'packery'
export default class ScreensContainer extends Component {
  componentDidMount() {
    const c = document.querySelector('.screens')
    setTimeout(()=> {
      var pckry = new Packery( c, {
        itemSelector: '.img',
        gutter: 15
      });
    }, 10);
  }
  
  render() {
    return (
      <section className="app__screens">
        {/* <h1>ScreensContainer</h1> */}
        <div className="screens">
          <img className="img" src="http://www.placehold.it/300x600" alt="Image"/>
          <img className="img" src="http://www.placehold.it/160x600" alt="Image"/>
          <img className="img" src="http://www.placehold.it/500x200" alt="Image"/>
          <img className="img" src="http://www.placehold.it/300x250" alt="Image"/>
          <img className="img" src="http://www.placehold.it/728x90" alt="Image"/>
        </div>
      </section>
    )
  }
}
