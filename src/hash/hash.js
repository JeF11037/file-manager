import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const calculateHash = async (path) => {
    try
    {
        const file = await readFile(path, { encoding: 'utf-8' })
        return createHash('sha256').update(file).digest('hex');
    }
    catch
    {
        return null;
    }
}

export { calculateHash }