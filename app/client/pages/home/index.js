import { getCurrentUser } from "../login/auth.js";

//Verificamos si hay sesión para mostrar el nombre del usuario en el botón de login y cambiar su funcionalidad a logout
const authLink = document.getElementById('authLink')
const authButton = document.getElementById('authButton')

let currentUser = null;
let allProducts = [];
let selectedCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
    currentUser = await getCurrentUser();

    if (currentUser) {
        authButton.textContent =
            `${currentUser.userName} | Cerrar Sesión`;
        authLink.href = '#';
        authLink.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('estaAutenticado');
            window.location.reload();
        });
        const savedCart = localStorage.getItem(
            `cart_${currentUser.id}`
        );
        if (savedCart) {
            cart.items = JSON.parse(savedCart);
        }
    } else {
        authButton.textContent = 'Iniciar Sesión';
        authLink.href = '../login/login.html';
    }

    cart.render();
});


/* ---- PRODUCTS ---- */
async function loadProducts() {
    try {
        const response =
            await fetch(
                'http://localhost:3001/product/all'
            );
        allProducts = await response.json();
        renderBrandFilters(allProducts);
        applyFilters();
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener(
    'DOMContentLoaded',
    loadProducts
);

/* ---- CART PRODUCT ---- */
function renderProducts(products) {
    const container =
        document.getElementById(
            'productsContainer'
        );
    container.innerHTML = '';

    products.forEach(product => {
        container.innerHTML += `
        <div class="product-card"
            data-product="${product._id}">
            <div class="product-card__img">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                >
                <button
                    class="wishlist-btn"
                    aria-label="Favorito">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
            <div class="product-card__body">
                <span class="product-brand">
                    ${product.brand}
                </span>
                <h5>
                    ${product.name}
                </h5>
                <div class="product-rating">
                    <span class="stars">
                        ${'★'.repeat(product.rating)}
                    </span>
                    <span class="review-count">
                        (${product.stock} disponibles)
                    </span>
                </div>
                <div class="product-price">
                    <span class="price-new">
                        $${product.price.toLocaleString('es-AR')}
                    </span>
                </div>
                <button
                    class="btn-add-cart"
                    data-name="${product.name}"
                    data-price="${product.price}"
                >
                    <i class="fa-solid fa-bag-shopping"></i>
                    Agregar
                </button>
            </div>
        </div>
        `;
    });
}

/* ---- FILTRAR ---- */
function applyFilters() {
    let filtered = [...allProducts];

    /* Categoría */
    if (selectedCategory !== 'all') {
        filtered = filtered.filter(product =>
            product.category.name === selectedCategory
        );
    }
    /* Marcas */
    const selectedBrands =
        [...document.querySelectorAll(
            '.brand-filter:checked'
        )]
        .map(cb => cb.value);
    if (selectedBrands.length > 0) {

        filtered = filtered.filter(product =>
            selectedBrands.includes(product.brand)
        );
    }
    /* Precio máximo */
    const maxPrice =
        parseFloat(
            document.getElementById('priceRange').value
        );
    filtered = filtered.filter(product =>
        product.price <= maxPrice
    );

    /* Orden */
    const sort =
        document.getElementById(
            'sortProducts'
        ).value;
    if (sort === 'price-asc') {
        filtered.sort(
            (a, b) => a.price - b.price
        );
    }
    if (sort === 'price-desc') {
        filtered.sort(
            (a, b) => b.price - a.price
        );
    }
    renderProducts(filtered);   
    
    document
        .getElementById('productsGrid')
        .scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        }); 
}
document
    .getElementById('sortProducts')
    .addEventListener(
        'change',
        applyFilters
    );

/* ---- CATEGORIA ---- */
document
    .querySelectorAll('[data-category]')
    .forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            selectedCategory =
            link.dataset.category;
            const categoryProducts =
                selectedCategory === 'all'
                    ? allProducts
                    : allProducts.filter(
                        p =>
                            p.category.name ===
                            selectedCategory
                    );
            renderBrandFilters(categoryProducts);
            applyFilters();
        });
    });

/* ---- MARCA ---- */
document
    .querySelectorAll('.brand-filter')
    .forEach(cb => {
        cb.addEventListener(
            'change',
            applyFilters
        );
    });

/* ---- PRECIO ---- */
const priceRange =
    document.getElementById('priceRange');

