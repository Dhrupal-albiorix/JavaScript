let DataForm = document.querySelector('#DataForm')

let fName = document.querySelector('#fName');
let lName = document.querySelector('#lName');
let phone = document.querySelector("#phone");
let email = document.querySelector('#email');
let psw = document.querySelector('#psw');
let pswBox = document.querySelector('.pswBox');
let terms = document.querySelector('.terms');
let subBtn = document.querySelector('#subBtn');
let updt = document.querySelector('#updtbox');
let clearAll = document.querySelector('#clearAll');
let DataTable = document.querySelector('.DataTable');
let myTable = document.getElementById('myTable');
let tr = myTable.getElementsByTagName('tr');

const isPasswordSecure = (password) => {
    const re = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
    );
    return re.test(password);
};

//store data in local 
DataForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let psw2
    if (isPasswordSecure(psw.value)) {
        psw2 = psw.value
    } else {
        alert("not a velid psw");
        psw.value = ""
        return false;
    }

    let dataObject = {
        fName: fName.value,
        lName: lName.value,
        phone: phone.value,
        email: email.value,
        psw: psw2,
    }

    let user_records = [];
    user_records = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];
    let duplicate = user_records.find((item, i) => {
        return (user_records[i].dataObject.phone == phone.value)
    })

    if (duplicate) {
        alert("duplicate phone");
        phone.value = ""
        return false
    } else {
        console.log("ok")
    }

    user_records.push({
        dataObject //push userdata containing object in array
    });
    localStorage.setItem("users", JSON.stringify(user_records));

    alert("succussful")
    location.reload();
})

function PrintUserData() {
    let Printuser_records = [];
    Printuser_records = JSON.parse(localStorage.getItem('users')) ?
        JSON.parse(localStorage.getItem('users')) : [];

    Printuser_records.forEach((item, i) => {
        let addElm = document.getElementById('showUser');
        let tr = document.createElement('tr');
        tr.className = 'row';
        tr.innerHTML =
            '<td>' + [i + 1] +
            '</td><td>' +
            Printuser_records[i].dataObject.fName +
            '</td><td>' +
            Printuser_records[i].dataObject.lName +
            '</td><td>' +
            Printuser_records[i].dataObject.phone +
            '</td><td>' +
            Printuser_records[i].dataObject.email +
            '</td><td>' +
            '<a href = "#" class="anchor" onclick="deleted(' + i + ')"; >' + 'delete' +
            '</td><td>' +
            '<a href = "#" class="anchor" onclick="edit(' + i + ')"; >' + 'edit'; +
                '</td>'
        addElm.appendChild(tr);
    });
}
PrintUserData();

function edit(i) {
    let Printuser_records = [];

    Printuser_records = JSON.parse(localStorage.getItem('users')) ?
        JSON.parse(localStorage.getItem('users')) : [];
    fName.value = Printuser_records[i].dataObject.fName;
    lName.value = Printuser_records[i].dataObject.lName;
    phone.value = Printuser_records[i].dataObject.phone;
    email.value = Printuser_records[i].dataObject.email;

    DataTable.style.display = "none";
    subBtn.style.display = "none";
    pswBox.style.display = "none";
    terms.style.display = "none";
    clearAll.style.display = "none"
    updt.style.display = "block";
    DataForm.classList.remove("myForm");
    DataForm.classList.add("NewmyForm");

    updt.addEventListener("click", function (e) {
        e.preventDefault();
        let duplicate = Printuser_records.find((item, i) => {
            return (Printuser_records[i].dataObject.phone == phone.value)
        })

        if ((duplicate)) {
            if (Printuser_records.indexOf(duplicate) !== i) {
                phone.value = ""
                alert("duplicate phone");
                return false
            } else {
                console.log("ok")
            }

        } else {
            console.log("ok")
        }

        if ((fName.value.trim() == "") || (lName.value.trim() == "") || (phone.value.trim() == "") || (email.value.trim() == "")) {
            alert("fill all data")
            return false
        }
        Printuser_records[i].dataObject.fName = fName.value;
        Printuser_records[i].dataObject.lName = lName.value;
        Printuser_records[i].dataObject.phone = phone.value;
        Printuser_records[i].dataObject.email = email.value

        localStorage.setItem("users", JSON.stringify(Printuser_records));
        location.reload();
    })

}

clearAll.addEventListener('click', function clearAllData() {
    localStorage.clear();
    location.reload();
})


function deleted(i) {
    Printuser_records = JSON.parse(localStorage.getItem('users'))
    Printuser_records.splice(i, 1);
    localStorage.setItem('users', JSON.stringify(Printuser_records));
    location.reload();
}

function searchFun() {
    let filter = document.getElementById("searchtextbox").value.toUpperCase();
    console.log(filter)
    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[1];
        if (td) {
            let textvalue = td.innerHTML;
            if (textvalue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}

