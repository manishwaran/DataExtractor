import React from 'react';
import ReactDOM from 'react-dom';
import UrlBox from './UrlBox.jsx';
import ResultBox from './ResultBox.jsx';
import LeftPanel from './LeftPanel.jsx';
import Iframe from './Iframe.jsx';
import AppendItem from './AppendItem.jsx';
import cssPath from './utils/css-path'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      url:"",
      obj: [],
      jsonInput: [],
      jsonOutput: [],
    }
    this.onSelect=this.onSelect.bind(this)
    this.executeQuery=this.executeQuery.bind(this)
    this.loadUrl=this.loadUrl.bind(this)
  }
  onSelect(input) {
    this.setState({ obj:input });
    console.log(input);
  }
  executeQuery(data){
    this.state.jsonInput=data;
    var _this=this
    $.post("/getresult",{data: JSON.stringify(this.state.jsonInput)},function(data, status){
      _this.setState({ jsonOutput:data });
      console.log(_this.state.jsonOutput);
    });
  }
  loadUrl(submittedUrl){
    this.setState({ jsonInput:[] })
    this.setState({ jsonOutput:[] })
    this.state.url=submittedUrl;
    alert(this.state.url)
    $.post("/loadwebpage",{"url":this.state.url},function(data, status){
      $('#myIframe').contents().find('body').html(data);
    });
  }
  render(){
     return(
       <div>
        <div className="row">
          <UrlBox load={this.loadUrl} val={this.state.url}/>
        </div>
        <div className="row" style={{padding:25}}>
          <div  className="col col-lg-7" >
            <div className="row">
              <Iframe url={this.state.url} onSelect={this.onSelect}/>
            </div>
            <div className="row">
              <ResultBox result={this.state.jsonOutput}/>
            </div>
          </div>
          <div className="col col-lg-4">
            <LeftPanel  parseData={this.executeQuery} input={this.state.obj} />
          </div>
        </div>
       </div>
     );
   }
}

jQuery.fn.extend({
    getPath: function () {
        // var path, node = this;
        //
        // console.log("getPath");
        // while (node.length) {
        //     var realNode = node[0], name = realNode.localName;
        //     if (!name) break;
        //     name = name.toLowerCase();
        //
        //     var parent = node.parent();
        //
        //     var sameTagSiblings = parent.children(name);
        //     if (sameTagSiblings.length > 1) {
        //         var allSiblings = parent.children();
        //         var index = allSiblings.index(realNode) + 1;
        //         if (index > 1) {
        //             name += ':nth-child(' + index + ')';
        //         }
        //     }
        //
        //     path = name + (path ? '>' + path : '');
        //     node = parent;
        // }
        // return path;
        // debugger
        return cssPath(this[0], $)
    }
});

export default App;
