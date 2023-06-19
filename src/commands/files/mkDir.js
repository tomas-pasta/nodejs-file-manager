import { mkdir } from 'node:fs';

export const mkDir = (path, collback) => {
  mkdir(path, { recursive: true }, (err) => {
    if (err) {
      console.log(err.message);
    }

    collback();
  })
}