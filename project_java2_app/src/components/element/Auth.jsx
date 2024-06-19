import React, {useEffect, useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Unauthorized from "./Unauthorized";
import {getUser} from "../../redux/action/action";
import {jwtDecode} from "jwt-decode";
import {logout} from "../../redux/action/auth_action";
import logo from "../../logo.svg";

const Auth = ({children}) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            if (user?.accessToken) {
                await getUser(user.accessToken, dispatch);
            }
        } catch (error) {
            navigate("/login");
            console.error("Error fetching user data: ", error);
        }
    };

    useEffect(() => {
        fetchUser().then();
    }, []);

    if (user && user.accessToken) {
        const decodedToken = jwtDecode(user?.accessToken);
        const now = Date.now() / 1000;

        if (decodedToken.exp < now) {
            console.log("logout");
            dispatch(logout());
            return <Unauthorized />;
        } else {
            return children;
        }
    }else{
        getUser(user?.accessToken, dispatch).then();
        return <Unauthorized />;
    }
};

export default Auth;
