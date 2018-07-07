import composeRef from '../src';
import React from 'react';
import ReactDOM from 'react-dom';

describe('composeRef', () => {
  it('should compose refs', () => {
    const container = document.createElement('div');
    let fnRef;
    const ref = React.createRef();
    const composed = composeRef(ref, r => {
      fnRef = r;
    });

    const RefHolder = React.forwardRef((props, inner) => <div ref={inner} />);

    class Wrapper extends React.Component {
      render() {
        return <RefHolder ref={composed} />;
      }
    }

    ReactDOM.render(<Wrapper />, container);

    expect(fnRef.tagName).toEqual('DIV');
    expect(ref.current.tagName).toEqual('DIV');
  });

  it('should warn about string refs', () => {
    expect(() => composeRef(React.createRef(), () => {}, 'foo')).toThrow(
      'Cannot compose string refs!',
    );
  });
});
