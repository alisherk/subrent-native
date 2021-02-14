import { usePaginateQuery } from '../usePaginateQuery';
import { renderHook, cleanup } from '@testing-library/react-hooks';

const doc = { id: 1, name: 'test', forEach: () => doc };
const query: any = {
  id: doc.id,
  data: () => doc,
  get: () => Promise.resolve(doc),
  docs: { map: (cb: any) => cb(query) },
  startAfter: jest.fn, 
  limit: () => 1
};

it('calls the hook', async () => {
  const { result } = renderHook(() => usePaginateQuery(query));
  expect(result.current.rentals).toBeTruthy()
});

afterAll(cleanup);
