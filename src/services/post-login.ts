const apiUrl = import.meta.env.VITE_API_URL

export async function postLoginSession(
  endpoint: string, 
  email: string, 
  password: string
): Promise<any> {
  const url = `${apiUrl}${endpoint}`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}