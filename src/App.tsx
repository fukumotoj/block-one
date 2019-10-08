import React, { Component } from 'react';
import { EOSBlockLoader }  from './blockloader';
import BlockLoadingButton from './components/button';
import BlockList from './components/block-list';

class App extends Component<any, any> {
  private blockLoader: EOSBlockLoader; 
  
  constructor(props:any, state:any) {
    super(props, state);
    this.state = {
      state:'',
      blockList: []
    };

    this.blockLoader = new EOSBlockLoader();
  }
  async load(): Promise<any> {
    if(this.props.state === 'loading'){ return; }
    this.setState({
      state:'loading'
    });
    try {
      const blockList = await this.blockLoader.loadBlocks();
      this.setState({
        state:'loaded',
        blockList: blockList
      });
    } catch {
      this.setState({
        state:'error',
        blockList: []
      })
    }
  }
  render() {
    return (
      <div>
        <BlockLoadingButton onClick={() => { this.load(); } }></BlockLoadingButton> 
        <BlockList blocks={this.state.blockList} />
      </div>
    );
  }
}
export default App;