import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });
import {shallow} from 'enzyme';
import BlockLoadingButton from '../components/button';

describe('Tests rendering the button component', () =>{
    it('shallow Renders successfully', () =>{
        shallow(<BlockLoadingButton onClick={()=>{}}/>);
    });
});
describe('Tests the functionality of the button', () =>{
    it('the button should be clicked',() => {
        const mockClickHandlerSpy = jest.fn();
        const button = shallow(<BlockLoadingButton onClick={mockClickHandlerSpy} />)
        button.prop('onClick')();
        expect(mockClickHandlerSpy).toHaveBeenCalled();
    })
});
