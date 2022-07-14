const users = []

const bcryptjs = require('bcryptjs');

module.exports = {
    login: (req, res) => {
      // console.log('Logging In User')
      // console.log(req.body)
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const authenticated = bcrypt.compareSync(password, users[i].password);

          if(authenticated === true){
            let returned = {...users[i]};
            delete returned.password
            
            res.status(200).send(returned)
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)

        const {username, email, firstName, lastName, password} = req.body

        const salt = bcryptjs.genSaltSync(5)
        const hashed = bcryptjs.hashSync(password, salt)
        console.log(hashed)

        let user = {
          username,
          email,
          firstName,
          lastName,
          password: hashed
        }

        users.push(user)
        let infoUser = {...user}
        delete infoUser.password
        res.status(200).send(users)
    }
}