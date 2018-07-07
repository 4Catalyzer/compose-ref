import invariant from 'invariant';

export default function composeRefs(...refs) {
  invariant(
    !refs.some(r => typeof r === 'string'),
    'Cannot compose string refs!',
  );

  return current => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(current);
      else if (ref != null) ref.current = current;
    }
  };
}
