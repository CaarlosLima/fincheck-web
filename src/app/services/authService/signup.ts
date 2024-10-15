import { httpClient } from 'src/app/services/httpClient';
import { delay } from 'src/app/utils/delay';
import { isDevelopment } from 'src/app/utils/environment';

export type SignupParams = {
  email: string;
  name: string;
  password: string;
};

type SignupResponse = {
  accessToken: string;
};

export async function signup(params: SignupParams) {
  if (isDevelopment()) {
    await delay();
  }

  const { data } = await httpClient.post<SignupResponse>(
    '/auth/signup',
    params,
  );

  return data;
}
