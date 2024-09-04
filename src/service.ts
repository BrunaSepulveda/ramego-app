import axios, { AxiosError } from 'axios';
import { BrothProtein } from './types';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'x-api-key': 'ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf',
  },
});

async function getProteins(): Promise<BrothProtein[]> {
  return (await api.get('/proteins')).data;
}

async function getBroths(): Promise<BrothProtein[]> {
  return (await api.get('/broths')).data;
}

export async function createOrder(brothId: string, proteinId: string) {
  return api.post('/orders', { brothId, proteinId });
}

export async function requestSaveProteinsAndBroths(): Promise<
  | {
      broths: BrothProtein[];
      proteins: BrothProtein[];
    }
  | undefined
> {
  try {
    const broths = await getBroths();
    const proteins = await getProteins();

    return { broths, proteins };
  } catch (error) {
    console.log((error as unknown as AxiosError).message);
  }
}
