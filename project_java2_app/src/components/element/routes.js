import Home from "../Home/Home";
import View from "../Home/View";
import Login from "../auth/Login";
import BankAccount from "../bank/BankAccount";
import Payment from "../payment/Payment";
import PaymentHistory from "../payment/PaymentHistory";
import Register from "../auth/Register";


const routes = [

    {
        name: "Home",
        path: '/home',
        element: <Home />,
        isProtected: true
    },
    {
        name: "Bank account",
        path: '/bank-account',
        element: <BankAccount />,
        isProtected: true
    },
    {
        name: "Payment",
        path: '/bank-account/payment',
        element: <Payment />,
        isProtected: true
    },
    {
        name: "History",
        path: '/bank-account/payment/history',
        element: <PaymentHistory />,
        isProtected: true
    },
];

const guest_routes = [

    {
        name: "Login",
        path: '/login',
        element: <Login />,
    },
    {
        name: "Sign up",
        path: '/sign-up',
        element: <Register />,
    },
];

const slideBars = [
    {
        name: "Payment",
        path: '/bank-account/payment',
    },
    {
        name: "History",
        path: '/bank-account/payment/history',
    },
];

const dropdowns = [
    {
        name: "Dropdown",
        isProtected: true
    },
];

export default {
    routes : routes,
    dropdowns : dropdowns,
    slideBars : slideBars,
    guest_routes : guest_routes
};
