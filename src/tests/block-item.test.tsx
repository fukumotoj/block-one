import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });
import {shallow} from 'enzyme';
import BlockItem from '../components/block-item';
import FieldValue from '../components/field-item';

let testBlock: any;
beforeEach(()=>{
    testBlock = createTestBlock();
});

function createTestBlock():any {
    return {
        'id': 'id',
        'block_num': 1,
        'previous': 'previous',
        'transactions': {
            'trx': {
                'actions': []
            }
        },
    }
}

describe('Tests rendering the button component', () =>{
    it('shallow Renders successfully', () =>{
        shallow(<BlockItem block={testBlock} onClick={()=>{}}/>);
    });
    it('renders the block item elements', () =>{
        let block = shallow(<BlockItem block={testBlock} onClick={()=>{}}/>);
        expect(block.find(FieldValue).length).toBe(3);
    });
    it('renders textarea on click',() =>{
        let block = shallow(<BlockItem block={testBlock} />);
        block.first().simulate('click');

        expect(block.find('textarea').length).toBe(1);
        expect(block.find('textarea').prop('value')).toEqual(JSON.stringify(testBlock));
    });
})
