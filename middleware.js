import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();

  // Set the x-forwarded-host header to the correct domain
  const headers = new Headers(request.headers);
  headers.set('x-forwarded-host', 'blogpolisher.netlify.app');

  // Optionally, check if the request's origin is correct and log headers
  console.log('x-forwarded-host:', request.headers.get('x-forwarded-host'));
  console.log('origin:', request.headers.get('origin'));

  // Proceed with the request
  return NextResponse.next({
    request: {
      headers,
    },
  });
}
