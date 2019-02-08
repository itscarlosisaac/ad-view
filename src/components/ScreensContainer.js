import React, { Component } from 'react'
import $ from 'jquery';
import Packery from 'packery'
import Emitter from '../emitter/emitter'
export default class ScreensContainer extends Component {
  constructor(props){
    super(props);

    this.initPickery = this.initPickery.bind(this);
    this.renderViews = this.renderViews.bind(this);
    this.renderPlaceholders = this.renderPlaceholders.bind(this);
    this.removeScreen = this.removeScreen.bind(this);
  }

  componentDidUpdate() {
    this.initPickery();
  }

  initPickery() {
    function onLayout() {
      const e = document.querySelectorAll('.layoutHolder');
      Emitter.layoutEmitter.emit('new-layout', e);
    }
    const c = document.querySelector('.screens');
    setTimeout(()=> {
      var pckry = new Packery( c, {
        itemSelector: '.layoutHolder',
        gutter: 15
      });
      pckry.on( 'layoutComplete', onLayout );
    }, 100);
  }

  removeScreen(e){
    Emitter.screenEmitter.emit('remove-screen', e)
  }

  renderViews(){
    return this.props.views.map(v => {
      const { width, height, id } = v.props;
      return <div className="layoutHolder" id={id}  key={v.key} style={ { width, height: height + 30 } }>
        <div className="title__bar">
          <span>{width}x{height}</span>
          <i className="material-icons close" id={id} onClick={this.removeScreen}>clear</i>
        </div>
        {v}
      </div>
    })
  }

  renderPlaceholders(){
    return this.state.sizes.map((size, index) => {
      return <div className="layoutHolder dashed" key={index} style={
          {
            width:size.data.width,
            height:size.data.height + 40
          }
        }>
        {size.data.width}x{size.data.height}
      </div>
    })
  }

  render() {
    return (
      <section className="app__screens">
        <div className="screens">
        { this.renderViews() }
        {/* { this.renderPlaceholders() } */}
        </div>
      </section>
    )
  }
}
