const listproducts = document.querySelector('#listproducts');
const contentProducts = document.querySelector('#contentProducts');
const emptyCart = document.querySelector('#emptyCart');

const API_URL = 'http://localhost:3001';
let productsArray = [];

//carga productos del backend y arma el HTML
async function loadProductsFromAPI() {
    try {
        const res = await fetch(`${API_URL}/product/all`)
        if (!res.ok) throw new Error('Error al cargar productos');
        const products = await res.json();

        // Solo reemplaza el HTML si hay productos en el listado
        if (products.length > 0) {
            listproducts.innerHTML = '';
            products.forEach(prod => {
                // ... mismo código de antes
            });
        }
    } catch (error) {
        console.warn('Productos cargados desde HTML estático:', error.message);        
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadProductsFromAPI();
    eventListeners();
});

function eventListeners() {
    listproducts.addEventListener('click', getDataElements);

    emptyCart.addEventListener('click', function () {
        productsArray = [];
        clearHtml();
        productsHtml();
        updateCartCount();
        updateTotal();
    });

    //carga respetando el usuario ──
    const saved = JSON.parse(localStorage.getItem('cart'));
    if (saved) {
        // Si tiene la estructura nueva { user, products }
        if (saved.products) {
            productsArray = saved.products;
        } else {
            // Si tiene la estructura vieja (array directo)
            productsArray = Array.isArray(saved) ? saved : [];
        }
        productsHtml();
        updateCartCount();
        updateTotal();
    }
}

function updateTotal() {
    const total = document.querySelector('#total');
    let totalproduct = productsArray.reduce((total, prod) => total + prod.price * prod.quantity, 0);
    total.textContent = `$${totalproduct.toFixed(2)}`;
}

function updateCartCount() {
    const cartCount = document.querySelector('#cartCount');
    cartCount.textContent = productsArray.length;
}

function getDataElements(event) {
    if (event.target.classList.contains('product__btn')) {
        const elementHtml = event.target.parentElement.parentElement.parentElement;
        SelectData(elementHtml);
    }
}

function SelectData(prod) {
    const productObj = {
        img: prod.querySelector('img').src,
        title: prod.querySelector('h3').textContent,
        price: parseFloat(prod.querySelector('.products__price').textContent.replace('$', '')),
        id: parseInt(prod.querySelector('button[type="button"]').dataset.id, 10),
        quantity: 1
    };

    const exists = productsArray.some(p => p.id === productObj.id);
    if (exists) {
        showAlert('El producto ya se encuentra en el carrito', 'error');
        return;
    }

    productsArray = [...productsArray, productObj];
    showAlert('Producto agregado correctamente', 'success');
    productsHtml();
    updateCartCount();
    updateTotal();
}

function productsHtml() {
    clearHtml();
    productsArray.forEach(prod => {
        const { img, title, price, id, quantity } = prod;
        const tr = document.createElement('tr');

        const tdImg = document.createElement('td');
        const prodImg = document.createElement('img');
        prodImg.src = img;
        tdImg.appendChild(prodImg);

        const tdTitle = document.createElement('td');
        const prodTitle = document.createElement('p');
        prodTitle.textContent = title;
        tdTitle.appendChild(prodTitle);

        const tdPrice = document.createElement('td');
        const prodPrice = document.createElement('span');
        prodPrice.textContent = `$${(price * quantity).toFixed(2)}`;
        tdPrice.appendChild(prodPrice);

        const tdQuantity = document.createElement('td');
        const prodQuantity = document.createElement('input');
        prodQuantity.type = 'number';
        prodQuantity.min = 1;
        prodQuantity.value = quantity;
        prodQuantity.dataset.id = id;
        prodQuantity.oninput = updateQuantity;
        tdQuantity.appendChild(prodQuantity);

        const tdDelete = document.createElement('td');
        const prodDelete = document.createElement('button');
        prodDelete.type = 'button';
        prodDelete.textContent = 'X';
        prodDelete.onclick = () => destroyProduct(id);
        tdDelete.appendChild(prodDelete);

        tr.append(tdImg, tdTitle, tdPrice, tdQuantity, tdDelete);
        contentProducts.appendChild(tr);
    });

    saveToLocalStorage();
}

// ── NUEVO: guarda carrito con datos del usuario ──
function saveToLocalStorage() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    localStorage.setItem('cart', JSON.stringify({
        user: user ? { id: user.id_user, name: user.name } : null,
        products: productsArray
    }));
}

function updateQuantity(event) {
    const newQuantity = parseInt(event.target.value, 10);
    const id = parseInt(event.target.dataset.id, 10);
    const product = productsArray.find(prod => prod.id === id);
    if (product && newQuantity > 0) {
        product.quantity = newQuantity;
    }
    productsHtml();
    updateTotal();
    saveToLocalStorage();
}

function destroyProduct(id) {
    productsArray = productsArray.filter(prod => prod.id !== id);
    clearHtml();
    productsHtml();
    showAlert('Producto eliminado del carrito', 'success');
    updateCartCount();
    updateTotal();
    saveToLocalStorage();
}

function showAlert(message, type) {
    const existing = document.querySelector('.alert');
    if (existing) existing.remove();
    const div = document.createElement('div');
    div.classList.add('alert', type);
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

function clearHtml() {
    while (contentProducts.firstChild) {
        contentProducts.removeChild(contentProducts.firstChild);
    }
}