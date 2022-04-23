const user = require('../models/users')

async function emptyCheck(value){
    return value.trim().length != 0;
}

async function checkName(value)
{
    for(var i = 0; i < value.length; i++)
    {
        if(value[i] < 'a' || value[i] > 'z')
        {
            return false;
        }   
    }
    return true;
}

async function checkNumber(value){
    let regex = /^[0-9]+$/;
    return regex.test(value) && value.trim().length==10;
}



// function render
module.exports = {emptyCheck,checkName,checkNumber}