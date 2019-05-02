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
import OptionInitialState from '../models/OptionsInitialState';

// Size components
import AddSize from '../containers/AddSize';
import SizeList from './SizeList';

// Param components
import AddParam from '../containers/AddParam'
import ParamList from './ParamList';

// Import helpers
import Emitter from '../emitter/emitter'

// Icons
import SizesSVG from './icons/Sizes'
import ParamsSVG from './icons/Params'
import SettingsSVG from './icons/Settings'
import ConsoleSVG from './icons/Console'
import HideSidebarSVG from './icons/HideSidebar'

// REDUX
import { addOptions, fetchOptions } from '../actions/optionsMethods'
import { connect, } from 'react-redux';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editables: {
        size: false,
        params: false
      },
      views: [],
      history: [],
      url: "www.google.com",
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
    // this.getAllParams = this.getAllParams.bind(this);
    // this.addParam = this.addParam.bind(this);
    // this.updateParam = this.updateParam.bind(this);
    // this.deleteParam = this.deleteParam.bind(this);

    // Use size as Param
    this.toggleParam = this.toggleParam.bind(this)

    // Helper Methods
    this.instantiateEmitters = this.instantiateEmitters.bind(this)
  }

  componentDidMount() {
    const { addOptions, fetchOptions } = this.props
    fetchOptions().then((data) => {
      if(data.length == 0){
        for( const option of OptionInitialState ){
          addOptions(option)
        }
      }
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
  // getAllParams(){
  //   this.props.store.getAllParams().then(params => {
  //     this.setState({params})
  //   })
  // }

  // addParam(params){
  //   const { name, value } = params
  //   let exists = this.state.params.filter(p => p.param.name === name && p.param.value === value );
  //   if( exists.length > 0 ) { return this.getAllParams() }
  //   this.props.store.setParam({
  //     id: uuid(),
  //     param: { name, value }
  //   }).then(() => {
  //     this.getAllParams();
  //   })
  // }

  // updateParam(params){
  //   this.props.store.updateParam(params).then(()=>{
  //     this.getAllParams();
  //   })
  // }

  // deleteParam(e){
  //   const id = e
  //   this.props.store.deleteParam(id).then(()=>{
  //     this.getAllParams();
  //   })
  // }

  toggleParam(param){
    const temp = !this.state[param];
    this.setState((prev) => {
      return {[param]: temp }; })
  }

  // Toggle
  toggle(name){
    const temp = !this.state.editables[name];
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
          <TabsPanel activeTab="params">
            <div label="size" icon={<SizesSVG/>}>
              <TabSection
                components={[ <AddSize /> ]}
                title="Size"/>
              <TabSection
                components={[ <SizeList/> ]}
                title="Size List"
                is_editable={true}
                is_editing={this.state.editables.size}
                toggle={this.toggle}
                 />
            </div>
            <div label="params" icon={<ParamsSVG/>}>
              <TabSection
                components={[ <AddParam /> ]}
                title="Param"/>
              <TabSection
                components={[ <ParamList /> ]}
                title="Param List"
                is_editing={this.state.editables.size}
                toggle={this.toggle}
                editable={true} />
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
  };
}

const mapDispatchToProps = dispatch => ({
  addOptions: option => dispatch(addOptions(option)),
  fetchOptions: option => dispatch(fetchOptions(option)),
})

export default connect( mapStateToProps, mapDispatchToProps )(App);

