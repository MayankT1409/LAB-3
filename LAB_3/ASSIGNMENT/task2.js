const fs = require('fs');
const path = require('path');
const archiver = require('archiver');


function copyFileSync(source, target) {
    const targetDir = path.dirname(target);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.copyFileSync(source, target);
}


function backupFiles(sourceFolder, backupFolder) {
    const logFilePath = path.join(backupFolder, 'backup-log.txt');
    const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

    function log(message) {
        const timestamp = new Date().toISOString();
        logStream.write(`[${timestamp}] ${message}\n`);
    }

    try {
        if (!fs.existsSync(sourceFolder)) {
            throw new Error(`Source folder does not exist: ${sourceFolder}`);
        }

        if (!fs.existsSync(backupFolder)) {
            fs.mkdirSync(backupFolder, { recursive: true });
        }

        const files = fs.readdirSync(sourceFolder, { recursive: true });

        files.forEach(file => {
            const sourceFilePath = path.join(sourceFolder, file);
            const backupFilePath = path.join(backupFolder, file);

            if (fs.lstatSync(sourceFilePath).isDirectory()) {
                return;
            }

            copyFileSync(sourceFilePath, backupFilePath);
            const stats = fs.statSync(sourceFilePath);
            log(`Copied: ${file} (Size: ${stats.size} bytes)`);
        });

        log('Backup completed successfully.');
    } catch (error) {
        log(`Error: ${error.message}`);
        console.error('Backup failed:', error.message);
    } finally {
        logStream.end();
    }
}


function compressBackup(backupFolder, zipFilePath) {
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {
        zlib: { level: 9 } // Compression level
    });

    output.on('close', () => {
        console.log(`Backup compressed to ${zipFilePath} (${archive.pointer()} total bytes)`);
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);
    archive.directory(backupFolder, false);
    archive.finalize();
}

function main() {
    const sourceFolder = path.join('D:\\FSWD\\LAB_3\\ASSIGNMENT', 'source'); 
    const backupFolder = path.join('D:\\FSWD\\LAB_3\\ASSIGNMENT', 'backup'); 

    backupFiles(sourceFolder, backupFolder);
}

main();