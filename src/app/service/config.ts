export const BASE_URL = `https://api.airtable.com/v0/${import.meta.env['NG_APP_DB_KEY']}`;

export const headers = {
  Authorization: `Bearer ${import.meta.env['NG_APP_API_KEY']}`,
};
