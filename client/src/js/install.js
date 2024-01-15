const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

//A
console.log('👍', 'beforeinstallprompt', event); //thumbs up let's go
event.preventDefault();
beforeInstallPrompt = event;
butInstall.style.display = 'block';

// if (!beforeInstallPrompt) {
//     butInstall.style.display = 'none';
//     return;
// }

///A


});



// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {

//B
    if (!beforeInstallPrompt) {
        return;
    }
    beforeInstallPrompt.prompt();
    const userResponse = await beforeInstallPrompt.userChoice;    
    if (userResponse.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        butInstall.style.display = 'none';
    } else {
        console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
///B

});



// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {

    ///C
    console.log('👍', 'appinstalled', event); //success
///C

});





