import jwt from 'jsonwebtoken'

function auth(req,res,next){
    const headerToken = req.headers['authorization'];
    let token;
    //If its starts with bearer we will split for this case
    if(headerToken && headerToken.startsWith('Bearer ')){
        token = headerToken.split(' ')[1]
    }else{
        token = headerToken;
    }
    //Verify the token and fire of next()
    jwt.verify(token , process.env.JWT_KEY, (err,decoded)=>{
        if(err) {return res.status(404).json({message:`Token did not match ${token}`})}
        req.userId = decoded.id;
        next();
    })
}
export default auth;