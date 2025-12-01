# MediaReview

> Si hablas español, por favor lee la [versión en español](https://github.com/Exatoon27/mediareview/blob/master/README.md).

A simple tool to quickly review and classify multimedia files (images and videos). It allows you to save reviewed files into a ZIP archive and extract frames from videos.

## Features

- Quick preview of images and videos.
- Classification of files as "save" or "discard".
- Extraction of frames from videos.
- Download of classified files in a ZIP archive.

## Usage

### Local

1. Clone this repository or download the files.
2. Open `index.html` in your web browser.
3. Drag and drop your multimedia files into the interface.
4. Use the buttons to classify the files:
   - **Save**: Mark the file to save.
   - **Discard**: Mark the file to discard.
   - **Extract Frame**: Extract a frame from the current video (only for videos).
5. Once you have reviewed all the files, click on "Download Classified" to obtain a ZIP file with the saved files.

### Online

You can also use the online version of the tool at: [MediaReview Online](https://exatoon27.github.io/MediaReview/)

## Requirements

- A modern web browser (Chrome, Firefox, Safari, Edge).
- Support for HTML5 and JavaScript.

## License

This project is licensed under the GNU General Public v3 License. See the LICENSE file for more details.

## Credits and Third-Party Licenses

This project uses third-party software:

- **FFmpeg and FFmpeg.wasm** — [https://ffmpeg.org](https://ffmpeg.org) / [https://github.com/ffmpegwasm](https://github.com/ffmpegwasm)
  Software under GPL depending on the build.

- **JSZip** — [https://github.com/Stuk/jszip](https://github.com/Stuk/jszip)
  Dual license MIT or GPLv3.
