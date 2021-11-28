import axios from 'axios'

export const getSearchResults = (search) => {
    return new Promise (async (resolve, reject) => {
    
        axios.get(`https://www.superheroapi.com/api.php/10220347982304749/search/${search}`)
            .then(res => {
                resolve(res.data)
                console.log('respuesta ok', res.data)
            })
            .catch((err)=> console.log(err))
    })
}


export const getHero = async (itemId) => {

    const baseUrl = 'https://www.superheroapi.com/api.php/10220347982304749'
    const requestUrl = baseUrl + itemId

    return new Promise (async (resolve, reject) => {
    
        axios.get(requestUrl)
            .then(res => {
                if (res.data.response === 'success') {
                    resolve(res.data)
                } else if (res.data.response === 'error') {
                    reject(res.data.error)
                }
            })
            .catch((err)=> console.log(err))
    })
}