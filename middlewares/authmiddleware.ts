import { verifyToken } from '../auth/JWT/jwtService';
import { UserDal } from "../services/UserService/DAL/user.dal";
const userDal = new UserDal(); 

export async function authMiddleware(req, res, next){
    const cookies = req.cookies;
    if (cookies && cookies.Authorization) {
        try {
          const verificationResponse = await verifyToken(cookies.Authorization);
          const id = verificationResponse.id;
          const user = await userDal.getById(id);
          if (user) {
            req.user = user;
            next();
          } else {
            next(new Error("User not  found"));
          }
        } catch (error) {
          next(new Error("Wrong token"));
        }
      } else {
        next(new Error("No cookie"));
      }
}