priceRange.addEventListener('input', () => {
    document.getElementById('priceVal')
        .textContent =
        `$${Number(priceRange.value)
            .toLocaleString('es-AR')}`;
    applyFilters();
});

/* ---- Filtrar filtros MARCAS ---- */
function renderBrandFilters(products) {
    const container =
        document.getElementById('brandFilters');
    const brands = [
        ...new Set(
            products.map(
                product => product.brand
            )
        )
    ];
    container.innerHTML = '';
    brands.forEach(brand => {
        container.innerHTML += `
            <label class="check-item">
                <input
                    type="checkbox"
                    class="brand-filter"
                    value="${brand}"
                >
                ${brand}
            </label>
        `;
    });
    document
        .querySelectorAll('.brand-filter')
        .forEach(cb => {
            cb.addEventListener(
                'change',
                applyFilters
            );
        });
}

/* ---- MOBILE NAV ---- */
(function initMobileNav() {
    const hamburger = document.getElementById('Header_Menu');
    const nav       = document.getElementById('mainNav');
    const overlay   = document.getElementById('navOverlay');

    function toggleNav(open) {
        nav.classList.toggle('open', open);
        overlay.classList.toggle('active', open);
        hamburger.classList.toggle('active', open);
    }

    if (hamburger) hamburger.addEventListener('click', () => toggleNav(!nav.classList.contains('open')));
    if (overlay)   overlay.addEventListener('click',   () => toggleNav(false));
})();

/* ---- CART PANEL ---- */
(function initCartPanel() {
    const cartBtn   = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartPanel = document.getElementById('cartPanel');

    if (cartBtn)   cartBtn.addEventListener('click',   () => cartPanel.classList.toggle('open'));
    if (closeCart) closeCart.addEventListener('click', () => cartPanel.classList.remove('open'));

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (cartPanel && cartPanel.classList.contains('open')) {
            if (!cartPanel.contains(e.target) && e.target !== cartBtn && !cartBtn.contains(e.target)) {
                cartPanel.classList.remove('open');
            }
        }
    });
})();


/* ---- CART LOGIC ---- */
const cart = {
    items: [],

    save() {
        if (currentUser) {
            localStorage.setItem(
                `cart_${currentUser.id}`,
                JSON.stringify(this.items)
            );
        }
        this.render();
    },  

    add(name, price) {
        const existing = this.items.find(i => i.name === name);
        if (existing) {
            existing.qty += 1;
        } else {
            this.items.push({ name, price: parseFloat(price), qty: 1 });
        }
        this.save();
        showAlert(`"${name}" agregado al carrito`, 'success');
    },

    remove(index) {
        this.items.splice(index, 1);
        this.save();
    },  

    empty() {
        this.items = [];
        this.save();
    },

    total() {
        return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    },

    render(){
        const tbody = document.getElementById('contentProducts');
        const totalEl = document.getElementById('total');
        const countEl = document.getElementById('cartCount');
        if (!tbody) return;

        const totalItems = this.items.reduce((s, i) => s + i.qty, 0);
        if (countEl) countEl.textContent = totalItems;

        tbody.innerHTML = this.items.length === 0
        ? '<tr><td colspan="4" style="text-align:center;padding:1.5rem;color:#9ca3af;font-size:13px;">El carrito está vacío</td></tr>'
        : this.items.map((item, idx) => `
            <tr>
                <td style="font-size:13px">${item.name}</td>
                <td style="font-size:13px;white-space:nowrap">$${item.price.toLocaleString('es-AR')}</td>
                <td style="font-size:13px;text-align:center">${item.qty}</td>
                <td>
                    <button onclick="cart.remove(${idx})" style="background:#fef2f2;border:1px solid #fecaca;color:#dc2626;width:26px;height:26px;border-radius:6px;font-size:13px;cursor:pointer" title="Eliminar">×</button>
                </td>
            </tr>`
        ).join('');

        if (totalEl) totalEl.textContent = `$${this.total().toLocaleString('es-AR')}`;        
    }
};

// Add to cart buttons
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-cart');
    if (!btn) return;
    cart.add(btn.dataset.name, btn.dataset.price);
});

// Empty cart
const emptyBtn = document.getElementById('emptyCart');
if (emptyBtn) emptyBtn.addEventListener('click', () => cart.empty());

// Init cart render
cart.render();