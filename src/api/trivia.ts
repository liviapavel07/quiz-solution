/* eslint-disable no-underscore-dangle */
import axios, { AxiosInstance } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { ApiInterface } from '../core/interfaces';

const baseUrl = 'https://opentdb.com';

const apiClient = (): AxiosInstance => {
    const client = axios.create({
        baseURL: baseUrl,
        responseType: 'json',
        withCredentials: false,
        validateStatus: status => status < 400,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    client.interceptors.response.use(
        response => response,
        error => {
            return Promise.reject(error);
        }
    );
    return client;
};

const QuizApi: ApiInterface = {
    async getQuestions({ amount, category, type, difficulty }) {
        const res = await apiClient().request({
            url: `/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`,
            method: 'GET'
        });
        return camelcaseKeys(res.data.results, { deep: true });
    }
};

export { QuizApi, apiClient };
