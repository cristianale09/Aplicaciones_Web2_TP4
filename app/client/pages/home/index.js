import { getCurrentUser } from "../login/auth.js";

//Verificamos si hay sesión para mostrar el nombre del usuario en el botón de login y cambiar su funcionalidad a logout
const authLink = document.getElementById('authLink')
const authButton = document.getElementById('authButton')

let currentUser = null;

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