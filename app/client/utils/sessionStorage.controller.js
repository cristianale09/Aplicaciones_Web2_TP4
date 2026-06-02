//agregamos una sesion
export const addSession = (user)=>{
    sessionStorage.setItem('user', JSON.stringify(user))
}

//obtenemos la informacion del navegador
export const getSession = () => {
    return JSON.parse(sessionStorage.getItem('user'))
}

function saveToLocalStorage() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const cartData = {
        user: user ? { id: user.id_user || user.id, name: user.name } : null,
        products: productsArray
    };
    localStorage.setItem('cart', JSON.stringify(cartData));
}