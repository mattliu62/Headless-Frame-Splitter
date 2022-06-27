## YouTube Frame Splitter (Previously Headless Frame Splitter
**A small, headless program that will split a provided YouTube video into frames. Powered by Node.js, Javascript, and ytdl-core.**

## Installation for Ubuntu-Based Systems
**Node.js v18.x:**

    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs

**FFMPEG**
```
sudo apt update
sudo apt install ffmpeg
```
Use ```npm i``` to install the rest of the dependancies.

## Usage
Upon running the program, the user is allowed to input a YouTube video link, as well as specified resolution and FPS. A new folder called 'frames' will be created, and will be where all the generated frames are placed into.
