import React, { Component } from 'react'
import $ from 'jquery';
import Packery from 'packery'
import View from './View';
import Emitter from '../emitter/emitter'
export default class ScreensContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      sizes: []
    }

    this.getAllSizes = this.getAllSizes.bind(this);
    this.initPickery = this.initPickery.bind(this);
    this.renderViews = this.renderViews.bind(this);
    this.renderPlaceholders = this.renderPlaceholders.bind(this);
  }

  componentDidMount() {
    this.getAllSizes();
    Emitter.newSizeEmitter.on('new-size-added', () => {
      this.getAllSizes()
    });
  }

  initPickery() {
    function onLayout() {
      const e = document.querySelectorAll('.layoutHolder')
      Emitter.layoutEmitter.emit('new-layout', e)
    }
    const c = document.querySelector('.screens')
    setTimeout(()=> {
      var pckry = new Packery( c, {
        itemSelector: '.layoutHolder',
        gutter: 15
      });
      pckry.on( 'layoutComplete', onLayout );
    }, 100);
  }

  getAllSizes(){
    this.props.store.getAll().then(sizes => {
      this.setState({sizes})
      this.initPickery();
    })
  }

  renderViews(){
    return this.props.views.map(v => {
      const { width, height } = v.props;
      return <div className="layoutHolder" key={v.key} style={ { width, height: height + 40 } }>
        <h3>{width}x{height}</h3>
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
        {/* <h1>ScreensContainer</h1> */}
        <div className="screens">
        
        { this.renderViews() }
        {/* { this.renderPlaceholders() } */}
        </div>
      </section>
    )
  }
}
