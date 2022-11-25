import axios, { AxiosResponse } from 'axios';

export const request = async(url: string, method: string, params?: any): Promise<AxiosResponse<any, any> | undefined> => {
    if(url === null || method === null)
        return;

    if(params === undefined || Object.keys(params).length === 0)
        return await axios({
            url: url,
            method: method
        });
    if(params.params !== undefined && params.data !== undefined)
        return axios({
            url: url,
            method: method,
            params: params.params,
            data: params.data,

        });
    if(params.params === undefined && params.data !== undefined)
        return axios({
            url: url,
            method: method,
            data: params.data,
        });
    if(params.params !== undefined && params.data === undefined)
        return axios({
            url: url,
            method: method,
            params: params.data,
        });
}