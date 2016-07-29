import expect from 'expect';
import * as actions from '../../actions/shell';

describe('shell actions', () => {
  it('should create an action to toggle the sidenav', () => {
    expect(actions.toggleSidenav()).toEqual({ type: 'TOGGLE_SIDENAV' });
  });
});
