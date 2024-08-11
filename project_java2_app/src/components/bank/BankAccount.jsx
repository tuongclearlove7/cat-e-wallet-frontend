import React, {useEffect} from 'react';
import styles from "./BankAccount.module.css";
import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink, Route} from "react-router-dom";
import list_nav from '../element/routes';
import PaymentTable from "../payment/PaymentTable";
import {formatVNDMoney} from "../payment/functional";
import default_avatar from '../../assets/img/default_avt.png';

const BankAccount = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const authorities = user?.object?.authorities || [];
    const bank_account = useSelector((state) =>
    state.bank_account.bank_acc?.data);

    return (
        <div>
            <div className={`container mb-4 ${styles.mainContainer}`}>
                <div className="row">
                    <div className="col-lg-4 pb-5">
                        {/* Account Sidebar */}
                        <div className={`author-card pb-3 ${styles.authorCard}`}>
                            <div
                                className={`${styles.authorCardCover}`}
                                style={{
                                    backgroundImage: "url('https://luatsu247.net/wp-content/uploads/2022/05/Quy-dinh-ve-tien-dien-tu-tai-Viet-Nam.jpg')"
                                }}
                            >
                            </div>
                            <div className={`${styles.authorCardProfile}`}>
                                <div className={`${styles.authorCardAvatar}`}>
                                    <img src={default_avatar ? default_avatar : ''}
                                        alt="Daniel Adams"
                                    />
                                </div>
                                <div className={`${styles.authorCardDetails}`}>
                                    <h5 className={`${styles.authorCardName} text-lg`}>{user?.object.username}</h5>
                                    <span className={`${styles.authorCardPosition}`}>
                                         {authorities.map((auth, index) => (
                                             <span key={index}>{auth.authority}</span>
                                         ))}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="wizard">
                            <nav className="list-group list-group-flush">
                                <a className={`list-group-item active ${styles.listGroupItemActiveNotDisabled}`}
                                   href="#">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <i className={`fa fa-bank mr-1 text-default ${styles.mr1}`}/>
                                            <div className="d-inline-block font-weight-medium text-uppercase">
                                                {bank_account?.code ? bank_account?.code : 'None'}
                                            </div>
                                        </div>
                                        <span className="badge badge-secondary"></span>
                                    </div>
                                </a>

                                <Link to={"/"} className={`list-group-item ${styles.listGroupItem}`}
                                   target="__blank">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <i className={`fa fa-money mr-1 text-success ${styles.mr1}`}/>
                                            <div className="d-inline-block font-weight-medium text-uppercase">
                                                {bank_account?.amount ?
                                                formatVNDMoney(bank_account?.amount) :
                                                formatVNDMoney(0) }
                                            </div>
                                        </div>
                                        <span className="badge badge-secondary">3</span>
                                    </div>
                                </Link>

                                <Link to={"/"} className={`list-group-item ${styles.listGroupItem}`}
                                      target="__blank">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <i className={bank_account?.status === 'isACTIVE' ? `fa fa-circle mr-1 text-success ${styles.mr1}` : `fa fa-circle mr-1 text-danger ${styles.mr1}`}/>
                                            <div className="d-inline-block font-weight-medium">
                                                {bank_account?.status ? bank_account?.status : 'NOT ACTIVE'}
                                            </div>
                                        </div>
                                        <span className="badge badge-secondary">3</span>
                                    </div>
                                </Link>

                                {list_nav.slideBars.map((route, index) =>
                                    <Link key={index} to={route.path} className={`list-group-item ${styles.listGroupItem}`}
                                          target="__blank">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <i className={`text-success fa fa-arrow-circle-o-right ${styles.mr1}`}/>
                                                <div className="d-inline-block font-weight-medium">
                                                    {" "+route.name}
                                                </div>
                                            </div>
                                            <span className="badge badge-secondary">3</span>
                                        </div>
                                    </Link>
                                )}
                        </nav>
                    </div>
                </div>
                {/* Orders Table */}
                    <div className="col-lg-8 pb-5">
                        <PaymentTable/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BankAccount;