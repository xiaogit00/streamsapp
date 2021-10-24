//Uses axios to get all the data.
import axios from 'axios'

const baseURL = '/api/streams/'
const token = localStorage.getItem('token')
import interceptorService from 'services/interceptorService'



const getAll = async () => {

    console.log('getAll from Streamreducer is called')

    try {
        const response = await axios.get(baseURL, {
            headers: {
                Authorization:`bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        console.log('unable to get data, error message:', err)
    }

}

const createNew = async (content) => {
    const response = await axios.post(baseURL, content, {
        headers: {
            Authorization:`bearer ${token}`
        }
    })
    return response.data
}

const deleteStream = async (id) => {
    const response = await axios.delete(`${baseURL}/${id}`, {
        headers: {
            Authorization:`bearer ${token}`
        }
    })
    return response.status
}

const updateStream = async (id, newStream) => {
    const response = await axios.put(`${baseURL}/${id}`, newStream, {
        headers: {
            Authorization:`bearer ${token}`
        }
    })
    return response.status
}

export default { getAll,
    createNew,
    deleteStream,
    updateStream}
