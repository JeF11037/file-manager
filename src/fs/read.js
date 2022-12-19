import { createReadStream } from 'node:fs';
import { access, constants } from 'node:fs/promises';

const readFile = async (path) => {
    try
    {
        await access(path, constants.R_OK)
        const readableStream = createReadStream(path);
        return new Promise((resolve, reject) => {
            createReadStream(path);
            let chunks = [];
            readableStream.on('data', (chunk) => {
                chunks.push(chunk.toString())
            });
            readableStream.on('end', () => {
                resolve(chunks.join(''));
            });
            readableStream.on('error', () => {
                resolve(null);
            });
        })
    }
    catch
    {
        return null;
    }
}

export { readFile }