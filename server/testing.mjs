import {open} from 'sqlite';
import sqlite3 from 'sqlite3'; 

async function init(){
    const db = await open({
        filename: './learnforge.db',
        driver: sqlite3.Database,
        verbose: true
    });
    await db.migrate({ migrationsPath: './learnSQLite.sql'});
    return db;
}