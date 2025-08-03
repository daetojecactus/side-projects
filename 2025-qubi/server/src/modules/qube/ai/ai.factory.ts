import axios from 'axios';
import axiosRetry from 'axios-retry';

export const AiApiClient = axios.create({
  baseURL: process.env.AI_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.AI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

axiosRetry(AiApiClient, { retries: 3 });
