import axios from 'axios';

export default axios.create({
    baseURL: 'https://blockstream.info/api',
    headers: {
        'Content-Type': 'application/json'
    },
});