# Trabajo Práctico 4

Aplicación web desarrollada con **Node.js**, **Express**, **HTML**, **CSS** y **JavaScript**. 
El proyecto incluye un frontend estático y un backend básico con rutas para usuarios y productos utilizando archivos JSON como almacenamiento de datos.

---

# Tecnologías utilizadas

```

- Node.js
- Express.js
- HTML5
- CSS3
- JavaScript
- JSON como base de datos simple

```

---

📦 Estructura del proyecto

```text
Aplicaciones_Web2_TP4
├── 📁 app
│ ├── 📁 client
│ │   ├── 📁 assets
│ │   │ ├── 📁 Icons  
│ │   │ ├── 📁 IMG
│ │   │ └── logo.png
│ │   ├── 📁 components
│ │   │ └── alert.js
│ │   ├── 📁 pages
│ │   │ ├── 📁 content
│ │   │ │ ├── contacto.html
│ │   │ │ ├── productos.html
│ │   │ │ └── quienes.html
│ │   │ ├── 📁 home
│ │   │ │ ├── index.html
│ │   │ │ └── index.js
│ │   │ └── 📁 login
│ │   │   ├── login.html
│ │   │   └── auth.js
│ │   ├── 📁 script
│ │   │ ├── script.js 
│ │   │ ├── script-contact.js
│ │   │ └── script-login.js
│ │   ├── 📁 styles
│ │   │ ├── styles.css
│ │   │ └── styles-login.css
│ │   └── 📁 utils
│ │     └── sessionStorage.controller.js
│ └── 📁 server
│   ├── 📁 data
│   │ └── users.json
│   ├── 📁 db
│   │ ├── 📁 actions
│   │ │ └── product.actions.js
│   │ ├── 📁 schemas
│   │ │ └── product.schema.js
│   │ └── connection.js
│   ├── 📁 routes
│   │ ├── user.routes.js
│   │ └── product.routes.js
│   ├── .env
│   └── index.js 
├── 📁 node_modules
├── .gitignore
├── package.json
├── package-lock.json
└── README.md


```

---

⚙️ Instalación

Clonar repositorio:
```

git clone https://github.com/cristianale09/Aplicaciones_Web2_TP4.git

```

Entrar al proyecto

```

cd trabajo_practico3

```

## Configuración del entorno

Antes de ejecutar el proyecto, crear un archivo `.env` en la raíz tomando como referencia el archivo `.env.example`.

Ejemplo:

```env
MONGO_URI=mongodb://localhost:27017/
JWT_SECRET=tu_clave_jwt
PORT=3001
```

Luego instalar dependencias:

```bash
npm install
```

Y ejecutar el servidor:

```bash
npm run dev
```

Instalar dependencias
```

npm install

```

---

▶️ Ejecutar el proyecto
Iniciar el servidor con:

```

node index.js

```

Servidor en:

```

http://localhost:3000

```

---


🔗 Rutas principales

```

Productos
•	/products 
•	/products/:id 
Usuarios
•	/users 
•	/login 
Las rutas pueden variar según la implementación en Express.

```

---

👨‍💻 Autor
Cristian Ale



