// src/routes/+layout.server.ts
export const load = ({ request }) => {
    return {
      acceptLanguage: request.headers.get('accept-language') ?? null
    };
  };