import { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import UserInfos from '../components/UserInfos'

import { getProfile, register } from '../services/api'

import { loginUser, useAuth } from '../contexts/AuthContext'

// Composant sous forme de fonction
// Nouvelle méthode
function Auth () {
  // Initialisation des états locaux
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [profil, setProfil] = useState(null)

  const { dispatch, state: { error, loading } } = useAuth()

  console.log(error)

  // Appelé à chaque montage dans le DOM
  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  // Soumission du formulaire
  const handleSubmit = async (infos) => {
    let data
    if (isRegister) {
      // Appel de la fonction d'API register
      data = await register(infos)
    } else {
      // Appel de la fonction d'API login
      await loginUser(infos, dispatch)
    }
    const token = window.localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }

  const handleLoadProfile = async () => {
    const profile = await getProfile()
    setProfil(profile)
  }

  const logout = () => {
    setIsLoggedIn(false)
    window.localStorage.removeItem('token')
  }

  return (
    <div>
      {
        isLoggedIn
          ? <UserInfos logout={logout} />
          : (
            <div>
              {
                isRegister
                  ? <RegisterForm
                      submit={handleSubmit}
                      error={error}
                    />
                  : <LoginForm
                      submit={handleSubmit}
                      error={error}
                    />
              }
              <a
                href='#'
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "J'ai déjà un compte" : "Je n'ai pas de compte"}
              </a>
            </div>
            )
          }
      <button onClick={handleLoadProfile}>Load Profile</button>
      <p>{profil && JSON.stringify(profil)}</p>
    </div>
  )
}
export default Auth
