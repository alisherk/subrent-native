export const uploadImage = async (uri: string, path: string, imageName: string, storage: firebase.storage.Storage): Promise<string> => {
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  if (!blob) throw new Error('There is no blob available');
  const ref = storage.ref().child(`${path}/${imageName}`);
  const snapshot = await ref.put(blob);

  //@ts-ignore
  blob.close();
  return snapshot.ref.getDownloadURL();
};
