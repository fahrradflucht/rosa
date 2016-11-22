import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import Login from '../../components/Login';

describe('<Login />', () => {
  it('should the login form', () => {
    const props = {
      error: null,
      submit: () => {},
    };
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('should render an <Alert /> if an error is present', () => {
    const props = {
      error: 'the roof is on fire',
      submit: () => {},
    };
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper.find('Alert').length).toEqual(1);
  });

  it('should render an <Alert /> if an error isn\'t present', () => {
    const props = {
      error: null,
      submit: () => {},
    };
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper.find('Alert').length).toEqual(0);
  });

  it('renders the fields email, password, and rememberMe control', () => {
    const props = {
      error: null,
      submit: () => {},
    };
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper.find('[name="email"]').length).toEqual(1);
    expect(wrapper.find('[name="password"]').length).toEqual(1);
    expect(wrapper.find('[name="rememberMe"]').length).toEqual(1);
  });

  it('should call submit on sign in button click', () => {
    const props = {
      error: null,
      submit: expect.createSpy(),
    };
    const event = {
      preventDefault: () => {},
      target: {
        elements: {
          email: { value: 'mail@example.com' },
          password: { value: '12345678' },
          rememberMe: { checked: false },
        },
      },
    };
    const wrapper = shallow(<Login {...props} />);
    wrapper.find('form').simulate('submit', event);

    expect(props.submit).toHaveBeenCalledWith(
      'mail@example.com',
      '12345678',
      false,
    );
  });
});
