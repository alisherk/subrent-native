import { uploadImage } from '../uploadImage';
import { firebase } from 'gateway';
jest.mock('gateway'); 

global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
 
describe('uploadImage', () => {
  it('throws error', async () => {
    await expect(uploadImage('test', 'test', 'name', firebase.storage)).rejects.toThrow();
  });
});
