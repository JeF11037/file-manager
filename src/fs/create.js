import { writeFile } from 'node:fs/promises';

const createFile = async (path) => {
    try
    {
        await writeFile(path, '');
        return true;
    }
    catch
    {
        return false;
    }
}

export { createFile }