import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../redux/action/action";
import Unauthorized from "../element/Unauthorized";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {notify} from "../../api/api";
import {Outlet, useNavigate} from "react-router-dom";
import axios from "axios"
import { jwtDecode } from 'jwt-decode';
import BankAccount from "../bank/BankAccount";
const Home = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();

    return (
        <div>
            {/*Array.isArray(user) && user.length === 0 <Unauthorized/>*/}
            <BankAccount/>
        </div>
    );
};

export default Home;