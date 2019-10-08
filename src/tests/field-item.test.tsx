import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });
import {shallow} from 'enzyme';
import FieldItem from '../components/field-item';

describe('Tests rendering the button component', () =>{
    it('shallow Renders successfully', () =>{
        shallow(<FieldItem name="" value=""/>);
    });
    it('Field should have a value', () =>{
        let item = shallow(<FieldItem name="Block ID" value="04f959393b18b26cfcfb6743802e74ebc44ea0d2df9f5bed46b1b00c51e838c7" />);
        expect(item.text()).toBe("Block ID:04f959393b18b26cfcfb6743802e74ebc44ea0d2df9f5bed46b1b00c51e838c7");
    });
})