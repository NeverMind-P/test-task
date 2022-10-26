const mysql = require('mysql');
const dbconfig = require('../config/database');
require('dotenv').config()

dbconfig.connection.database = process.env.DATABASE

async function addUser( user ){
    const connection = await mysql.createConnection(dbconfig.connection);
    let isBuyer = false;
    let isSeller = false;
    let isArchived = false;
    const interestsArray = user.interests.toLowerCase().split(',')
    if(interestsArray.includes('buyer')) isBuyer = true 
    if(interestsArray.includes('seller')) isSeller = true 
    if(interestsArray.includes('archived')) isArchived = true 

    await connection.query(`INSERT INTO ${process.env.USERTABLE} (name, homePhone, inquiryDetails, interests, isBuyer, isSeller, isArchived) 
    value ('${user.name} ${user.lastName}', '${user.homePhone}', '${user.inquiryDetails}', '${user.interests}', ${isBuyer}, ${isSeller}, ${isArchived});`);
};

async function isUserExist( userName ){
    return new Promise((resolve, reject) => {
        const conenction = mysql.createConnection(dbconfig.connection);
        conenction.query(`SELECT 1 FROM ${process.env.USERTABLE} WHERE name = '${userName}';`, (err, res) => {
          if (err) return reject(err);
          if (!res.length) return resolve(false)
          return resolve(true)
        })
    })
}

async function deleteUser (id) {
    const connection = await mysql.createConnection(dbconfig.connection);
    await connection.query(`DELETE FROM ${process.env.USERTABLE} WHERE id = ${id}`)
}

module.exports = {
    isUserExist,
    addUser,
    deleteUser
};
