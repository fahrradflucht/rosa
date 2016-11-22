import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import SidenavLink from '../../components/SidenavLink';

describe('<SidenavLink />', () => {
  it('should render a li', () => {
    const props = {
      to: '#',
      children: 'Test',
    };
    const wrapper = shallow(<SidenavLink {...props} />);
    expect(wrapper.find('li').length).toEqual(1);
  });

  it('should render a <Link />', () => {
    const props = {
      to: '#',
      children: 'Test',
    };
    const wrapper = shallow(<SidenavLink {...props} />);
    expect(wrapper.find('Link').length).toEqual(1);
  });

  it('should pass its \'to\' prop to <Link />', () => {
    const props = {
      to: '#',
      children: 'Test',
    };
    const wrapper = shallow(<SidenavLink {...props} />);
    expect(wrapper.find('Link').prop('to')).toEqual(props.to);
  });

  it('should pass its children to <Link />', () => {
    const props = {
      to: '#',
      children: <p>Test</p>,
    };
    const wrapper = shallow(<SidenavLink {...props} />);
    expect(
      wrapper.find('Link').childAt(0).equals(props.children),
    ).toBe(true);
  });

  it('should pass other props to the li', () => {
    const props = {
      to: '#',
      children: 'Test',
      className: 'sidenav-brand',
    };
    const wrapper = shallow(<SidenavLink {...props} />);
    expect(wrapper.find('li').prop('className')).toEqual(props.className);
  });
});
