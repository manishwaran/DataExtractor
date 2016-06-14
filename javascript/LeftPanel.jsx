import React from 'react';
import ReactDOM from 'react-dom';
import AppendItem from './AppendItem.jsx'

class LeftPanel extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      element: [],
      obj: [],
      jsonData: [],
    }
    this.addDivision=this.addDivision.bind(this);
    this.processQuery=this.processQuery.bind(this);
    this.clearQuery=this.clearQuery.bind(this);
    this.deleteElement=this.deleteElement.bind(this);
  }
  addDivision(){
    var element = <AppendItem input={this.props.input}/>
    this.setState({ obj:this.props.input })
    var preState = this.state.element
    var newState = preState.concat(element);
    this.setState({  element: newState });
    if(this.state.element.length>0){
      this.state.jsonData.push(this.state.obj)
    }
  }
  processQuery(){
    this.state.jsonData.push(this.state.obj)
    this.props.parseData(this.state.jsonData);
    this.setState({ jsonData:[] })
  }
  clearQuery(){
    this.setState({element: []});
  }
  deleteElement(a) {
    this.state.element.splice(a, 1);
    this.setState({element: this.state.element});
  }
  render(){
    var _this=this;
    var createDivision = function(item,i) {
      return(
        <div id={"append"+i} className="append-box">
            <div id='close' style={{float: 'right',color:'red'}} onClick={_this.deleteElement.bind(null, i)} >close</div>
            {item}
        </div>
      );
    };
    return(
      <div>
        <button className="btn btn-default" onClick={this.addDivision} style={{margin:10}}> + </button>
        <button className="btn btn-primary" onClick={this.processQuery} style={{margin:10}}> Execute </button>
        <button className="btn btn-primary" onClick={this.clearQuery} style={{margin:10}}> Clear </button>
        {this.state.element.map(createDivision)}
      </div>
    );
  }
}


export default LeftPanel;
