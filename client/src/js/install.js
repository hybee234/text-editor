const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
event.preventDefault();
beforeInstallPrompt = event;

});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    beforeInstallPrompt.prompt();
    const userResponse = await beforeInstallPrompt.userChoice;    
        if (userResponse.outcome === 'accepted') {
            console.log('Install - Accepted');
            butInstall.style.display = 'none';
        } else {
            console.log('Install - Rejected');
        }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('appinstalled', event); // installed
});





