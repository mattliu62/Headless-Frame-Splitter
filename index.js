const fs = require('fs');
const ytdl = require('ytdl-core');
const extractFrames = require('ffmpeg-extract-frames');
const clearDirectory = require('./clearDirectory');
const prompt = require("prompt-sync")({ sigint: true });

async function run() {
    console.log('Headless Frame Splitter ver. 1.0')
    const link = prompt("Enter valid YouTube Link: ");
    
    //create frames folder
    const folderName = './frames';

    try {
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }
    } catch (err) {
    console.error(err);
    }

    await clearDirectory.clearDirectory();
    
    //function to run ytdl download
    async function download(link) {
        //collect video metadata
        const requestInfo = await ytdl.getInfo(link);
        const name = requestInfo.videoDetails.title;
        
        console.log(`Now processing ${name}!`);
    
        ytdl(link, {quality: '136', filter: 'videoonly'}).pipe(fs.createWriteStream(`video.mp4`)).on('finish', function() {
            console.log('Successfully downloaded video.');
    
            //call process function
            process();
        });
    };
    
    //function to run FFMPEG on frame 
    async function process() {
    
        //use FFMPEG to extract frames at intervals of 3 seconds - promise returned when completed
        await extractFrames({
        input: 'video.mp4',
        output: `./frames/frame-%d.png`,
        fps: 1,
        });
    
        console.log('Successfully generated frames.')
        console.log('Mission Complete!')
        setTimeout(function() {
            console.log('Exiting...');
        }, 3000);
    };
    
    //checks to see if video URL is valid - if not, the program exits
    if (!ytdl.validateURL(link)) {
        console.log('Invalid URL.');
        setTimeout(function() {
            console.log('Exiting...');
        }, 3000);
        // process.exit(1);
    
    } else {
        download(link);
    }
    
}
run();
