import { rm } from 'node:fs/promises';

const removeFile = async (path) => {
    try
    {
        await rm(path);
        return true;
    }
    catch
    {
        return false;
    }
}

export { removeFile }