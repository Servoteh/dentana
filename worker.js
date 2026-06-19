import * as booking from './functions/api/booking.js';

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/booking') {
      const context = { request, env, ctx };
      if (request.method === 'POST') return booking.onRequestPost(context);
      if (request.method === 'OPTIONS') return booking.onRequestOptions(context);
      return new Response('Method Not Allowed', { status: 405 });
    }

    return env.ASSETS.fetch(request);
  },
};
