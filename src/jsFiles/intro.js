import '../styles/intro.css'; 
import mainPageLoad from './first.js';

export default function initializeIntroPage() {
    document.addEventListener('DOMContentLoaded', () => {
        const introText = document.createElement('div');
        introText.classList.add('intro-text');

        // Introductory text
        introText.innerHTML = `
            <h2>DEDICATED TO YOU</h2>
            <h2>MOM SUSAN</h2>
            <h2>AND MY LOVELY WIFEY STACEY</h2>
            <div class="decoration">Let's embark on a journey together...</div>
        `;

        document.body.appendChild(introText);

        // Redirect after 6 seconds
        setTimeout(() => {
            mainPageLoad();
        }, 8000);
    });}
