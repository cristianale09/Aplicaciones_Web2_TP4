export async function getCurrentUser() {
    const token = sessionStorage.getItem('token');

    if (!token) {
        return null;
    }

    try {
        const response = await fetch(
            'http://localhost:3001/user/decodedToken',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            }
        );
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function logout() {

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('estaAutenticado');

}