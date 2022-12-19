import { parseUser } from './src/cli/args.js';
import { error_input, error_operation, getGreetMessage, getFarewellMessage, getCurrentDirectoryMessage, displayMessage, displayMessages } from './src/message.js'
import { homedir, EOL, cpus, userInfo, arch } from 'node:os';
import { Navigator } from './src/nwd/navigator.js';
import { createFile } from './src/fs/create.js';
import { readFile } from './src/fs/read.js';
import { renameFile } from './src/fs/rename.js';
import { copyFile, moveFile } from './src/fs/copy.js';
import { removeFile } from './src/fs/delete.js';
import { compressFile, decompressFile } from './src/compress/compress.js';
import { calculateHash } from './src/hash/hash.js';

const username = parseUser();
const greetings = getGreetMessage(username);
const farewell = getFarewellMessage(username);
var navigator = new Navigator(homedir());

const exit = () => {
    process.stdout.write(farewell);
    process.exit(0);
}
process.stdin.setEncoding('utf-8');

process.on('SIGINT', async () => {
    exit();
});

await displayMessage(greetings);
await displayMessage(getCurrentDirectoryMessage(navigator._dir));

const dataManager = async (data) => {
    let messages = [];
    const line = data.split(EOL)[0];
    const separated_line = line.split(' ').filter(value => value !== '');
    const command = separated_line[0] == 'os' ? [separated_line[0], separated_line[1]].join(' ') : separated_line[0];
    const tail = (separated_line.length > 1) ? separated_line.slice(1).join(' ') : null;
    const path_first = (separated_line.length == 3) ? separated_line.slice(1)[0] : null;
    const path_second = (separated_line.length == 3) ? separated_line.slice(1)[1] : null;
    switch (command)
    {
        case 'up':
            if (tail == null)
                navigator.up();
            else
                messages.push(error_operation);
            break;
        case 'cd':
            if (!await navigator.cd(tail))
                messages.push(error_operation);
            break;    
        case 'ls':
            if (tail == null)
                await navigator.ls();
            else
                messages.push(error_operation);
            break;
        case 'cat':
            const readable_file_content = await readFile(`${ navigator._dir }/${ tail }`);
            if (readable_file_content != null)
                messages.push(readable_file_content);
            else
                messages.push(error_operation);
            break;   
        case 'add':
            if (!await createFile(`${ navigator._dir }/${ tail }`))
                messages.push(error_operation);
            break;
        case 'rn':
            if (!await renameFile(`${ navigator._dir }/${ path_first }`, `${ navigator._dir }/${ path_second }`))
                messages.push(error_operation);
            break;
        case 'cp':
            if (!await copyFile(`${ navigator._dir }/${ path_first }`, `${ navigator._dir }/${ path_second }`))
                messages.push(error_operation);
            break;
        case 'mv':
            if (!await moveFile(`${ navigator._dir }/${ path_first }`, `${ navigator._dir }/${ path_second }`))
                messages.push(error_operation);
            break;
        case 'rm':
            if (!await removeFile(`${ navigator._dir }/${ tail }`))
                messages.push(error_operation);
            break;
        case 'os --EOL':
            messages.push(`\n${ JSON.stringify(EOL) }\n`);
            break;
        case 'os --cpus':
            console.log(cpus());
            break;
        case 'os --homedir':
            messages.push(`\n${ homedir() }\n`);
            break;
        case 'os --username':
            messages.push(`\n${ userInfo().username }\n`);
            break;
        case 'os --architecture':
            messages.push(`\n${ arch() }\n`);
            break;
        case 'hash':
            const hash_content = await calculateHash(`${ navigator._dir }/${ tail }`);
            if (hash_content != null)
                messages.push(`\n${ hash_content }\n`);
            else
                messages.push(error_operation);
            break;
        case 'compress':
            if (!await compressFile(`${ navigator._dir }/${ path_first }`, `${ navigator._dir }/${ path_second }`))
                messages.push(error_operation);
            break;
        case 'decompress':
            if (!await decompressFile(`${ navigator._dir }/${ path_first }`, `${ navigator._dir }/${ path_second }`))
                messages.push(error_operation);
            break;
        case '.exit':
            exit();
            break;
        default:
            messages.push(error_input);
    }
    messages.push(getCurrentDirectoryMessage(navigator._dir));
    displayMessages(messages);
}

process.stdin.on('data', (data) => {
    dataManager(data);
});