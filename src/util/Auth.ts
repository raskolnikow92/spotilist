const client_id = import.meta.env.VITE_CLIENT_ID!;
const client_secret = import.meta.env.VITE_CLIENT_SECRET!;
const code = undefined;

if (!code) {
    redirectToAuthCodeFlow(client_id);
} else {
    const accessToken = await getAccessToken(client_id, code);
    const profile = await fetchProfile(accessToken);
    //populateUI(profile);
}

async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem('verifier', verifier);
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', "http://localhost:5173/callback");
    params.append('scope', 'user-read-private user-modify-private user-read-email');
    params.append('code_challenge', challenge);

    document.location = 'https://accounts.spotify.com/authorize?' + params.toString();
}

function generateCodeVerifier(length: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(verifier: string): Promise<string> {
    const data = new TextEncoder().encode(verifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function getAccessToken(clientId: string, code: string) {
  // TODO: Get access token for code
}

async function fetchProfile(token: string): Promise<any> {
    // TODO: Call Web API
}

function populateUI(profile: any) {
    // TODO: Update UI with profile data
}