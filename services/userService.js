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
        const newId = db.length > 0 
                ? parseInt(db[db.length - 1].id) + 1 
                : 1;
        const newUser ={
            id:newId,
            email:user.email,
            name:user.name
        }
        db.push(newUser);
        await fs.writeFile(pathName,JSON.stringify(db));
        res.end('User added successfully');
    }
}

const updateUser =async (req,res, user)=>{
    const data = await fs.readFile(pathName, 'utf-8');

    if(user){
        let db = JSON.parse(data);
        const userIndex = db.findIndex(u => u.id == user.id);
        const {email,name}=user
        db[userIndex] = {
                ...db[userIndex],
                email: email || db[userIndex].email,
                name: name || db[userIndex].name
            };
        
        await fs.writeFile(pathName,JSON.stringify(db));
        res.end('User updated successfully');
    }
}
const deleteUser = async (req,res,user)=>{
    const { id, q } = p(req);
    console.log('this is the id :', id, q);
    const data = await fs.readFile(pathName, 'utf-8');
    if(user){
        let db = JSON.parse(data);
        const newDb = db.filter(u=> u.id != user.id)
        await fs.writeFile(pathName,JSON.stringify(newDb));
        res.end('User removed successfully');
    }
}

// Super compact helper
const p = (req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const q = Object.fromEntries(url.searchParams);
  const m = req.url.match(/\/[^\/]+\/([^\/?]+)/);
  return { ...q, id: m?.[1] || q.id }; // Try path first, then query
};

// Usage (even shorter with destructuring)
// const { id, search } = p(req);

module.exports={getAllUsers, addUser,updateUser,deleteUser};