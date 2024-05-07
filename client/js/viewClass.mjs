import * as db from './db_query.mjs';

// const className = document.querySelector('.main-text');
// const lecturerID = document.querySelector('.p-2');
// const joinCode = document.querySelector('.p-1');

db.getClass(sessionStorage.getItem('uid'), (res)=>{
    let containerList = document.querySelector("#classContainer");
    for(let i = 0; i < res.length; i++) {
        console.log(res[i]);
        // create a class info box here with res[i].join_code and res[i].class_name
        let container = document.createElement('div');
        container.setAttribute("class", "list-item flex-column");
        let row = document.createElement('div');

        let classNameLabel = document.createElement('span');
        classNameLabel.innerHTML = "Class Name: "
        let className = document.createElement('span');
        className.setAttribute("class", "main-text className");
        className.innerHTML = res[i].class_name;

        let joinCodeLabel = document.createElement('span');
        joinCodeLabel.innerHTML = "Join Code: "
        let joinCode = document.createElement('span');
        joinCode.setAttribute("class", "p-1 sub-text joinCode")
        joinCode.innerHTML = res[i].join_code;
        row.append(classNameLabel);
        row.append(className);
        row.append(document.createElement('br'));
        row.append(joinCodeLabel);
        row.append(joinCode);
        container.append(row);
        containerList.append(container);

    }
    // className.textContent = `Class name: ${res[0]['class_name']}`;
    // lecturerID.textContent = `LecturerID: ${res[0]['lecturer_id']}`;
    // joinCode.textContent = `Join Code: ${res[0]['join_code']}`;
    })
    
