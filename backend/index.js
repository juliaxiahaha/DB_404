import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
// import fs from 'fs';
import homeRoutes from './routes/home.js';
import orderRoutes from './routes/order.js';
import discountRoutes from './routes/discount.js';
import deleteCustomer from './routes/CustomerPageEP.js';
import updateCustomer from './routes/CustomerDetailPageEP.js';
import insertCustomer from './routes/CustomerPageEP.js';
import sorterRoutes from './routes/sorter.js';
import deleteEmployee from './routes/EmployeePageEP.js';
import deleteShipping from './routes/deleteShipping.js';
import deleteOrder          from './routes/OrderPageEP.js';
import deleteOrderDetail    from './routes/deleteOrderDetail.js';
import deleteShoppingCart   from './routes/deleteShoppingCart.js';
import deleteSupplier    from './routes/SupplierPageEP.js';
import insertSupplier  from './routes/SupplierPageEP.js';
import insertProduct    from './routes/ProductPageEP.js';
import insertEmployee        from './routes/EmployeePageEP.js';
import insertShipping      from './routes/insertShipping.js';
import insertOrder       from './routes/OrderPageEP.js';
import insertOrderDetail from './routes/insertOrderDetail.js';
import insertShoppingCart from './routes/insertShoppingCart.js';
import searchBy             from './routes/searchBy.js';
import updateSupplier from './routes/SupplierPageEP.js';
import updateProduct    from './routes/ProductDetailPageEP.js';
import updateOrder       from './routes/updateOrder.js';
import updateOrderDetail from './routes/updateOrderDetail.js';
import updateShoppingCart from './routes/updateShoppingCart.js';
import updateProductReview from './routes/updateProductReview.js';
import updateShipping     from './routes/updateShipping.js';
import updateEmployee     from './routes/EmployeePageEP.js';
import getCustomers from './routes/CustomerPageEP.js';
import getEmployees       from './routes/EmployeePageEP.js';
import getOrderDetails       from './routes/OrderPageEP.js';
import getOrders          from './routes/OrderPageEP.js';
import getProducts       from './routes/ProductPageEP.js';
import getProductReviews   from './routes/getProductReviews.js';
import getShippings       from './routes/getShippings.js';
import getShoppingCarts       from './routes/getShoppingCarts.js';
import getSuppliers       from './routes/SupplierPageEP.js';
import getCustomerById from "./routes/CustomerDetailPageEP.js";
import getProductById    from './routes/ProductDetailPageEP.js';
import getSupplierByProductId  from './routes/ProductDetailPageEP.js';
import getReviewsByProductId from './routes/ProductDetailPageEP.js';
import getDiscountByProductId   from './routes/ProductDetailPageEP.js';
import getShoppingCartsByID from "./routes/CustomerDetailPageEP.js";
import register from "./routes/register.js";
import loginRoute from './routes/login.js';
import deleteProduct     from './routes/ProductPageEP.js';
import getOneOrder from './routes/getOneOrder.js';
import getOrderById from './routes/getOrderByID.js';
import getShippingById from './routes/getShippingByID.js';


const DB_HOST='db-mysql-nyc3-77807-do-user-20581125-0.l.db.ondigitalocean.com'
const DB_USER='doadmin'
const DB_NAME='store'

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// eslint-disable-next-line no-undef
if (!process.env.DB_PW) {
    console.error('Error: DB_PW environment variable is not set.');
    console.error('Please run: export DB_PW=your_database_password');
    // eslint-disable-next-line no-undef
    process.exit(1); // Exit the app to avoid accidental connection attempts
}

