import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getPaymentTokenFailed,
    getPaymentTokenStart,
    getPaymentTokenSuccess,
    getTokenGenSuccess
} from "../../redux/action/bank_account_action";
import {fetchPaymentToken} from "./fetch";
import {getApi} from "../../api/api";
import {get} from "axios";

const GeneratePaymentToken = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const payment_content_token = useSelector((state) =>
    state.bank_account.generate_payment_token?.data);
    const get_payment_token = useSelector((state) =>
    state.bank_account.payment_token?.data);

    useEffect(() => {
        if(user?.accessToken){
            fetchPaymentToken(user?.accessToken ,dispatch).then();
        }
    }, []);

    useEffect(() => {

        return () => {
            dispatch(getTokenGenSuccess(null));
        };
    }, [dispatch]);

    useEffect(() => {

        return () => {
            dispatch(getPaymentTokenSuccess(null));
        };
    }, [dispatch]);

    return (
        <div>
            <li className="checkout-item">
                <div className="avatar checkout-icon p-1">
                    <div className="avatar-title rounded-circle bg-primary">
                        <i className="bx bxs-wallet-alt text-white font-size-20"/>
                    </div>
                </div>
                <div className="feed-item-list">
                    <div>
                        <h5 className="font-size-14 mb-3">Payment content :</h5>
                        <b>{`${payment_content_token?.message !== undefined ?
                               payment_content_token?.message :
                                payment_content_token?.data?.message ?
                                payment_content_token?.data?.message  : 
                                get_payment_token?.payment_token ? 
                                'Use this token to payment'
                                : 'Click button to create payment token!'
                            }`}</b>
                        <div className="col-lg-12 col-sm-6 mt-4">
                            <div data-bs-toggle="collapse">
                                <label className="card-radio-label">
                                    <input type="radio"
                                        name="pay-method"
                                        id="pay-methodoption1"
                                        className="card-radio-input"
                                    />
                                    <span className="card-radio py-3 text-center text-truncate">
                                            <i className="bx bx-credit-card d-block h2 mb-3"/>
                                        <h5 className="mt-2 text-success">
                                            {get_payment_token?.payment_token ?
                                             `${get_payment_token?.payment_token}` :
                                            <span className="text-danger">{'None'}</span>}
                                        </h5>
                                  </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    );
};

export default GeneratePaymentToken;