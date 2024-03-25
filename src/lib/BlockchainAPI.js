//setup axios for blockchain API
import axios from 'axios';

export default axios.create({
    baseURL: 'https://blockchain.info'
});