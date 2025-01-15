const clientId = import.meta.env.VITE_CLIENT_ID!;
const client_secret = import.meta.env.VITE_CLIENT_SECRET!;
const redirectUrl = 'http://localhost:5173/callback';
const scopes = 'user-read-private user-read-email';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const authEndpoint = 'https://accounts.spotify.com/authorize';
const params = new URLSearchParams(window.location.search);


const code = params.get("code");


async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    console.log("string:",verifier);
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem('verifier', verifier);
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('response_type', 'code');
    params.append('redirect_uri', redirectUrl);
    params.append('scope', scopes);
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', challenge);

    document.location = `${authEndpoint}?${params}`;
}

function generateCodeVerifier(length: number) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(verifier: string) {
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

 export async function getAccessToken(clientId: string, code: string) {
  // TODO: Get access token for code
  const verifier = localStorage.getItem('verifier');
  const params = new URLSearchParams();
  params.append('client_id', clientId);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUrl);
    params.append('code_verifier', verifier!);

    const result = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    });
    
    const { access_token } = await result.json();
    
    return access_token;
}

async function fetchProfile(token: string): Promise<any> {
    // TODO: Call Web API
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
}

function populateUI(profile: any) {
    // TODO: Update UI with profile data
}



export async function connect() {
    if (!code) {
        redirectToAuthCodeFlow(clientId);
    } else {
        const accessToken = await getAccessToken(clientId, code!);
        const profile = await fetchProfile(accessToken);
        console.log(profile);
        //populateUI(profile);
    }
}