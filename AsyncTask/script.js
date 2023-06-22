async function logJSONData() {
    const response = await fetch("https://reqres.in/api/users?page=1");
    const jsonData = await response.json();

    let DataArr = jsonData.data
    console.log(DataArr);

    DataArr.forEach((element, i) => {
        console.log(element.id);
        let addElm = document.getElementById('showUser');
        let tr = document.createElement('tr');
        tr.className = 'row';
        tr.innerHTML =
            '<td>' + [i + 1] +
            '</td><td>' +
            DataArr[i].first_name +
            '</td><td>' +
            DataArr[i].last_name
            +
            '</td>'


            + '<td>' +
            `<img src= https://reqres.in/img/faces/${i + 1}-image.jpg />`
            +
            '</td>' +


            '<td>' +
            DataArr[i].email +
            '</td>'
        addElm.appendChild(tr);
    });

}


