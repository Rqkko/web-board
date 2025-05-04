import { useEffect } from 'react'
import { api } from 'utils/api'

function Logout() {
  useEffect(() => {
    api.post('/api/user/logout', {
      withCredentials: true
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = '/login'
        }
      })
      .catch((error) => {
        console.error('Logout error:', error)
        alert('Error logging out. Please try again.')
        window.location.href = '/'
      })
  });

  return null;
}

export default Logout