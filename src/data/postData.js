import axios from 'axios'

export const postData = async (email, password) => {

    return await axios ({
        method: 'post',
        url: 'https://challenge-react.alkemy.org',
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
      
  }