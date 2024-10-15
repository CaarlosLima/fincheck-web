export function isDevelopment(): boolean {
  return import.meta.env.DEV;
}

export function isProduction(): boolean {
  return import.meta.env.PROD;
}

export function isTest(): boolean {
  return import.meta.env.MODE === 'test';
}
