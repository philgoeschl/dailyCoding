let root = document.documentElement;

function StartBlinking() {
    root.style.setProperty('--blinking-state', 'running');
}

function StopBlinking() { 
    root.style.setProperty('--blinking-state', 'paused');
}

function updateIntervalTime() {
    root.style.setProperty('--blinking-interval', document.getElementById('interval-time').value);
}


