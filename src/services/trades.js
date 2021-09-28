//tradeService provides an interface for us to connect to database via the following abstraction:
//tradeService.getAll()

import axios from 'axios'

const baseURL = 'http://localhost:3003/api/trades'

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

export default getAll
