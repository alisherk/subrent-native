import { debounce } from '..';

// tell jest to mock all timeout functions
jest.useFakeTimers();

describe('debounce', () => {
    
  let debouncedFunc: Function;

  it('execute just once', () => {
    const func: jest.Mock = jest.fn();
    debouncedFunc = debounce(func, 1000);
    for (let i = 0; i <= 10; i++) {
      debouncedFunc();
    }
    // fast-forward time
    jest.runAllTimers();

    expect(func).toBeCalledTimes(1);
  });

  it('execute once immediately', () => {
    const func: jest.Mock = jest.fn();
    debouncedFunc = debounce(func, 1000, { isImmediate: true });
    debouncedFunc();
    expect(func).toBeCalledTimes(1);
  });
});
