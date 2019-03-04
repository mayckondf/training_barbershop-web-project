const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      req.flash('error', 'Usuário não encontrado')
      console.log('Usuario nao Encontrado')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('Senha Incorreta')
      return res.redirect('/')
    }

    req.session.user = user

    return res.redirect('/app/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      res.redirect('/signin')
    })
  }
}

module.exports = new SessionController()
