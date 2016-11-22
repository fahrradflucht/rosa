import { internet, name, random } from 'faker';

// Actions
export const routerPushAction = to => (
  {
    type: '@@router/CALL_HISTORY_METHOD',
    payload: {
      method: 'push',
      args: [to],
    },
  }
);

// Fixtures
export const fakeUser = {
  last_name: name.lastName(),
  first_name: name.firstName(),
  id: random.number().toString(),
  email: internet.email(),
};
