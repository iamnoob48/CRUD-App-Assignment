import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js';


async function authAdmin(req,res,next){
    const headerToken = req.headers['authorization'];
    let token;
    //If its starts with bearer we will split for this case
    if(headerToken && headerToken.startsWith('Bearer ')){
        token = headerToken.split(' ')[1]
    }else{
        token = headerToken;
    }
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
    
      try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
    

        const user = await prisma.user.findUnique({
          where: { id: decoded.id },
          select: { role: true },
        });
    
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }
    
        if (user.role !== "ADMIN") {
          return res.status(403).json({ message: "Access denied: Admins only" });
        }
    
        req.userId = decoded.id;
        req.userRole = user.role;
        next();
      } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
    
}
export default authAdmin;