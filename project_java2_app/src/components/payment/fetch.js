import {getBankAccount} from "../../redux/action/action";
import {
    getPaymentTokenFailed,
    getPaymentTokenStart,
    getPaymentTokenSuccess
} from "../../redux/action/bank_account_action";
import {getApi, notify_error, notify_success} from "../../api/api";

export const activeBankAccount = async (token, dispatch) =>{
    try {
        if (token) {
            await getApi("/api/user/active_bank_account",token)
            .then(async ()=>{
                await fetchBankAccount(token, dispatch);
                notify_success("Active E-Wallet account successfully",2000)
            })
            .catch(error=>console.error(error));
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

export const fetchBankAccount = async (token, dispatch) => {
    try {
        if (token) {
            await getBankAccount(token, dispatch);
        }
    } catch (error) {
        notify_error("Error fetching user data: ", error, 2000);
        console.error("Error fetching user data: ", error);
    }
};

export const  fetchPaymentToken = async (token, dispatch)=>{
    dispatch(getPaymentTokenStart());
    try{
        if(token){
            await getApi("/api/user/get_payment_token",token).then(
                res=>{
                    dispatch(getPaymentTokenSuccess(res));
                }
            ).catch(error=>{
                dispatch(getPaymentTokenFailed({
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    data: error.response?.data,
                }));
            });
        }
    }catch (error) {
        dispatch(getPaymentTokenFailed({
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
        }));
    }
}