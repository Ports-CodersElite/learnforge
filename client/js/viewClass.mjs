import * as db from './db_query.mjs'
import {lecturerID} from './class_creator.mjs' 

console.log(lecturerID);
const className = document.querySelector('.main-text');
const lecturerID = document.querySelector('.p-2');
const joinCode = document.querySelector('.p-1');
let value;
db.getClass(24, (res)=>{ 
    value = String(res);
});


let testing = 0;
db.getClass(24, (res)=>{
    className.textContent = res[0]['class_name']
    lecturerID.textContent = res[0]['lecturer_id']
    joinCode.textContent = res[0]['join_code']
    })
    
