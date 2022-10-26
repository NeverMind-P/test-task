const mysql = require ('mysql');
const dbconfig  = require ('../config/database');

const connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + process.env.DATABASE);

connection.query('USE ' + process.env.DATABASE);

connection.query('\
CREATE TABLE `'+ process.env.USERTABLE +'` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `name` VARCHAR(80) NOT NULL, \
    `homePhone` VARCHAR(20) NOT NULL, \
    `inquiryDetails` VARCHAR(60) NOT NULL, \
    `interests` VARCHAR(60) NOT NULL, \
    `isBuyer` BOOLEAN, \
    `isSeller` BOOLEAN, \
    `isArchived` BOOLEAN, \
    PRIMARY KEY (`id`) \
)');

console.log('Success: Database Created!')

connection.end();
