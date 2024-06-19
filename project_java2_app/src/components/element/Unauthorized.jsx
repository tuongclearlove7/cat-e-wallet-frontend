import React, {useEffect} from 'react';
import styles from "./element.module.css";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {notify} from "../../api/api";

const Unauthorized = () => {

    const navigate = useNavigate();

    const redirect = async () =>{

        navigate("/login");
    }



    return (
        <div>
            <section className={styles.page_404}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 d-flex align-items-center justify-content-center">
                            <div className="col-sm-10 col-sm-offset-1  text-center">
                                <div className={styles.four_zero_four_bg}>
                                    <h1 className="text-center ">401 Unauthorized</h1>
                                </div>
                                <div className={styles.contant_box_404}>
                                    <h3 className="h2">Look like you're lost</h3>
                                    <p>the page you are looking for not avaible!</p>
                                    <Link onClick={redirect} to="/login" className={styles.link_404}>
                                        Login please
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Unauthorized;