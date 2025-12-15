const fs=require('fs').promises;
const path=require('path');
const pathName=path.join(__dirname,'../db.json');


const getAllUsers = async (req,res) => {
    const data = await fs.readFile(pathName, 'utf-8');
    console.log('the data : ',data);
    res.end(data);
};

const addUser =async (req,res, user)=>{
    console.log('user from service : ',user);
    const data = await fs.readFile(pathName, 'utf-8');
    if(user){
        let db = JSON.parse(data);
        db.push(user);
        await fs.writeFile(pathName,JSON.stringify(db));
        res.end('User added successfully');
    }
}

module.exports={getAllUsers, addUser};