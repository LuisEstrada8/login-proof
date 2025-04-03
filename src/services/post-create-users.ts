const apiUrl = import.meta.env.VITE_API_URL

export async function postCreateUsers(
    endpoint: string, 
    name: string, 
    job: string
  ): Promise<any> {
    const url = `${apiUrl}${endpoint}`;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, job }),
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