import React from 'react';
import ReactDOM from 'react-dom';

class UrlBox extends React.Component{
  constructor(props) {
    super(props);
    console.log("props")
    console.log(props)
    this.state={
      url: ""
    }
  }
  handleChange(event) {
    this.setState({ url: event.target.value });
  }
  submitUrl(e){
   e.preventDefault();
   this.props.load(this.state.url);
   this.setState({ url:"" })
  }
  render() {
    return (
      <form id="myform" className="well clearfix">
        <div className="col-lg-7 col-sm-7">
          <input id="urlBox" className="form-control" onChange={this.handleChange.bind(this)} value={this.state.url}/>
        </div>
        <button className="btn btn-primary pull-left" onClick={this.submitUrl.bind(this)}>Load Url</button>
      </form>
    );
  }
};

export default UrlBox;
