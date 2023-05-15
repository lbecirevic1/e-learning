import axios from "axios";
import { merge } from "lodash";

export const Request = async (
    url = '',
    method = 'GET',
    data = {},
    aditionalHeaders = {},
) => {
    let defaultConfig = {
        headers: {
            Accept: "application/json",
        }
    };

    const params = {
        url,
        method,
        data,
        headers: aditionalHeaders
    }

    const fullConfig = merge(defaultConfig, params);

    return axios.request(fullConfig)
        .then(r => {
            return r;
        })
        .catch(err =>{
            throw err;
        })

}