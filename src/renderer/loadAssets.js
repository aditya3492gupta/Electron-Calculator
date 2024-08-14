// const path = require('path');

// Assuming these IDs are used for your image elements in the HTML
// IIFE
// (() => {
//     console.log(__dirname);
//     document.getElementById('logo').src = path.join(__dirname, '../assets/wi-jungle-logo.png');
//     document.getElementById('user-avatar').src = path.join(__dirname, '../assets/user-avatar.png');
// })()
// const logoPath = path.join(__dirname, '..', '..', 'assets', 'wi.png');

// // Set the image source in the HTML
// document.getElementById('logo').src = logoPath;
// document.addEventListener('DOMContentLoaded', () => {
//     const path = require('path');
//     const fs = require('fs');

//     // Path to the package.json file
//     const packageJsonPath = path.join(__dirname, '..', 'package.json');

//     // Read and parse the package.json file
//     const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

//     // Get the absolute path to assets from package.json
//     const assetsPath = packageJson.customPaths.assetsPath;

//     // Construct the absolute path to the logo image
//     const logoPath = path.join(assetsPath, 'wi-jungle-logo.png');

//     // Set the image source in the HTML
//     document.getElementById('logo').src = logoPath;
// });


// absolute path for images

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const imagePath = await window.electron.getImagePath();
        console.log('imagepath is', imagePath);
        const imageElement = document.getElementById('wi');
        imageElement.src = `${imagePath}wi.svg`;
        const image = document.getElementById('user');
        image.src = `${imagePath}user.png`;
        const cal = document.getElementById('calc');
        cal.src = `${imagePath}calc.png`;
        const boyimg = document.getElementById('boyimg');
        boyimg.src = `${imagePath}boyim.png`;

    } catch (error) {
        console.error('Error loading image path:', error);
    }
});