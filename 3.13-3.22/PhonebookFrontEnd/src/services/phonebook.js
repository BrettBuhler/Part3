import axios from "axios"

const baseUrl = '/api/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = (newObject) => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => res.data).catch(error => {
        console.log(error.response.data.error)
    })
}

const update = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(res => res.data)
}

const deleteId = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res)
}
export default { getAll, create, update, deleteId }