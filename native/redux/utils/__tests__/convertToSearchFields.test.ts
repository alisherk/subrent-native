import { convertToFields } from '../convertToSearchFields';

describe('convertToSearchFields', () => {
    
  it('splits one word into 2 parts & retains the word', () => {
    const data = convertToFields('bobcat', '10', '5');
    expect(data).toEqual(['bob', 'cat', 'bobcat', '10', '5']);
  });

  it('splits a word by spaces', () => {
    const data = convertToFields('manual saw', '10', '5');
    expect(data).toEqual(['manual', 'saw', 'manual saw', '10', '5']);
  });
});
