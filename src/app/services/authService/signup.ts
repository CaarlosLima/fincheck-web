import { delay } from '../../utils/delay';
import { httpClient } from '../httpClient';

export type SignupParams = {
  email: string;
  name: string;
  password: string;
};

type SignupResponse = {
  accessToken: string;
};

export async function signup(params: SignupParams) {
  await delay();

  const { data } = await httpClient.post<SignupResponse>(
    '/auth/signup',
    params,
  );

  return data;
}
