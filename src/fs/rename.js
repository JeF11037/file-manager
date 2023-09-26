import { rename } from 'node:fs/promises';

const renameFile = async (path_from, path_to) => {
    try
    {
        await rename(path_from, path_to);
        return true;
    }
    catch
    {
        return false;
    }
}

export { renameFile }