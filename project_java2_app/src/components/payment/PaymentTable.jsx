import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from "./Payment.module.css";
import loading from "../../assets/img/loading_dark.gif";
import {activeBankAccount, fetchBankAccount} from "./fetch";
import {getBankAccountUserSuccess} from "../../redux/action/bank_account_action";
import {formatVNDMoney} from "./functional";

const PaymentTable = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const bank_account = useSelector((state) =>
    state.bank_account.bank_acc?.data);
    const [show, setShow] = useState(false);

    const handleActiveBankAccount  = async () => {
        setShow(true);
        if(user?.accessToken){
            await new Promise(resolve => setTimeout(resolve, 2500));
            await activeBankAccount(user?.accessToken, dispatch);
            setShow(false);
        }
    }
    useEffect(() => {
        if(user?.accessToken){
            fetchBankAccount(user?.accessToken, dispatch).then();
        }
    }, []);

    useEffect(() => {
        return () => {
            dispatch(getBankAccountUserSuccess(null));
        }
    }, [dispatch]);

    return (
        <div>
            {bank_account && bank_account?.payments ?
                <div>
                    <div className="d-flex justify-content-start pb-3">
                        <div className="form-inline">
                            <h2 className="text-muted mr-3" htmlFor="order-sort">
                                PAYMENT HISTORY
                            </h2>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                            <tr>
                                <th>Payment ID</th>
                                <th>User bank code</th>
                                <th>Start time</th>
                                <th>Deposit amount</th>
                                <th>Payment content</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bank_account?.payments && bank_account?.payments.map((item, index) =>
                                <tr key={index}>
                                    <td>
                                        {item?.id}
                                    </td>
                                    <td>
                                        {item?.user_bank_code}
                                    </td>
                                    <td>
                                        {item?.start_time}
                                    </td>
                                    <td>
                                        {formatVNDMoney(item?.deposit_amount)}
                                    </td>
                                    <td>
                                        {item?.payment_content}
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div> :
                <div>
                    {!show &&
                        <div>
                            <h1>
                                ACTIVATE ACCOUNT E-WALLET, PLEASE!
                            </h1>
                            <img className={`${styles.loading} ${styles.distance_padding_bottom_20}`}
                                 src={loading ? loading : 'No image'}
                                 alt={loading ? loading : 'No image'}
                            />
                        </div>
                    }
                    {show &&
                        <img className={`${styles.loading}`}
                             src={loading ? loading : 'No image'}
                             alt={loading ? loading : 'No image'}
                        />}
                    <div>
                        <div className={`${styles.padding_top_10px}`}>
                            <button onClick={handleActiveBankAccount}
                                    className={`btn btn-success`}>
                                ACTIVATE ACCOUNT E-WALLET
                            </button>
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default PaymentTable;