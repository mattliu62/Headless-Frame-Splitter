const fs = require('fs');
const path = require('path');

async function clearDirectory() {
    return new Promise((resolve) => {
        //paths for frames and video
        const frameDirectory = './frames';
        const video = './video.mp4';

        //deletes video
        fs.unlink(video, (err) => {
            if (err) {
            console.error(err)
            return
            }
        })

        //deletes all frames
        fs.readdir(frameDirectory, (err, files) => {
            if (err) throw err;

                for (const file of files) {
                    fs.unlink(path.join(frameDirectory, file), err => {
                    if (err) throw err;
                    });
                }
        });
        console.log('Successfully cleaned directory.');
        resolve();
    })
}

module.exports = { clearDirectory }