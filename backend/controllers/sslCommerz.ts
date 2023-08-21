import { paymentInitDataProcess } from "../helper/paymentInitDataProcess";
import { httpCall } from "../helper/httpCall";
import { Request, Response, NextFunction } from 'express';
import { User } from "../models/User";
const ObjectID = require("mongodb").ObjectID;
import { ObjectId } from 'mongoose';

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

    constructor(live = false) {
        this.baseURL = `https://${live ? 'securepay' : 'sandbox'}.sslcommerz.com`;
        this.initURL = this.baseURL + '/gwprocess/v4/api.php';
        this.validationURL = this.baseURL + '/validator/api/validationserverAPI.php?';
        this.refundURL = this.baseURL + '/validator/api/merchantTransIDvalidationAPI.php?';
        this.refundQueryURL = this.baseURL + '/validator/api/merchantTransIDvalidationAPI.php?';
        this.transactionQueryBySessionIdURL = this.baseURL + '/validator/api/merchantTransIDvalidationAPI.php?';
        this.transactionQueryByTransactionIdURL = this.baseURL + '/validator/api/merchantTransIDvalidationAPI.php?';
        this.store_id = process.env.sslCommerzStoreId;
        this.store_passwd = process.env.sslCommerzStorePassword;
        console.log({ store_id: this.store_id, store_passwd: this.store_passwd })
        this.init = this.init.bind(this);
        this.validate = this.validate.bind(this);
        this.transactionQueryByTransactionId = this.transactionQueryByTransactionId.bind(this);
    }

    // router.post("/user:userId:/init/", SslCommerzPayment.init);
    init(req: Request, res: Response, next: NextFunction) {
        let userId: undefined | ObjectId;
        try {
            userId = ObjectID(req.userID);
            req.body.store_id = this.store_id;
            req.body.store_passwd = this.store_passwd;
            req.body.user = User.findById(userId).select("name email address creditCard");
            // name: string
            // email: string
            // password: string,
            // role: string,
            // address: AddressInterface,
            // creditCard: CreditCardInterface,
            // token: TokenInterface,
            // image: string
            // return httpCall({ url: url ?? this.initURL, method: req.method || "POST", data: paymentInitDataProcess(data) });
            return httpCall({ url: this.initURL, method: req.method || "POST", data: paymentInitDataProcess(req.body) });
        }
        catch (err) {
            throw new Error(err);
        }
    }

    // router.post("/validate/:valId", SslCommerzPayment.validate);
    validate(req: Request, res: Response, next: NextFunction) {
        return httpCall({
            url: this.validationURL + `val_id=${req.params.val_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
            method: req.method || "GET",
        });
    }

    // router.post("/transaction/:transactionId", SslCommerzPayment.transactionQueryByTransactionId);
    transactionQueryByTransactionId(req: Request, res: Response, next: NextFunction) {
        return httpCall({
            url: this.transactionQueryByTransactionIdURL + `tran_id=${req.params.tran_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`,
            method: req.method || "GET",
        });
    }
}


module.exports = SslCommerzPayment;


