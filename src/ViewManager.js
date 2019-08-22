import React, { Component, Fragment } from 'react';
import {
 BrowserRouter as Router,
 Route
} from 'react-router-dom';

import TestingTool from './views/TestingTool';
import Home from './views/Home';


class ViewManager extends Component {
  constructor(props){
    super(props)
    this.Views = this.Views.bind(this);
    this.View = this.View.bind(this);
  }
  Views() {
    return {
      testingTool: <TestingTool/>,
      home: <Home/>
    }
 }

 View(props) {
  let name = props.location.search.substr(1);
  let view = this.Views()[name];
  if( props.location.search == "") return this.Views().home;
  if( view == null ) throw new Error(`View ${name} is undefined`);
  return view;
 }

 render() {
  return (
    <Router>
      <Fragment>
        <Route path='/' component={this.View}/>
        {console.log(this.props)}
      </Fragment>
    </Router>
  );
 }
}
export default ViewManager
