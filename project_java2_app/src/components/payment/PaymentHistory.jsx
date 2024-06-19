import React, {useEffect} from 'react';
import styles from "./Payment.module.css";
import PaymentTable from "./PaymentTable";

const PaymentHistory = () => {

    return <div className={styles.distance_paymentHistoryTable_top}>
            <PaymentTable/>
    </div>;
};

export default PaymentHistory;