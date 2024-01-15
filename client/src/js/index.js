import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
import screenshot from './../images/screenshot.png'

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerHTML = `
    <div class="loading-container">
    <div class="loading-spinner" />
    </div>
    `;
    main.appendChild(spinner);
};

const editor = new Editor();
if (typeof editor === 'undefined') {
    loadSpinner();
}


  // Add the image to our existing div.
    // const myScreenshot = new Image();
    // myScreenshot.src = screenshot;
    // element.appendChild(myScreenshot);


// Check if service workers are supported
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
} else {
    console.error('Service workers are not supported in this browser.');
}

