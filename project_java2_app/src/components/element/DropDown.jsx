import React from 'react';
import {NavLink} from "react-router-dom";
import list_nav from "./routes";
import {useSelector} from "react-redux";

const DropDown = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    return (
        <>
            <li className="nav-item dropdown">
                <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Dropdown
                </a>
                <ul className="dropdown-menu">
                    {list_nav?.admin_routes.map((route, index) => {
                        if (route.isProtected && !user) return null;
                        return (
                            <span key={index} >
                                <li>
                                    <NavLink className="dropdown-item" aria-current="page" to={route.path}>
                                        {route.name}
                                    </NavLink>
                                </li>
                            </span>
                        );
                    })}
                    <li>
                        <a className="dropdown-item" href="#">
                            Something else here
                        </a>
                    </li>
                </ul>
            </li>
        </>
    );
};

export default DropDown;