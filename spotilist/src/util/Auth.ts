
export async function getAccessToken(client_id: string, client_secret: string) {
    const encodedCredentials = btoa(`${client_id}:${client_secret}`);
    const tokenEndpoint = "https://accounts.spotify.com/api/token";
    const authOptions = {
        method: "POST",
        headers: {
            Authorization: `Basic ${encodedCredentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
        }),
    };
    try{
        const response = await fetch(tokenEndpoint, authOptions);
        if(!response.ok){
            throw new Error(`Spotify API Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.log("Error fetching Spotify access token:", error);
        throw Error;
    }
}
