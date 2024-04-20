const sqlite3 = require('sqlite3').verbose();

// Connect to database 
const db = new sqlite3.Database("./server/test.db",sqlite3.OPEN_READWRITE,(err)=>{
    if (err) return console.error(err.message);
    console.log("connection sucessful");
})

//Create tables 
db.run(
    "CREATE TABLE user_details(user_id, role, user_fname, user_lname, user_emailaddress)"
)


db.close((err)=>{
    if(err) return console.error(err.message);
})