import { User } from 'src/app/entities/User';
import { httpClient } from 'src/app/services/httpClient';

type MeResponse = User;

export async function me() {
  const { data } = await httpClient.get<MeResponse>('/users/me');

  return data;
}
