/**
 * File used of google chrome snippets for deliberate practice. Persisted in this repo.
 * 
 * LATEST OBSERVATIONS:
 * The generator holds its internal state in what apparently seems a quite 'pure' way.
 * When invoking 'next' applying a new snapshot of the state, the other Mapped streams
 * retains the last state of the original stream.
 * 
 *  => How this can be used for dispatching state updates?
 */

or = (a, b) => a === void(0) ? b : a;

// function *stream(func, state) {
//   const newState = yield state;
//   yield *stream(
//       func,
//       func(or(newState, state)),
//   );
// }

Stream = (func, initial) => {
    const internal = function *stream(state) {
        const newState = yield state;
        yield *stream(
            func(or(newState, state)),
        );
    }

    const initialized = internal(initial);

    // first read
    initialized.next(initial);

    return (news) => {
        const { value } = initialized.next(news);
        return value;
    };
}

Identity = id => id;

Map = (func, rawStream) => (value) => func(rawStream(value));

next = Stream(Identity, 10);

multiplied = Map(v => v * 3, next);

log = Map((v) => console.log('logging:', v), next);
