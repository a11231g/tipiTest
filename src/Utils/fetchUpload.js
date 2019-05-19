import { apiPath } from "../Config";

const futch = function(url, opts = {}, onProgress) {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method || "get", apiPath + url);
    for (const k in opts.headers || {}) {
      xhr.setRequestHeader(k, opts.headers[k]);
    }
    xhr.onload = e => res(e.target);
    xhr.onerror = rej;
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = onProgress;
    }
    xhr.send(opts.body);
  });
};
export default futch;
