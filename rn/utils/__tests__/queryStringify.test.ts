import { queryStringify } from '../queryStringify';

describe('queryStringify', () => {

  it('stringifies simple object', () => {
    const result = queryStringify({ a: 'a', b: 'b' });
    expect(result).toBe('a=a&b=b');
  });

  it('adds prefix', () => {
    const result = queryStringify({ a: 'a', b: 'b' }, 'super');
    expect(result).toBe(('super[a]=a&super[b]=b'));
  });
  
  it('stringifies nested object', () => {
    const result = queryStringify({ a: 'a', b: 'b', c: { c: 'c' } });
    expect(result).toBe('a=a&b=b&c[c]=c');
  });

  it('URL encodes', () => {
    const result = queryStringify({ value: 'value?' });
    expect(result).toBe('value=value%3F');
  });
});
