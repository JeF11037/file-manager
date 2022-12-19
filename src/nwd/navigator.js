import { join } from 'node:path';
import { readdir, access, constants, stat } from 'node:fs/promises';

class Navigator 
{
    constructor(path)
    {
        this._dir = path;
    }

    set dir(path)
    {
        this._dir = path;
    }

    get dir()
    {
        return this._dir;
    }

    up()
    {
        try
        {
            this._dir = join(this._dir, '../');
            return true;
        }
        catch
        {
            return false;
        }
    }

    async cd(path)
    {
        if (path === '..')
        {
            this.up();
            return true;
        }
        else
        {
            try 
            {
                await access(`${ this._dir }/${ path }`, constants.R_OK)
                const path_temp = join(this._dir, path);
                if ((await stat(path_temp)).isDirectory())
                    this._dir = path_temp;
                else
                    return false;
                return true;
            } 
            catch 
            {
                return false;
            }
        }
    }

    async ls()
    {
        try
        {
            const dirents = await readdir(this._dir, { withFileTypes: true });
            let directories = [];
            let files = [];
            for (let dirent of dirents)
            {
                if (dirent.isDirectory())
                {
                    directories.push({
                        Name: dirent.name,
                        Type: 'directory'
                    });
                }
                else
                {
                    files.push({
                        Name: dirent.name,
                        Type: 'file'
                    });
                }
            }
            const sortObjectsbyName = (array) => {
                return array.sort((a, b) => {
                    if(a.Name < b.Name) { return -1; }
                    if(a.Name > b.Name) { return 1; }
                    return 0;
                })
            }
            console.table(sortObjectsbyName(directories).concat(sortObjectsbyName(files)));
            return true;
        }
        catch
        {
            return false;
        }
    }
}

export { Navigator };