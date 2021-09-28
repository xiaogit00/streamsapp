//Uses axios to get all the data.
import axios from 'axios'

const baseURL = 'http://localhost:3003/api/streams'

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

export default { getAll }
