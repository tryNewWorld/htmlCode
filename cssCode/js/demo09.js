window.onload = function() {
    var tablFruit = document.getElementById("tbl_fruit_list");
    var rows = tablFruit.rows;
    for(var i = 1; i < rows.length-1; i++) {
        var tr = rows[i];
        //1. 鼠标选择事件
        tr.onmouseover = mouseoverBG;
        //2. 鼠标移出事件
        tr.onmouseout = mouseoutBG;
        //3. 单价、操作鼠标光标变换事件
        var cells = tr.cells;
        var priceTD = cells[1];
        var delIMG = cells[4].firstChild;
        priceTD.onmouseover = showHand;
        delIMG.onmouseover = showHand;

        //4. 更新单价，添加双击事件
        tr.ondblclick = editPrice;

        //6. 给删除图标添加点击事件
        delIMG.onclick = delFruit;

        //8. 给按钮添加背景变换事件
        var btns = document.getElementsByClassName("btn");
        for(var i=0; i< btns.length; i++) {
            //绑定事件
        }
    }
}

function mouseoverBG() {
    if(event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        var tr = td.parentElement;
        tr.style.backgroundColor = "grey";
        var tds = tr.cells;
        for(var i=0; i<tds.length; i++) {
            var td = tds[i];
            td.style.color = "white";
        }
    }
}

function mouseoutBG() {
    if(event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        var tr = td.parentElement;
        tr.style.backgroundColor = "honeydew";
        var tds = tr.cells;
        for(var i=0; i<tds.length; i++) {
            var td = tds[i];
            td.style.color = "grey";
        }
    }
}

function showHand() {
    if(event && event.srcElement && (event.srcElement.tagName == "TD" || event.srcElement.tagName == "IMG")) {
        var element = event.srcElement;
        element.style.cursor = "hand";
    }
}

function editPrice() {
    if(event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        if(td.firstChild && td.firstChild.nodeType == 3) {
            var oldValue = td.innerText;
            td.innerHTML = "<input type = 'text' size='4'/>";
            var input = td.firstChild;
            input.value = oldValue;
            input.select();
            //5. 绑定失去焦点事件
            input.onblur = updatePrice;

            //7. 限制输入字符
            input.onkeydown = ckInput;
        }
    }
}

function updatePrice() {
    if(event && event.srcElement && event.srcElement.tagName == "INPUT") {
        var input = event.srcElement;
        var td = input.parentElement;
        var value = input.value;
        td.innerHTML = value;

        //5.1 更新小计
        updateXJ(td.parentElement);
    }
}

function updateXJ(tr) {
    if(tr && tr.tagName == 'TR') {
        var cells = tr.cells;
        var price = parseInt(cells[1].innerText);
        var num = parseInt(cells[2].innerText);
        cells[3].innerText = price * num;

        //5.2更新总计
        updateZJ();
    }
}

function updateZJ() {
    var tablFruit = document.getElementById("tbl_fruit_list");
    var rows = tablFruit.rows;
    var sum = 0;
    for(var i=1; i<rows.length-1; i++) {
        var tr = rows[i];
        sum += parseInt(tr.cells[3].innerText);
    } 

    rows[rows.length-1].cells[1].innerText = sum;
}

function delFruit() {
    if(event && event.srcElement && event.srcElement.tagName == "IMG") {
        var tablFruit = document.getElementById("tbl_fruit_list");
        var img = event.srcElement;
        var td = img.parentElement;
        var tr = td.parentElement;
        var index = tr.rowIndex;
        tablFruit.deleteRow(index);

        //删除之后更新总计
        updateZJ();
    }
}

function ckInput() {
    var code = event.keyCode;debugger;
    if(!((code >= 48 && code <= 57) || code == 13 || code == 8)) {
        event.returnValue = false;
    }
    if(code == 13) {
        event.srcElement.onblur();
    }
}