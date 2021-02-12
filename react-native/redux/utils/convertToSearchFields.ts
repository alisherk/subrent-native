export const convertToFields = (str: string, price1: string, price2: string) => {
  const searchFields: string[] = [];
  const lowerCaseText = str.toLowerCase().trim();
  //if name contains multiple words, split them up
  if (lowerCaseText.indexOf(' ') > 0) {
    const strChunks: string[] = lowerCaseText.split(' ');
    //include the split word parts along with original word with 2 sets of price
    searchFields.push(...strChunks, lowerCaseText, price1, price2);
    return searchFields;
  }
  //if name contains one word, slice it into 2 for easy search
  const mid = Math.ceil(lowerCaseText.length / 2);
  const s1 = lowerCaseText.slice(0, mid);
  const s2 = lowerCaseText.slice(mid);
  searchFields.push(s1, s2, lowerCaseText, price1, price2);
  return searchFields;
}
