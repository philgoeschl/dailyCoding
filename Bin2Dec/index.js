function bin2Dec() {
    var bin = document.getElementById("binInput").value
    var decimal = 0;
    for (var index = bin.length - 1; index >= 0; index--) {
        decimal += parseInt(bin[index] * Math.pow(2, bin.length - 1 - index)
        )
    }
    document.getElementById("decOutput").value = decimal;
}

