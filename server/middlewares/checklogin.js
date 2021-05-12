/**
 * @name checklogin
 * @description 检查用户是否登录的中间件
 * @author ivy
 */

 module.exports = (req,res,next)=>{
     console.log(req.session);
    if(!req.session.userInfo){
        let result = {
            code: 1000,
            data: [],
            message: "未登录"
        }
        
        return res.end(JSON.stringify(result));
    }
    next();
}