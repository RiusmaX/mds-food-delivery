import { useState } from 'react'
import TextInput from './TextInput'

import './styles/Form.css'

function LoginForm ({ submit, error }) {
  const [formData, setFormData] = useState({
    email: 'test@test.fr',
    password: '12345678'
  })

  const handleChange = (e) => {
    setFormData({
      // Conservation des autres champs
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    // Annulation du comportement par défaut du navigateur (rechargement de la page)
    e.preventDefault()
    submit(formData)
  }

  return (
    <div className='container'>
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='email'
          name='email'
          label='E-mail'
          value={formData.email}
          onChange={handleChange}
        />
        <TextInput
          type='password'
          name='password'
          label='Mot de passe'
          value={formData.password}
          onChange={handleChange}
        />
        <input type='submit' value='Se connecter' />
        {
              error &&
              (
                <div>
                  <h4>Identifiants invalides</h4>
                </div>
              )
            }
      </form>
    </div>
  )
}

export default LoginForm
