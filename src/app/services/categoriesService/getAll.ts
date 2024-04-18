import { Category } from 'src/app/entities/Category';
import { httpClient } from 'src/app/services/httpClient';

type CategoriesResponse = Array<Category>;

export async function getAll() {
  const { data } = await httpClient.get<CategoriesResponse>('/categories');

  return data;
}
