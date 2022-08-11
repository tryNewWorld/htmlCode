//window：当前窗口
//当加载时执行
window.onload = function() {
    //绑定事件
    var tblFruit = document.getElementById("tbl_fruit_list");
    var rows = tblFruit.rows;
    for(var i=1; i< rows.length-1; i++) {
        var tr = rows[i];
        tr.onmouseover = mouseoverBG;
        tr.onmouseout = mouseoutBG;
        var cells = tr.cells;
        var priceTD = cells[1];
        priceTD.onmouseover=showHand;
        priceTD.ondblclick=editPrice;
        var del = cells[4].firstChild;
        del.onmouseover=showHand;
        del.onclick = delFruit;
    }
}




function mouseoverBG() {
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
    if(event && event.srcElement && (event.srcElement.tagName == "TD" || event.srcElement.tagName == "IMG")) {
        var td = event.srcElement;
        td.style.cursor = "hand"
    }
}

function editPrice() {
    if(event && event.srcElement && event.srcElement.tagName == "TD") {
        var priceTD = event.srcElement;
        if(priceTD.firstChild && priceTD.firstChild.nodeType == 3) {
            //innerHTML用于设置内部的HTML,或者获取当前文本
            var oldValue = priceTD.innerText;
            priceTD.innerHTML = "<input type = 'text' size='4'>";
            var input = priceTD.firstChild;
            if(input.tagName == "INPUT") {
                input.value = oldValue;

                //选中内部文本
                input.select();
                input.onblur = updatePrice;
                input.onkeydown=ckInput;
            }
        }
        
    }
}

//失去焦点
function updatePrice() {
    if(event && event.srcElement && event.srcElement.tagName == "INPUT") {
        var input = event.srcElement;
        var newPrice = input.value;
        var priceTD = input.parentElement;
        priceTD.innerHTML = newPrice;
        //更新当前行小计
        updateXJ(priceTD.parentElement);
    }
}

//根据tr计算当前行
function updateXJ(tr) {
    if(tr && tr.tagName == "TR") {
        var tds = tr.cells;
        var priceTD = tds[1].innerText;
        var countTD = tds[2].innerText;

        var xj = parseInt(priceTD) * parseInt(countTD);
        tds[3].innerText = xj;

        //更新总计
        updateZJ();
    }
}

function updateZJ() {
    var tblFruit = document.getElementById("tbl_fruit_list");
    var rows = tblFruit.rows;
    var sum = 0;
    for(var i=1; i<rows.length-1; i++) {
        var tr = rows[i];
        var xj = parseInt(tr.cells[3].innerText);
        sum += xj;
    }
    rows[rows.length-1].cells[1].innerText = sum
}

function delFruit() {
    if(event && event.srcElement && event.srcElement.tagName == "IMG") {
        if(window.confirm("是否确认删除当前记录")) {
            var tblFruit = document.getElementById("tbl_fruit_list");
            var img = event.srcElement;
            var td = img.parentElement;
            var tr = td.parentElement;
            tblFruit.deleteRow(tr.rowIndex);

            updateZJ();
        }
    }
}

//检验键盘输入的值
function ckInput() {
    var kc = event.keyCode;
    // console.log(kc);
    if(!((kc >= 48 && kc <= 57) || kc == 8 || kc == 13)) {
        event.returnValue = false;
    }
    if(kc == 13) {
        event.srcElement.onblur();
    }
}