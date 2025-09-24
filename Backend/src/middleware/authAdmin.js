import jwt from 'jsonwebtoken'

function authAdmin(req,res,next){
    const headerToken = req.headers['authorization'];
    let token;
    //If its starts with bearer we will split for this case
    if(headerToken && headerToken.startsWith('Bearer ')){
        token = headerToken.split(' ')[1]
    }else{
        token = headerToken;
    }
    jwt.verify(token , process.env.JWT_KEY, (err,decoded)=>{
        if(err) {return res.status(404).json({message:`Token did not match ${token}`})}
        req.userRole = decoded.role;
        if(req.userRole === "ADMIN"){next();}
        else{res.status(404).json({message : "You are not an admin yet"})}
        
    })
}
export default authAdmin;