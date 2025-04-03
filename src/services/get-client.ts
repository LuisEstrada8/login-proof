const apiUrl = import.meta.env.VITE_API_URL

export async function getUsersInformation(endpoint: string, page: number) {
    const url = `${apiUrl}${endpoint}?page=${page}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch user information:', error);
        throw error;
    }
}