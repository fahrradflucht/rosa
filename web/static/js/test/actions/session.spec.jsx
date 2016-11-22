import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import * as actions from '../../actions/session';
import sessionReducer from '../../reducers/session';
import { fakeUser, routerPushAction } from '../helpers';

const mockStore = configureMockStore([thunk]);

const sessionPath = '/api/admin/v1/session';
const initialState = sessionReducer(undefined, '');

describe('session actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('login', () => {
    const successNock = () => {
      nock(/example\.com/)
        .post(sessionPath, {
          session: {
            email: fakeUser.email,
            password: 'ImAnAnimagus',
          },
        })
        .reply(201, {
          ok: true,
          user: fakeUser,
          jwt: 'abcdefghijklmnop',
        });
    };

    it('should create a REQUEST_SESSION action', () => {
      successNock();

      const store = mockStore(initialState);

      return store.dispatch(actions.login(
        fakeUser.email,
        'ImAnAnimagus'))
        .then(() => {
          expect(store.getActions()).toInclude({ type: 'REQUEST_SESSION' });
        });
    });

    context('on success', () => {
      it('should create a SET_SESSION_USER action', () => {
        successNock();

        const store = mockStore(initialState);

        return store.dispatch(actions.login(
          fakeUser.email,
          'ImAnAnimagus'))
          .then(() => {
            expect(store.getActions()).toInclude({
              type: 'SET_SESSION_USER',
              user: fakeUser,
            });
          });
      });

      it('should redirect to /admin', () => {
        successNock();

        const store = mockStore(initialState);

        return store.dispatch(actions.login(
          fakeUser.email,
          'ImAnAnimagus'))
          .then(() => {
            expect(store.getActions()).toInclude(routerPushAction('/admin'));
          });
      });
    });

    context('on error', () => {
      it('should create a SET_SESSION_ERROR action', () => {
        nock(/example\.com/)
          .post(sessionPath, {
            session: {
              email: fakeUser.email,
              password: '',
            },
          })
          .reply(422, {
            error: 'Invalid email or password',
          });

        const store = mockStore(initialState);

        return store.dispatch(actions.login(
          fakeUser.email,
          ''))
          .then(() => {
            expect(store.getActions()).toInclude({
              type: 'SET_SESSION_ERROR',
              error: 'Invalid email or password',
            });
          });
      });
    });
  });

  describe('rehydrateSession', () => {
    const successNock = () => {
      nock(/example\.com/)
        .get(sessionPath)
        .reply(200, {
          ok: true,
          user: fakeUser,
        });
    };

    it('should create a REQUEST_SESSION action', () => {
      successNock();
      const store = mockStore(initialState);

      return store.dispatch(actions.rehydrateSession())
        .then(() => {
          expect(store.getActions()).toInclude({ type: 'REQUEST_SESSION' });
        });
    });

    context('on success', () => {
      it('should create a SET_SESSION_USER action', () => {
        successNock();
        const store = mockStore(initialState);

        return store.dispatch(actions.rehydrateSession())
          .then(() => {
            expect(store.getActions()).toInclude({
              type: 'SET_SESSION_USER',
              user: fakeUser,
            });
          });
      });
    });

    context('on error', () => {
      const errorNock = () => {
        nock(/example\.com/)
          .get(sessionPath)
          .reply(403, {
            error: 'Not Authenticated',
          });
      };

      it('should create a SET_SESSION_ERROR action', () => {
        errorNock();
        const store = mockStore(initialState);

        return store.dispatch(actions.rehydrateSession())
          .then(() => {
            expect(store.getActions()).toInclude({
              type: 'SET_SESSION_ERROR',
              error: 'Not Authenticated',
            });
          });
      });

      it('should create as SET_SESSION_ERROR action', () => {
        errorNock();
        const store = mockStore(initialState);

        return store.dispatch(actions.rehydrateSession())
          .then(() => {
            expect(store.getActions()).toInclude(routerPushAction('/admin/login'));
          });
      });
    });
  });

  describe('logout', () => {
    it('should create a DELETE_SESSION action', () => {
      const store = mockStore(initialState);

      store.dispatch(actions.logout());

      expect(store.getActions()).toInclude({ type: 'DELETE_SESSION' });
    });

    it('should redirect to /admin/login', () => {
      const store = mockStore(initialState);

      store.dispatch(actions.logout());

      expect(store.getActions()).toInclude(routerPushAction('/admin/login'));
    });
  });
});
