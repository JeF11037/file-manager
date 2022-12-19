import { argv } from 'node:process';

const parseUser = () => {
    return argv.slice(2)[0].replace('--username=', '');
}

export { parseUser }