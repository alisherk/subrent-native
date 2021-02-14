import { uploadImage } from '../uploadImage';
import { firebase } from '../../../firebase';
jest.mock('../../../firebase'); 

global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
 
describe('uploadImage', () => {
  it('throws error', async () => {
    await expect(uploadImage('test', 'test', 'name', firebase.storage)).rejects.toThrow();
  });
});
