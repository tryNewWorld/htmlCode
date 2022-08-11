function mouseoverBG() {debugger;
    if(event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        var tr = td.parentElement;
        var tds = tr.cells;
        tr.style.backgroundColor = "grey";
        for(var i=0; i< tds.length; i++) {
            tds[i].style.color = "white";
        }
    }
}

function mouseoutBG() {
    if(event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        var tr = td.parentElement;
        var tds = tr.cells;
        tr.style.backgroundColor = "honeydew";
        for(var i=0; i< tds.length; i++) {
            tds[i].style.color = "gray";
        }
    }
}

function showHand() {
    if(event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        td.style.cursor = "hand"
    }
}