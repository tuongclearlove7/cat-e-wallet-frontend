import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPaymentSuccess} from "../../redux/action/bank_account_action";
import styles from "./Payment.module.css";
import loading from "../../assets/img/loading_dark.gif";
import bill_image from '../../assets/img/bill.png';
import {formatVNDMoney} from "./functional";

const Invoice = (props) => {

    const dispatch = useDispatch();
    const payment_data = useSelector((state) =>
    state.bank_account.payment?.data);

    useEffect(() => {
        return () => {
            dispatch(getPaymentSuccess(null));
        }
    }, []);

    return (
        <div className="col-xl-4">
            <div className="card checkout-order-summary">
                <div className="card-body">
                    <div className="p-3 bg-light mb-3">
                        <h5 className="font-size-16 mb-0 text-success">
                            YOUR PAYMENT INVOICE
                        </h5>
                    </div>
                    <div className="table-responsive">
                        {/*Loading payment data*/}
                        {!props?.display && <table
                            className="table table-centered mb-0 table-nowrap">
                            <thead>
                            <tr>
                                <th className="border-top-0"
                                    style={{width: 110}}
                                    scope="col">
                                    Payment image
                                </th>
                                <th className="border-top-0" scope="col">
                                    Image name
                                </th>
                                <th className="border-top-0" scope="col">
                                    Type
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td scope="row">
                                    <img
                                        src={payment_data?.user_payment?.upload?.data ?
                                            `data:${payment_data?.user_payment?.upload?.file_type};base64,
                                            ${payment_data?.user_payment?.upload?.data}` : bill_image}
                                        alt="product-img"
                                        title="product-img"
                                        className="avatar-lg rounded"
                                    />
                                </td>
                                <td>
                                    <h5 className="font-size-16 text-truncate">
                                        <a href="#" className="text-dark">
                                            {payment_data?.user_payment?.upload?.file_name  ?
                                            payment_data?.user_payment?.upload?.file_name :
                                            'None'
                                            }
                                        </a>
                                    </h5>
                                    <p className="text-muted mb-0">
                                        <i className="bx bxs-star text-warning"/>
                                        <i className="bx bxs-star text-warning"/>
                                        <i className="bx bxs-star text-warning"/>
                                        <i className="bx bxs-star text-warning"/>
                                    </p>
                                </td>
                                <td>
                                    {payment_data?.user_payment?.upload?.file_type  ?
                                    payment_data?.user_payment?.upload?.file_type :
                                    'None'
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <h6 className="font-size-14 m-0">
                                        Your bank code : {' '}
                                        {payment_data?.payment_status &&
                                        payment_data ? payment_data?.user_payment?.user_bank_code :
                                            <span>
                                               {payment_data ? " None" : " None"}
                                           </span>
                                        }
                                    </h6>
                                </td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <h6 className="font-size-14 m-0">
                                        Start time : {' '}
                                        {payment_data?.payment_status &&
                                        payment_data ? payment_data?.user_payment?.start_time :
                                            <span>
                                               {payment_data ? " None" : " None"}
                                           </span>
                                        }
                                    </h6>
                                </td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <h6 className="font-size-14 m-0">
                                        Deposit amount :
                                        {payment_data?.payment_status &&
                                        payment_data ?
                                        ` +${formatVNDMoney(payment_data?.user_payment?.deposit_amount)}` :
                                        <span>
                                           {payment_data ?
                                           ` +${formatVNDMoney(0)}` :
                                           ` +${formatVNDMoney(0)}`}
                                       </span>
                                        }
                                    </h6>
                                </td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <h6 className="font-size-14 m-0">
                                        Payment content {' '} :
                                        {payment_data?.payment_status &&
                                        payment_data ?
                                            payment_data?.user_payment?.payment_content :
                                            <span>
                                               {payment_data ? " None" : " None"}
                                           </span>
                                        }
                                    </h6>
                                </td>
                                <td>

                                </td>
                            </tr>
                            <tr className="bg-light">
                                <td colSpan={2}>
                                    <h6 className="font-size-14 m-0">
                                        Payment status: {' '}
                                        <span className="text-success">
                                           {payment_data?.payment_status &&
                                           payment_data ? payment_data?.message :
                                               <span className="text-danger">
                                                   {payment_data ? payment_data?.data?.error
                                                       : " None"}
                                               </span>
                                           }
                                        </span>
                                    </h6>
                                </td>
                                <td>

                                </td>
                            </tr>
                            </tbody>
                        </table>}

                        <div>{props?.display &&
                            <div>
                                <img src={loading ? loading : ''}
                                     alt={loading ? loading : ''}
                                     className={styles.loading_width_30_percent}
                                />
                                <br/>
                                <b className={`${styles.padding_top_10px} ${styles.margin_top_10px}`}>
                                    Handling...
                                </b>
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;