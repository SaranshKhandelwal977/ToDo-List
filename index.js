function getAndUpdate(){
    tit = document.querySelector("#title").value;
    desc = document.querySelector("#description").value;
    if(localStorage.getItem("itemsJson")==null){
        itemJsonarray = [];
        itemJsonarray.push([tit, desc]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonarray));
    }
    else{
        itemJsonarraystr = localStorage.getItem("itemsJson");
        itemJsonarray = JSON.parse(itemJsonarraystr);
        itemJsonarray.push([tit, desc]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonarray));
    }
    update();
}

function update(){
    if(localStorage.getItem("itemsJson")==null){
        itemJsonarray = [];
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonarray));
    }
    else{
        itemJsonarraystr = localStorage.getItem("itemsJson");
        itemJsonarray = JSON.parse(itemJsonarraystr);
        
    }

    let tableBody = document.querySelector("#tablebody");
    let str = "";
    itemJsonarray.forEach((element, index) => {
        str += `
        <tr>
            <th scope="row">${index+1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-primary" onclick = deleted(${index})>Delete</button></td>
        </tr>
        `
    });
    tableBody.innerHTML = str;
}

function deleted(itemIndex){                                 // particular item ko delete krna
    itemJsonarraystr = localStorage.getItem("itemsJson");
    itemJsonarray = JSON.parse(itemJsonarraystr);
    itemJsonarray.splice(itemIndex, 1);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonarray));
    update();
}

function clearstorage(){       //clear the whole list by asking
    if (confirm("do you really want to clear the list")){
        localStorage.clear();
        update();
    }
    
}

document.querySelector("#add").addEventListener("click", getAndUpdate);
update();            //isko lagane se list updated milegi
