import path from 'path';

export const getAbsolutePath = (filePath) => (
  path.resolve(process.env.CURRENT_DIR, filePath)
);