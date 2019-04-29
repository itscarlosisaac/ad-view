import '../assets/css/App.css'
import React, { Fragment } from 'react'
import { ipcRenderer } from 'electron';

// Import components
import ScreensContainer from './ScreensContainer';
import TabsPanel from './TabsPanel';
import TabSection from './TabSection';
import Header from './Header';
import View from './View';
import Toolbar from './Toolbar';
import Footer from './Footer';
import GlobalSettings from './GlobalSettings';

// MODELS
import SizeModel from '../models/SizeModel';

// Size components
// import AddSizes from './AddSizes';
import AddSize from '../containers/AddSize';
import SizeList from './SizeList';

// Param components
import AddParam from './AddParam'
import ParamList from './ParamList';

// Import helpers
import uuid from 'uuid';
import Emitter from '../emitter/emitter'

// Icons
import SizesSVG from './icons/Sizes'
import ParamsSVG from './icons/Params'
import SettingsSVG from './icons/Settings'
import ConsoleSVG from './icons/Console'
import HideSidebarSVG from './icons/HideSidebar'

// REDUX
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editables: {
        size: false,
        params: false
      },
      views: [],
      sizes: [],
      params: [],
      history: [],
      url: "www.google.com",
      useSizeAsParam: true,
      usePreviewParam: true,
      viewsCreated: false,
      isSidebarVisible: true,
    }

    // Sidebar Method
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggle = this.toggle.bind(this);

    // Header Methods
    this.createViews = this.createViews.bind(this);
    this.reloadViews = this.reloadViews.bind(this);
    this.getURL = this.getURL.bind(this);

    // Params Methods
    this.getAllParams = this.getAllParams.bind(this);
    this.addParam = this.addParam.bind(this);
    this.updateParam = this.updateParam.bind(this);
    this.deleteParam = this.deleteParam.bind(this);

    // Use size as Param
    this.toggleParam = this.toggleParam.bind(this)

    // Size Methods
    this.getAllSizes = this.getAllSizes.bind(this);
    this.addSize = this.addSize.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.deleteSize = this.deleteSize.bind(this);

    // Helper Methods
    this.instantiateEmitters = this.instantiateEmitters.bind(this)
  }

  componentWillReceiveProps() {
    // this.props.store.clear()
    // this.getAllParams();
    // this.getAllSizes();
    // this.instantiateEmitters();
    this.setState({
      sizes: this.props.sizes
    });
  }

  componentDidMount() {
    this.setState({
      sizes: this.props.sizes
    });
  }

  instantiateEmitters(){
    Emitter.screenEmitter.on('remove-screen', (e)=> {
      this.props.store.delete(e).then(e => this.getAllSizes() )

      process.nextTick(() => {
        const views = this.state.views.filter(v => v.props.id !== e);
        this.setState({views});
      });
    })

    ipcRenderer.on('create-views', () => {
      this.createViews();
    })
  }

  reloadViews(){
    const views = document.querySelectorAll('webview');
    views.forEach(view => view.reload() );
  }

  // Sidebar Method
  toggleSidebar(){
    const isSidebarVisible = !this.state.isSidebarVisible;
    this.setState({ isSidebarVisible })
  }

  // Params Methods
  getAllParams(){
    this.props.store.getAllParams().then(params => {
      this.setState({params})
    })
  }

  addParam(params){
    const { name, value } = params
    let exists = this.state.params.filter(p => p.param.name === name && p.param.value === value );
    if( exists.length > 0 ) { return this.getAllParams() }
    this.props.store.setParam({
      id: uuid(),
      param: { name, value }
    }).then(() => {
      this.getAllParams();
    })
  }

  updateParam(params){
    this.props.store.updateParam(params).then(()=>{
      this.getAllParams();
    })
  }

  deleteParam(e){
    const id = e
    this.props.store.deleteParam(id).then(()=>{
      this.getAllParams();
    })
  }

  toggleParam(param){
    const temp = !this.state[param];
    this.setState((prev) => {
      return {[param]: temp }; })
  }

  // Size Methods
  getAllSizes(){
    this.props.store.getAllSizes().then(sizes => {
      this.setState({sizes})
    })
  }

  addSize( width, height ) {
    const newSize = new SizeModel( uuid(), width, height, true );
    let exists = this.state.sizes.filter(s => s.width === width && s.height === height );
    if( exists.length > 0 ) { return this.getAllSizes() }
    this.props.store.set(newSize).then(() => {
      this.getAllSizes();
    });
  }

  updateSize(size){
    this.props.store.updateSize(size).then(sizes => {
      this.getAllSizes();
    });
  }

  deleteSize(id){
    this.props.store.delete(id).then(()=>{
      this.getAllSizes();
    });

    // process.nextTick(() => {
    //   const views = this.state.views.filter(v => v.props.id !== id);
    //   this.setState({views});
    // });
  }

  // Toggle
  toggle(name){
    const temp = !this.state.editables[name];
    // Emitter.sizeEditableEmitter.emit('toggle-edit', temp);
    // this.setState({
    //   editables: { [name]: temp }
    // })
  }

  // URL Methods

  getURL(url){
    this.setState({url})
  }

  createViews(){
    const { url , sizes, params, useSizeAsParam, usePreviewParam } = this.state;
    const ProductionURL = new URL(url)
    if ( params.length > 0){
      params.map(p => ProductionURL.searchParams.append(p.param.name, p.param.value) );
    }

    if( usePreviewParam ) {
      ProductionURL.searchParams.append('provider', 'preview')
    }
    const views =  sizes.map((size,index) => {
      const id = size.id
      const { width, height,  } = size;
      if( useSizeAsParam ) {
        ProductionURL.searchParams.append('size', '')
        ProductionURL.searchParams.set('size',`${width}x${height}`);
      }
      return <View key={index} className="layoutHolder" id={id} url={ProductionURL.href} width={width} height={height}/>
    });
    this.setState({views})
  }

  render() {
    const { sizes, views } = this.state;
    return (
      <div className="app__container">

        <div className="app__left">
          <Header
            getURL={this.getURL}
            getProtocol={this.getProtocol}
            url={this.state.url}
            createViews={this.createViews}
            reloadViews={this.reloadViews}
            viewsCreated={true}
          />
          <Toolbar />
          <ScreensContainer
            sizes={[]}
            views={[]}
            toggleSidebar={this.toggleSidebar}
            isSidebarVisible={this.state.isSidebarVisible}
          />
          <Footer />
        </div>

        <div className="app__right">
          <TabsPanel activeTab="size">
            <div label="size" icon={<SizesSVG/>}>
              <TabSection
                components={[ <AddSize /> ]}
                title="Size"/>
              <TabSection
                components={[
                  <SizeList
                    update={this.updateSize}
                    deleteSize={this.deleteSize}
                  />
                  ]}
                title="Size List"
                is_editable={true}
                is_editing={this.state.editables.size}
                toggle={this.toggle}
                 />
            </div>
            <div label="params" icon={<ParamsSVG/>}>
              <TabSection
                components={[ <AddParam add={this.addParam} /> ]}
                title="Param"/>
              {/* <TabSection
                components={[
                  <ParamList
                      update={this.updateParam}
                      deleteParam={this.deleteParam}
                      params={this.state.params} />
                  ]}
                title="Param List"
                editable={true} /> */}
            </div>
            <div label="settings" icon={<SettingsSVG/>}>
              <TabSection
                components={[
                    <GlobalSettings />
                  ]}
                title="Global Settings"
                editable={false} />
            </div>
            <div label="console" icon={<ConsoleSVG/>}>4</div>
            <div label="togglesidebar" icon={<HideSidebarSVG/>}>5</div>
          </TabsPanel>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    sizes: state.Sizes,
    params: state.Params
  };
}

const mapActionsToProps = {}

export default connect( mapStateToProps, mapActionsToProps )(App);

