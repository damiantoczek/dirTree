const {readdirSync} = require('fs');
const {extname} = require('path');


class DirTree{
    constructor(config){
        this.ROOT = config.root;
        this.folders = {};
        this.list = [];

        const addToFolder = (foldername, filename) => {
            if(!this.folders[foldername]){
                this.folders[foldername] = [filename];
            }else{
                this.folders[foldername].push(filename);
            }
        };

        const readDir = (root, files) => {
            for(const filename of files){
                const newPath = root + filename;

                if(extname(filename) === ""){
                    // Is directory/folder
                    const newFiles = readdirSync(root + filename);
                    readDir(newPath + "/", newFiles);
                }else{
                    // Is file
                    addToFolder(root, filename);
                    this.list.push(newPath);
                }
            }
        };

        readDir(this.ROOT, readdirSync(this.ROOT));
    }
}

module.exports = DirTree;