// Database connection
const db = mysql.createConnection({
    host: DB_HOST,
    port: 25060,
    user: DB_USER,
    // eslint-disable-next-line no-undef
    password: process.env.DB_PW,
    database: DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test route
//SELECT
//select customer
app.get('/api', (req, res) => {
    // Execute both queries in parallel using Promise.all
    const customerQuery = new Promise((resolve, reject) => {
        db.query('SELECT * FROM store.Customer', (err, c_results) => {
            if (err) {
                console.error('Error querying database for customers:', err);
                return reject({ error: 'Database query failed for customers' });
            }
            resolve(c_results);
        });
    });

    const productQuery = new Promise((resolve, reject) => {
        db.query('SELECT * FROM store.Product', (err, p_results) => {
            if (err) {
                console.error('Error querying database for products:', err);
                return reject({ error: 'Database query failed for products' });
            }
            resolve(p_results);
        });
    });

    // Use Promise.all to wait for both queries to complete
    Promise.all([customerQuery, productQuery])
        .then(([c_results, p_results]) => {
            // Send the combined results after both queries are done
            res.json({
                customers: c_results,
                products: p_results
            });
        })
        .catch((error) => {
            // If any of the queries failed, return an error response
            res.status(500).json(error);
        });
});

app.use('/home', homeRoutes(db));
app.use('/discount', discountRoutes(db));
app.use('/order', orderRoutes(db));
app.use('/api/orderDetails', getOneOrder(db));
app.use('/api/customers', insertCustomer(db));
app.use('/api/customers', deleteCustomer(db));
app.use('/api/customers', updateCustomer(db));
app.use('/api/sorter', sorterRoutes(db));
app.use('/api/employees', deleteEmployee(db));
app.use('/api/shippings', deleteShipping(db));
app.use('/api/suppliers', deleteSupplier(db));  // DELETE /api/suppliers/:id
app.use('/api/orders', deleteOrder(db));             // DELETE /api/orders/:id
app.use('/api/orderDetails', deleteOrderDetail(db)); // DELETE /api/orderDetails/:orderId/:productId
app.use('/api/orders', getOrderById(db));
app.use('/api/shoppingCarts', deleteShoppingCart(db));// DELETE /api/shoppingCarts/:customerId/:productId
app.use('/api/suppliers', insertSupplier(db));
app.use('/api/products', insertProduct(db));
app.use('/api/employees', insertEmployee(db));
app.use('/api/shippings', insertShipping(db));
app.use('/api/orders', insertOrder(db));
app.use('/api/orderDetails', insertOrderDetail(db));
app.use('/api/shoppingCarts', insertShoppingCart(db));
app.use('/api/search', searchBy(db));
app.use('/api/suppliers', updateSupplier(db));
app.use('/api/products', updateProduct(db));
app.use('/api/orders', updateOrder(db));
app.use('/api/orderDetails', updateOrderDetail(db));
app.use('/api/shoppingCarts', updateShoppingCart(db));
app.use('/api/productReviews', updateProductReview(db));
app.use('/api/shippings', updateShipping(db));
app.use('/api/employees', updateEmployee(db));
app.use('/api/customers', getCustomers(db));
app.use('/api/employees', getEmployees(db));
app.use('/api/orderDetails', getOrderDetails(db));
app.use('/api/orders', getOrders(db));
app.use('/api/products', getProducts(db));
app.use('/api/productReviews', getProductReviews(db));
app.use('/api/shippings', getShippings(db));
app.use('/api/shippings', getShippingById(db));
app.use('/api/shoppingCarts', getShoppingCarts(db));
app.use('/api/suppliers', getSuppliers(db));
app.use('/api/customers', getCustomerById(db));
app.use('/api/products', getProductById(db));
app.use('/api/suppliers', getSupplierByProductId(db));
app.use('/api/productReviews', getReviewsByProductId(db));
app.use('/api/discounts', getDiscountByProductId(db));
app.use('/api/shoppingCarts', getShoppingCartsByID(db));
app.use('/api/auth', register(db));
app.use('/api/auth', loginRoute(db));
app.use('/api/products', deleteProduct(db));
app.use('/api/orderDetails', getOneOrder(db));


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/api`);
});
