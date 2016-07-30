import expect from 'expect';
import session from '../../reducers/session';
import { fakeUser } from '../helpers';

describe('session reducer', () => {
  it('should have an initial state', () => {
    expect(session(undefined, '')).toExist();
  });

  it('should set isFetching: true on REQUEST_SESSION', () => {
    expect(session(undefined, { type: 'REQUEST_SESSION' }).isFetching)
      .toEqual(true);
  });

  it('should set isFetching: false on SET_SESSION_USER', () => {
    const initialState = Object.assign(session(undefined, ''), {
      isFetching: true,
    });
    expect(session(initialState, { type: 'SET_SESSION_USER' }).isFetching)
      .toEqual(false);
  });

  it('should set the user on SET_SESSION_USER', () => {
    expect(session(undefined, {
      type: 'SET_SESSION_USER',
      user: fakeUser,
    }).user).toEqual(fakeUser);
  });

  it('should set isFetching: false on SET_SESSION_ERROR', () => {
    const initialState = Object.assign(session(undefined, ''), {
      isFetching: true,
    });
    expect(session(initialState, { type: 'SET_SESSION_ERROR' }).isFetching)
      .toEqual(false);
  });

  it('should set the error on SET_SESSION_ERROR', () => {
    expect(session(undefined, {
      type: 'SET_SESSION_ERROR',
      error: new Error('Not Authenticated'),
    }).error).toEqual(new Error('Not Authenticated'));
  });

  it('should reset the state on DELETE_SESSION', () => {
    const initialState = Object.assign(session(undefined, ''), {
      user: fakeUser,
    });
    expect(session(initialState, { type: 'DELETE_SESSION' })).toEqual(
      session(undefined, '')
    );
  });
});
