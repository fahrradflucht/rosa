import expect from 'expect';
import shell from '../../reducers/shell';

describe('shell reducer', () => {
  it('should have an initial state', () => {
    expect(shell(undefined, '')).toExist();
  });

  it('toggle the toggled state on TOGGLE_SIDENAV', () => {
    expect(shell({ toggled: false }, { type: 'TOGGLE_SIDENAV' })).toEqual({
      toggled: true,
    });
    expect(shell({ toggled: true }, { type: 'TOGGLE_SIDENAV' })).toEqual({
      toggled: false,
    });
  });

  it('should not toggle the state on other actions', () => {
    expect(shell({ toggled: false }, { type: 'TEST' })).toEqual({
      toggled: false,
    });
  });
});
