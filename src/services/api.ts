'use client';
import Axios, { AxiosInstance } from 'axios';
import f1Ergast from './f1Ergast';

export const ergastAPI: AxiosInstance = Axios.create({
    baseURL: '/api/f1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const f1ErgastSVC = f1Ergast(ergastAPI);
