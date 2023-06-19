import { mkdir } from 'node:fs';

export const mkDir = (path, collback) => {
  mkdir(path, { recursive: true }, (err) => {
    if (err) {
      throw new Error(err.message);
    }

    collback();
  })
}