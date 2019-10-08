import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });
import {shallow} from 'enzyme';
import App from '../App';

describe('Tests rendering the main component', () =>{
    it('shallow Renders successfully', () =>{
        shallow(<App />);
    })
})