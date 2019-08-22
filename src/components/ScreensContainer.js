import React, { Component } from 'react'
import Packery from 'packery'
import Emitter from '../emitter/emitter'

export default class ScreensContainer extends Component {
  constructor(props){
    super(props);

    this.initPickery = this.initPickery.bind(this);
    this.renderViews = this.renderViews.bind(this);
    this.removeScreen = this.removeScreen.bind(this);
    this.activeScreen = this.activeScreen.bind(this);
  }

  componentDidUpdate() {
    this.initPickery();
  }

  initPickery() {
    function onLayout() {
      const layoutHolder = document.querySelectorAll('.layoutHolder');
      Emitter.layoutEmitter.emit('new-layout', layoutHolder);
    }
    const screens = document.querySelector('.screens');
    setTimeout(()=> {
      var pckry = new Packery( screens, {
        itemSelector: '.layoutHolder',
        gutter: 15
      });
      pckry.on( 'layoutComplete', onLayout );
    }, 100);
  }

  removeScreen(e){
    let id;
    let temp = e.target;
    while( id !== 'close') {
      id = temp.parentNode.className;
      temp = temp.parentNode;
    }
    id = temp.id
    Emitter.screenEmitter.emit('remove-screen', id)
  }

  activeScreen(e){
    let parentClass;
    let temp = e.target;
    while( parentClass !== 'layoutHolder'){
      if( parentClass == 'close') { return false}
      parentClass = temp.parentNode.className;
      temp = temp.parentNode;
    }
    document.querySelectorAll('.layoutHolder').forEach(e => e.classList.remove('active'));
    temp.classList.add('active');
  }

  renderViews(){
    return this.props.views.map(v => {
      const { width, height, id, showViewsHeader  } = v.props;

      return (
        <div className="layoutHolder"
             onClick={this.activeScreen}
             id={id}
             key={v.key}
             style={ { width, height: height + 30 } }>

          <div className={showViewsHeader ? 'title__bar' : 'no__title'}>
            <span>{width}x{height}</span>
            <span className="close" id={id} onClick={this.removeScreen}>
              {/* <CloseSVG /> */}
            </span>
          </div>
          {v}
        </div>
      )
    })
  }

  render() {
    const screenCSS = `app__screens`;

    return (
      <section className='app__screens'>
        <div className="screens" id="app__screens">
        { this.renderViews() }
        </div>
      </section>
    )
  }
}
