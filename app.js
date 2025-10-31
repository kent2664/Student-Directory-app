document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    //async function call
    save();

})

async function save() {
    let savedRecord = localStorage.getItem("studentsRecord");
    let savedRecordMap = localStorage.getItem("studentsRecordMap");
    let studentsRecord = savedRecord ? new Set(JSON.parse(savedRecord)) : new Set();
    let studentsRecordMap = savedRecordMap ? new Map(JSON.parse(savedRecordMap)) : new Map();
    let studentSum = 0;
    const average = document.createElement('h1');


    const returnMap = await editMap(studentsRecord, studentsRecordMap);

    //calcrate sum
    returnMap.forEach((val, key) => {
        studentSum += new Number(val);
        //console.log(`keyyyyyy${key}:valueeee${val}  summmmmmm${studentSum}`);
    });

    average.textContent = "Average is " + (studentSum / returnMap.size).toFixed(2);

    document.querySelector('body>h1') ? document.querySelector('body>h1').remove() : null;
    document.querySelector('main').before(average);

    //console.log(localStorage.getItem("studentsRecord"));

}

async function editMap(studentsRecord, studentsRecordMap) {

    let name = document.querySelector("#studentName").value;
    let grade = document.querySelector("#studentGrade").value;

    //if the set already has name, It won't add
    if (!studentsRecord.has(name)) {
        studentsRecord.add(name);
        studentsRecordMap.set(name, grade);
    } else {
        toast("This student is already added"); //error message
        return studentsRecordMap;
    }

    localStorage.setItem("studentsRecord", JSON.stringify([...studentsRecord]));
    localStorage.setItem("studentsRecordMap", JSON.stringify([...studentsRecordMap]));
    toast("Save Completed!!");

    await new Promise(resolve => setTimeout(resolve, 500));

    return studentsRecordMap;
}

async function readStudentApi() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    const data = await response.json();

    return data;
}


function displayStudents() {

    const tableBody = document.getElementById('api-data-body');
    const tableContainer = document.getElementById('data-displayId');
    readStudentApi().then(result => {

        for (const { name, email, website } of result) {
            //create table contents
            const newRow = document.createElement('tr');
            const nameCell = document.createElement('th');
            const detailRow = document.createElement('tr');
            const detailCell = document.createElement('td');
            detailCell.classList.add('hidden');
            nameCell.textContent = name;
            detailCell.textContent = "Email:" + email + "  website :" + website;

            newRow.appendChild(nameCell);
            newRow.addEventListener('click', (e) => {
                e.target.parentElement.nextElementSibling.children[0].classList.toggle('hidden');

            });
            detailRow.appendChild(detailCell);
            tableBody.appendChild(newRow);
            tableBody.appendChild(detailRow);
        }

        const count = document.createElement('h2');
        count.textContent = "Total Count:" + result.length;

        tableContainer.appendChild(count);
        console.log(result);
    });
}

function toast(message, duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return; // container check

    const t = document.createElement('div');
    t.classList.add('toast');
    t.textContent = message;
    container.appendChild(t);

    setTimeout(() => t.classList.add('show'), 10);

    setTimeout(() => {
        t.classList.remove('show');
        t.addEventListener('transitionend', () => container.removeChild(t), { once: true });
    }, duration);
}

localStorage.removeItem("studentsRecord");
localStorage.removeItem("studentsRecordMap");
displayStudents();