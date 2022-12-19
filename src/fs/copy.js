import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { rm, access, constants } from 'node:fs/promises';

const moveFile = async (path_src, path_to) => {
    try
    {
        await copyFile(path_src, path_to);
        await rm(path_src);
        return true;
    }
    catch
    {
        return false;
    }
}
const copyFile = async (path_src, path_to) => {
    try
    {
        await access(path_src, constants.R_OK);
        const readable = createReadStream(path_src);
        const writable = createWriteStream(path_to);
        await pipeline(
            readable,
            writable
        );
        return true;
    }
    catch
    {
        return false;
    }
}

export { copyFile, moveFile }