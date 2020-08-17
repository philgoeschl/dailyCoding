function updateRadius(corner){
    document.documentElement.style.setProperty('--'+corner, document.getElementById(corner).value+'%');

    var shapeRadiusCss = window.getComputedStyle(document.getElementById('shape')).getPropertyValue('border-radius');

    document.getElementById('shape-radius-css').value = `border-radius: ${shapeRadiusCss};`
}

function copyToClipboard(){
    var copyText = document.getElementById('shape-radius-css')

    copyText.select();
    copyText.setSelectionRange(0,99999); // Needed for mobile
    document.execCommand("copy");
    alert(`Copied the CSS properties: ${copyText.value}`);
}