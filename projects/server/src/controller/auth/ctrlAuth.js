const {buildQuery, findUser, validatePassword, generateToken, verifyToken, getUserById,} = require('./svcAuth')

const Auth = {
    login : async (req, res) => {
        try {
          const { password, username} = req.body;
          const query = buildQuery(email, username, phone);
          const checkLogin = await findUser(query);
      
          if (!checkLogin) {
            return res.status(400).json({message: 'user not found'});
          }
      
          const isValid = await validatePassword(password, checkLogin.password);
          if (!isValid) {
            return res.status(401).json({message:"Password is incorrect"});
          }
      
          let payload = { 
            id: checkLogin.id,
            isVerified: checkLogin.isVerified
          };
          const token = generateToken(payload);
      
          return res.status(200).json({message: "Login succeeded", loginToken: token});
        } catch (err) {
          return res.status(500).json({message:"Login failed",error: err.message});
        }
      },
      forgetPassword: async (req, res) => {
        try {
        const {email} = req.body;
        const idEmail = await getByEmail(email);

        if(!idEmail) {
            return res.status(404).json({message: 'unregistered email'})
        };

        const payload = {id: idEmail.id};

        const token = await generateResetToken(payload)

        await sendVerification(email, idEmail.username, 'reset password', token)
        
        return res.status(200).json({message: 'check email to continue changing your password'})
    }
    catch (err) {
        return res.status(500).json({message: 'please try again next life', error: err.message})
    }
    }, 

    resetPassword: async (req, res) => {
       try {
        const {newPassword} = req.body;
            const {id} = req.user;
            const hashedPass = await hashUserPassword(newPassword);

            await executeTransaction(id, 'password', hashedPass)
          
            return res.status(200).json({message: 'resetting password ok'})
         
       }
       catch (err) {
        return res.status(500).json({message: 'resetting password not ok', error: err.message})
       }
    }
};

module.exports = Auth;