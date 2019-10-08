import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });
import {shallow} from 'enzyme';
import BlockList from '../components/block-list';
import { number } from 'prop-types';

let testBlocks: any;
beforeEach(() =>{
    testBlocks = [];
    for(let i = 10; i >= 1; i--){
        testBlocks.push(createTestBlock('id'+(i+1), i, 'id'+i));
    }
});

describe('Tests rendering the button component', () =>{
    it('shallow Renders successfully', () =>{
        shallow(<BlockList blocks={testBlocks}/>);
    });
    it('renders the list', ()=> {
        const component = shallow(<BlockList blocks={testBlocks}/>);
        expect(component.find('ul').at(0));
    });
    it('renders the correct number of blocks', () => {
        const component = shallow(<BlockList blocks={testBlocks}/>);
        const item = component.find('ul').at(0);
        expect(item.children().length).toBe(10);
    });
});

function createTestBlock(blockId:string, num:number, previousBlock:string): any{
    return {
        id: blockId,
        block_num: num,
        previous: previousBlock
    };
}