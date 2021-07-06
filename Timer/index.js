function startTimer(){
    setTimeout(countDown,1000)
}

function countDown(){
    if(document.getElementById("input").value > 0) {
        document.getElementById("input").value-=1
        setTimeout(countDown,1000)
    } else {
        resetTimer()
    }
}

function resetTimer(){
    document.getElementById("input").value = "";
}