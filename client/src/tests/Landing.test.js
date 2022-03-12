import React from "react";
import { shallow } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Landing from "../components/Landing/Landing.jsx"
import { Link } from 'react-router-dom'; 

Enzyme.configure({ adapter: new Adapter() });

describe("Landing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Landing />);
  });

  it("deberia renderizar un componente <Link>", () => {
    expect(wrapper.find(Link)).toHaveLength(1);
  });

  it('El <Link> deberia redirigir a "/home" ', () => {
    expect(wrapper.find(Link).prop("to")).toEqual("/home");
  });
});
