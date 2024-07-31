/* eslint-disable @typescript-eslint/no-explicit-any */
// auth-utils.ts

declare global {
  interface Window {
    google: any;
  }
}

export function loadGoogleSignInAPI(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export async function handleGoogleLogin(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.google) {
      reject(new Error('Google API not loaded'));
      return;
    }
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      scope: 'email profile',
      callback: (response: any) => {
        if (response.error) {
          reject(response);
        } else {
          resolve(response.access_token);
        }
      },
    });
    client.requestAccessToken();
  });
}
