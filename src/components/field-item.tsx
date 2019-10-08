import React, { Component } from 'react';

interface FieldValueProps {
    name: string,
    value: string | number
}

class FieldValue extends Component<FieldValueProps, any> {

  render() {

    return (
      <div className="block-field">
        <span className="field-name">{this.props.name}:</span> 
        <span className="field-value">{this.props.value}</span>
      </div>
    );
  }

}
export default FieldValue;