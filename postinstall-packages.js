const package = './package.json';
const path = require('path');
const nodeModulesFolder = './node_modules/';
const fs = require('fs-extra');
const intersection = require('lodash').intersection;
const each = require('lodash').each;

const handlePackages = () => {
    var _packageFile,
        _duplicates,
        _rootFolder;

    const getPackageFile = () => {
        const p = fs.readFileSync(package, 'utf8');
        _packageFile = JSON.parse(p);
        return _packageFile;
    };

    const getDuplicatedPackages = () => {
        if (!_packageFile) getPackageFile();

        const dependencies = Object.keys(_packageFile.dependencies);
        const peerDependencies = Object.keys(_packageFile.peerDependencies);

        _duplicates = intersection(dependencies, peerDependencies);
        return _duplicates;
    };

    const isInsideNodeModules = () => {
        _rootFolder = path.join(__dirname, '../..');
        return path.basename(_rootFolder) !== 'node_modules' ? false : true;
    };

    const _moveFolder = (packageName) => {
        const srcpath = nodeModulesFolder + packageName;

        if (fs.existsSync(srcpath)) {
            const distpath = path.normalize(path.join(_rootFolder + '/' + packageName));

            fs.move(srcpath, distpath, { overwrite: true }, (err) => {
                if (err) return console.error(err);
                console.log('Movido com sucesso ' + srcpath + ' para ' + distpath + '.');
            });
        }
    };

    const _moveDuplicatesToRootFolder = () => {
        each(_duplicates, (packageName) => {
            _moveFolder(packageName);
        });
    };

    const init = () => {
        if (isInsideNodeModules()) {
            getPackageFile();
            getDuplicatedPackages();
            _moveDuplicatesToRootFolder();
        } else {
            console.log('Aplicação base está no root do projeto.\n');
        }
    };

    return {
        init: init,
        getPackageFile: getPackageFile,
        getDuplicatedPackages: getDuplicatedPackages
    }
}

handlePackages().init();
