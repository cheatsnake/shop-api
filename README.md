# :convenience_store: Shop API

A simple REST API for creating awesome online shops.

## :rocket: Launching server
1. Install packages from npm:
```sh
npm install
```

2. Create `.env` file with data to connect to the PostgreSQL:
```js
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=root
TYPEORM_HOST=localhost
TYPEORM_PORT=5432
TYPEORM_DATABASE=shop-api
JWT_SECRET=SomeSecretKey
```

3. Create production build & run server:
```sh
npm run build
```

```sh
npm start
```

Or launch server in develepment mode with nodemon:
```sh
npm run dev
```

> Base server url: http://localhost:5000

## 📌 End-points
### :busts_in_silhouette: Registration

Auth for users. 

| Method | End-Point | Description |
| --- | --- | --- |
| `POST` | `/api/register` | Create a new user |
| `POST` | `/api/login` | Login to user account |
| `GET` | `/api/verify` | Verify JWT token and create a new one |

> By default all new accounts has a `client` role. To get administrator rights, you need to change the role field to `admin` in the database.

### :label: Categories

Categories for products.

| Method | End-Point | Description |
| --- | --- | --- |
| `POST` | `/api/category` | Create a new category _(*For admins)_ |
| `GET` | `/api/category` | List of all categories |

### :package: Products

CRUD opeations with products.

| Method | End-Point | Description |
| --- | --- | --- |
| `POST` | `/api/product` | Create a new product _(*For admins)_ |
| `GET` | `/api/products` | List of all products |
| `GET` | `/api/products/:category` | List of all products by category|
| `GET` | `/api/product/:id` | Get a product by id |
| `PUT` | `/api/product` | Update a product _(*For admins)_ |
| `DELETE` | `/api/product/:id` | Delete a product by id _(*For admins)_ |

### :shopping_cart: User cart

Operations with the shopping cart.

| Method | End-Point | Description |
| --- | --- | --- |
| `GET` | `/api/cart/add/:productId?amount=1` | Add a product to user cart _(*For authorized)_ |
| `GET` | `/api/cart` | Get user cart _(*For authorized)_ |

