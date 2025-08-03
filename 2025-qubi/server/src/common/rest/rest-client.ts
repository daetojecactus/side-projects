import axios, { AxiosInstance } from 'axios';
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry';

export interface RestClientOptions {
  baseURL: string;
  headers?: Record<string, string>;
  auth?: { username: string; password: string };
  retryOptions?: IAxiosRetryConfig;
}

export const createRestClient = (options: RestClientOptions): AxiosInstance => {
  const instance = axios.create({
    baseURL: options.baseURL,
    headers: options.headers,
    auth: options.auth,
  });

  if (options.retryOptions) {
    axiosRetry(instance, options.retryOptions);
  }

  return instance;
};
