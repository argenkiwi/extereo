This is the source code for [Extereo Audio Player](https://chrome.google.com/webstore/detail/extereo-audio-player/aokleaidncgnfejhkddhfobfffalfilm), the chrome extension that scans for HTML5 supported audio in the websites you visit and lets you create playlists with it.

## Prerequisites
- Node and npm

## Installation
- Clone the repository in a folder of your preference: `git clone git@github.com:soflete/extereo.git`.
- Go to the project folder: `cd extereo`.
- Install the dependencies with `npm install`.
- Build project with `npm build` or run watch mode with `npm run watch`.

### Google Chrome
- Open `chrome://extensions/`.
- Tick the Developer Mode checkbox if unticked.
- Click on `Load unpacked extension...`.
- Select the `dist` folder.

### Firefox
- Open `about:debugging`.
- Click `Load Temporary Add-on`.
- Select any file in your extension's directory.
