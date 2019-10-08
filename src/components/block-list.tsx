import React, { Component } from 'react';
import BlockItem from './block-item';

class BlockList extends Component<any, any> {
    render() {
        let blockList = this.props.blocks.map((block:any) =>
            <li key={block.block_num}>
                <BlockItem block = {block} />
            </li>
        );

        return (
          <ul className="blocks">
              {blockList}
          </ul>  
        );
    }
}

export default BlockList;