import * as db from './db_query.mjs';

const className = document.querySelector('.main-text');
const lecturerID = document.querySelector('.p-2');
const joinCode = document.querySelector('.p-1');

db.getClass('rich23', (res)=>{
    className.textContent = `Class name: ${res[0]['class_name']}`;
    lecturerID.textContent = `LecturerID: ${res[0]['lecturer_id']}`
    joinCode.textContent = `Join Code: ${res[0]['join_code']}`;
    })
    
