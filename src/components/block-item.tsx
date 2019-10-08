import React, { Component } from 'react';
import FieldValue from './field-item';

class BlockItem extends Component<any, any> {
    constructor(props:any, state:any){
        super(props, state);
        this.state = {
            actions: this.getActionCount(this.props.block),
            displayDetails: false
        };
    }

    private getActionCount(block:any): number {
        if (!block || !block.transactions){ return 0; }
        let count = 0;
        for(let i =0; i < block.transactions.length; i++){
            if (block.transactions[i].trx.transaction){
                count += block.transactions[i].trx.transaction.actions.length;
            }
        }
        return count;
    }

    private showTheBlockDetails() {
        this.setState({
            showDetails: true
        });
    }

    private renderBlockDetails(){
        if(!this.state.showDetails){
            return;
        }
        return (
            <textarea value={JSON.stringify(this.props.block)} readOnly></textarea>
        );
    }

    render() {
        return (
          <div className="block-list-item" onClick={() => this.showTheBlockDetails()}>
            <FieldValue name="Block ID" value={this.props.block.id} />
            <FieldValue name="Timestamp" value={this.props.block.timestamp} />
            <FieldValue name="Action Count" value={this.state.actions} />
            {this.renderBlockDetails()}
          </div>
        );
      }
}

export default BlockItem;