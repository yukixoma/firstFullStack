import axios from 'axios';

const apiCaller = (method, url, data, callback) => {
    axios({
        method,
        url,
        data
    })
        .then(res => callback(res, null))
        .catch(err => callback(null, err))
}

export default apiCaller;