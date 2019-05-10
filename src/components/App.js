import '../assets/css/App.css'
import React, { Fragment } from 'react'

// Import Components
import ScreensContainer from './ScreensContainer';
import TabsPanel from './TabsPanel';
import TabSection from './TabSection';
import Header from './Header';
import View from './View';
import Toolbar from './Toolbar';
import Footer from './Footer';
import GlobalSettings from './GlobalSettings';

// Options Initial State
import OptionInitialState from '../models/OptionsInitialState';
import AppSettings from '../models/AppSettingsInitialState';

// Size components
import AddSize from '../containers/AddSize';
import SizeList from './SizeList';

// Param components
import AddParam from '../containers/AddParam'
import ParamList from './ParamList';

// Import Emitters
import Emitter from '../emitter/emitter'

// Icons
import SizesSVG from './icons/Sizes'
import ParamsSVG from './icons/Params'
import SettingsSVG from './icons/Settings'
import ConsoleSVG from './icons/Console'
import HideSidebarSVG from './icons/HideSidebar'

// REDUX
import { addOptions, fetchOptions } from '../actions/optionsMethods'
import { fetchSizes } from '../actions/sizeMethods'
import { fetchParams } from '../actions/paramMethods'
import { connect, } from 'react-redux';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      views: [],
      url: "",
      appSettings: null
    }

    // Header Methods
    this.createViews = this.createViews.bind(this);
    this.getURL = this.getURL.bind(this);

    // Helper Methods
    this.instantiateEmitters = this.instantiateEmitters.bind(this)
    this.toggleSetting = this.toggleSetting.bind(this)
  }

  componentWillMount() {
    this.setState({appSettings: AppSettings})
  }

  componentDidMount() {
    const { addOptions, fetchOptions, fetchParams, fetchSizes } = this.props
    fetchSizes()
    fetchParams()
    fetchOptions().then((data) => {
      data.length == 0 ?  addOptions(OptionInitialState) : false;
    });
    this.instantiateEmitters();
  }

  instantiateEmitters(){

    Emitter.ShortcutEmitter.on('create-views', () => {
      this.createViews()
    });
  }

  // URL Methods

  getURL(url){
    this.setState({url})
  }

  toggleSetting(name, value){
    this.setState( prev => prev.appSettings[name] = value )
  }

  createViews(){
    const { url } = this.state;
    if( url.length === 0 ) return false;

    const { sizes, params, options } = this.props;
    const ProductionURL = new URL(url);
    if( options[0].usePreviewParam ) {
      ProductionURL.searchParams.append('provider', 'preview');
    }
    const filteredSizes = sizes.filter(size => size.checked );
    const filteredParams = params.filter(param => param.checked );

    filteredParams.length > 0 ? filteredParams.map(p => ProductionURL.searchParams.append(p.name, p.value) ) : false;

    const views =  filteredSizes.map((size,index) => {
      const id = size.id
      const { width, height,  } = size;
      if( options[0].useSizeAsParam ) {
        ProductionURL.searchParams.append('size', '')
        ProductionURL.searchParams.set('size',`${width}x${height}`);
      }
      return <View
        showViewsHeader={options[0].showViewsHeader.value }
        key={index}
        className="layoutHolder"
        id={id}
        url={ProductionURL.href}
        width={width}
        height={height} />
    });
    this.setState({views})
  }

  render() {

    const { areViewsCreated, areSizesEditable, areParamsEditable  } = this.state.appSettings
    return (
      <div className="app__container">

        <div className="app__left">
          <Header
            getURL={this.getURL}
            getProtocol={this.getProtocol}
            url={this.state.url}
            createViews={this.createViews}
          />
          <Toolbar />
          <ScreensContainer views={this.state.views} />
          <Footer url={this.state.url} />
        </div>

        <div className="app__right">
          <TabsPanel activeTab="size">
            <div label="size" icon={<SizesSVG/>}>
              <TabSection
                components={[ <AddSize /> ]}
                title="Size"/>
              <TabSection
                components={[ <SizeList is_editing={areSizesEditable}/> ]}
                title="Size List"
                is_editing={areSizesEditable}
                name={'areSizesEditable'}
                toggle={this.toggleSetting}
                is_editable={true}
                 />
            </div>
            <div label="params" icon={<ParamsSVG/>}>
              <TabSection
                components={[ <AddParam /> ]}
                title="Param"/>
              <TabSection
                components={[ <ParamList is_editing={areParamsEditable} /> ]}
                title="Param List"
                is_editing={areParamsEditable}
                name={'areParamsEditable'}
                toggle={this.toggleSetting}
                is_editable={true} />
            </div>
            <div label="settings" icon={<SettingsSVG/>}>
              <TabSection
                components={[ <GlobalSettings /> ]}
                title="Global Settings"
                is_editable={false} />
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
    sizes: state.SizeReducer.sizes || [],
    params: state.ParamReducer.params || [],
    options: state.OptionReducer.options || []
  };
}

const mapDispatchToProps = dispatch => ({
  addOptions: option => dispatch(addOptions(option)),
  fetchOptions: option => dispatch(fetchOptions(option)),
  fetchParams: option => dispatch(fetchParams(option)),
  fetchSizes: option => dispatch(fetchSizes(option)),
})

export default connect( mapStateToProps, mapDispatchToProps )(App);

