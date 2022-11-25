import mysql, { OkPacket, RowDataPacket } from 'mysql2';
import item from '../interfaces/Item';
import { insert } from '../interfaces/Insert';
import { options } from '../config/config';

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(5000);

console.log(`${options.host}\n${options.root}\n${options.password}\n${options.database}`)

const database = mysql.createConnection({
    host: options.host,
    user: options.root,
    password: options.password,
    database: options.database
});

const update = (table: string, inventory: insert) => {
    database.query(`drop table if exists ${table}`);
    database.query(`create table ${table}(
        id int primary key not null auto_increment,
        name varchar(20) not null,
        stock int not null
    )`);
    const query = `insert into ${table} (name, stock) values ?`;
    database.query(query, [inventory]);
}

const initTable = (name: string): void => {
    database.query(`drop table if exists ${name}`);
    database.query(`create table ${name}(
        id int primary key not null auto_increment,
        name varchar(20) not null,
        stock int not null
    )`);
}

const getIngredients = (name: string, callback: Function) => {
    let inventory: item[] = [];
    database.query(`select * from ${name}`, (err, results) => {
        if(err) console.error(err);
        else {
            const row = (<RowDataPacket> results);
            inventory = row as item[];
            return callback(inventory);
        }
    });
}

const insert = (name: string, inventory: insert) => {
    const query = `insert into ${name}(name, stock) values ?`;
    database.query(query, [inventory]);
}

const updateIngredients = (names: string[], id: string, callback: Function) => {
    let inClause = '';
    for(let i = 0; i < names.length; i++) {
        if(i === (names.length - 1))
            inClause += `"${names[i]}"`;
        else 
            inClause += `"${names[i]}", `
    }

    const query = `SELECT * FROM ${id} WHERE name IN (${inClause});`
    database.query(query, (err, results) => {
        if(err) console.log(err);
        else {
            const row = (<RowDataPacket> results);
            return callback(row as item[]);
        }
    });
}

export const updateItems = (id: string, inventory: item[]) => {
    inventory.forEach(item => {
        const query = `update ${id}
        set stock = ${item.stock}
        where name = "${item.name}"`
        database.query(query);
    });
}

export default { insert, initTable, getIngredients, update, updateIngredients };