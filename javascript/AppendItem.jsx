import React from 'react';
import ReactDOM from 'react-dom';

class AppendItem extends React.Component{
  render() {
    return(
      <div>
        <form role = "form" >
            <div className="row" style={{padding:5}}>
                <label className="col-lg-4 pull-left">CSS Field</label>
                <input className="col-lg-6 pull-left" type="text" name="css-input" id="css-input"  value={this.props.input.css} />
            </div>
            <div className="row" style={{padding:5}}>
                <label className="col-lg-4 pull-left">Attribute Field</label>
                <input className="col-lg-6 pull-left" type="text" name="attr-input" id="attr-input"  value={this.props.input.attr} />
            </div>
        </form>
      </div>
    );
  }
}

export default AppendItem;
