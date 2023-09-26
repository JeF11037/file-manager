import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { access, constants } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';

const decompressFile = async (path_from, path_to) => {
    try
    {
        await access(path_from, constants.R_OK);
        const readable = createReadStream(path_from);
        const brotli = createBrotliDecompress();
        const writable = createWriteStream(path_to);
        await pipeline(
            readable,
            brotli,
            writable
        );
        return true;
    }
    catch
    {
        return false;
    }
}

const compressFile = async (path_from, path_to) => {
    try
    {
        await access(path_from, constants.R_OK);
        const readable = createReadStream(path_from);
        const brotli = createBrotliCompress();
        const writable = createWriteStream(path_to);
        await pipeline(
            readable,
            brotli,
            writable
        );
        return true;
    }
    catch
    {
        return false;
    }
}

export { compressFile, decompressFile }