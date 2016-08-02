import expect from 'expect';
import toggleSidenav from '../../actions/shell';

describe('shell actions', () => {
  it('should create an action to toggle the sidenav', () => {
    expect(toggleSidenav()).toEqual({ type: 'TOGGLE_SIDENAV' });
  });
});
