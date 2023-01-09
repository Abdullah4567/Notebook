import axios from 'axios'
const client = axios.create({
    baseURL: `http://localhost:5000/api`,
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
    }
});
export default client