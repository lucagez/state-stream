import { or } from './_utils';

function *stream(func, state) {
  const newState = yield state;
  yield *stream(
      func,
      func(or(newState, state)),
  );
}

export default stream;
