import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import Sidenav from '../../components/Sidenav';

describe('<Sidenav />', () => {
  it('should render the logout button', () => {
    const props = {
      onLogoutButtonClick: () => {},
    };
    const wrapper = shallow(<Sidenav {...props} />);
    expect(wrapper.find('#logout').length).toEqual(1);
  });

  it('should call onLogoutButtonClick', () => {
    const props = {
      onLogoutButtonClick: expect.createSpy(),
    };

    const wrapper = shallow(<Sidenav {...props} />);
    wrapper.find('#logout').simulate('click');

    expect(props.onLogoutButtonClick).toHaveBeenCalled();
  });
});
