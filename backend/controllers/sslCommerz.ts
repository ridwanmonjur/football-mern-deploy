import { paymentInitDataProcess } from "../helper/paymentInitDataProcess";
import { httpCall } from "../helper/httpCall";
console.log({ paymentInitDataProcess, httpCall })

class SslCommerzPayment {
    baseURL: string;
    initURL: string;
    validationURL: string;
    refundURL: string;
    refundQueryURL: string;
    store_id: any;
    transactionQueryBySessionIdURL: string;
    transactionQueryByTransactionIdURL: string;
    store_passwd: any;

    constructor(store_id, store_passwd, live = false) {
        this.baseURL = `https://${live ? 'securepay' : 'sandbox'}.sslcommerz.com`;
        this.initURL = this.baseURL + '/gwprocess/v4/api.php';
        this.validationURL = this.baseURL + '/validator/api/validationserverAPI.php?';
        this.refundURL = this.baseURL + '/validator/api/merchantTransIDvalidationAPI.php?';
        this.refundQueryURL = this.baseURL + '/validator/api/merchantTransIDvalidationAPI.php?';
        this.transactionQueryBySessionIdURL = this.baseURL + '/validator/api/merchantTransIDvalidationAPI.php?';
        this.transactionQueryByTransactionIdURL = this.baseURL + '/validator/api/merchantTransIDvalidationAPI.php?';
        this.store_id = store_id;
        this.store_passwd = store_passwd;
    }

    init(data, url = false, method = "POST") {
        data.store_id = this.store_id;
        data.store_passwd = this.store_passwd;
        return httpCall({ url: url ?? this.initURL, method: method || "POST", data: paymentInitDataProcess(data) });
    }

    validate(data, url = false, method = "GET") {
        return httpCall({
            url: url ?? this.validationURL + `val_id=${data.val_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
            method: method || "GET",
        });
    }

    transactionQueryByTransactionId(data, url = false, method = "GET") {
        return httpCall({
            url: url ?? this.transactionQueryByTransactionIdURL + `tran_id=${data.tran_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
            method: method || "GET",
            data
        });
    }
}


module.exports = SslCommerzPayment;


