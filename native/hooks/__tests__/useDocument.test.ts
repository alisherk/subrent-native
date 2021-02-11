import { useDocument } from '../useDocument';
import { renderHook, cleanup, act } from '@testing-library/react-hooks';

describe('useDocument', () => {
  afterEach(cleanup);

  it('fetched data', async () => {
    const doc = { id: 1, name: 'rental' };
    const snap = { exists: true, data: () => doc };
    const docRef: any = { get: () => Promise.resolve(snap) };
    const { result } = renderHook(() => useDocument(docRef, []));
    await act(() => Promise.resolve());
    expect(result.current[0]).toEqual(doc);
  });

  it('throws error', async () => {
    const doc = { id: 1, name: 'rental', exists: false };
    const docRef: any = { get: () => Promise.resolve(doc) };
    const { result } = renderHook(() => useDocument(docRef, []));
    await act(() => Promise.resolve());
    const [, , error] = result.current;
    expect(error).toBe('Document is empty');
  });

  it('reloads the state', async () => {
    const doc = { id: 1, name: 'rental' };
    const snap = { exists: true, data: () => doc };
    const docRef: any = { get: () => Promise.resolve(snap) };
    const { result, waitForNextUpdate } = renderHook(() => useDocument(docRef, []));
    await act(() => Promise.resolve());
    const [, , , reload] = result.current;
    act(() => reload()); 
    expect(result.current[1]).toBe('loading');
    await waitForNextUpdate();
    expect(result.current[0]).toEqual(doc);
  });
});
