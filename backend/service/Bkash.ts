import fetch from "../helper/httpCall";

class Bkash {
    sandbox = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout';
    live = 'https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout';
    password: any;
    username: any;
    appKey: any;
    appSecret: any;
    baseUrl: string;
    token?: any;
    tokenType?: any;
    accessToken?: any;
    agreementID?: any;
    trxID?: any;
  
    constructor() {
    const { username, password, appKey, appSecret, isSandbox } = process.env
      this.username = username;
      this.password = password;
      this.appKey = appKey;
      this.appSecret = appSecret;
      this.baseUrl = isSandbox==="true" ? this.sandbox : this.live;
      this.init();
    }
  
    async init() {
      const o = await this.grantToken();
      console.log({
        o, username: this.username, password: this.password, appKey: this.appKey, 
        appSecret: this.appSecret, baseUrl: this.baseUrl 
      })
      return o;
    }
  
    async grantToken() {
      try {
        let url = this.baseUrl + '/token/grant';
        let headers = {
          username: this.username,
          password: this.password,
        };
  
        let data = {
          app_key: this.appKey,
          app_secret: this.appSecret,
        };
  
        let res = await fetch({
          method: 'POST',
          url, headers, data
        });
  
        if (res?.statusCode === '0000') {
          this.token = res?.id_token;
          this.tokenType = res?.token_type;
          this.accessToken = res?.access_token;
        }
  
        return res;
      } catch (e) {
        throw new Error(e.message);
      }
    }
  
    async createAgreement({ mode = '0000', payerReference = '', email = '', totalPrice = 0 }) {
      try {
        let url = this.baseUrl + '/create';
        let data = {
          mode,
          payerReference,
          callbackURL: 'http://localhost:8000/api/bkash/execute/?email=' + email + '&amount=' + totalPrice
            + '&payerReference=' + payerReference,
        };
        let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
        console.log({url, data, headers})
        return await fetch({ method: 'POST', url, headers, data });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  
    async executeAgreement({ paymentID = '' }) {
      console.log({ paymentID })
      try {
        let url = this.baseUrl + '/execute';
        let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
        return await fetch({ method: 'POST', url, headers, data: { paymentID } });
      } catch (error) {
        throw new Error(error.message);
      }
    }
    async agreementStatus() {
      try {
        let url = this.baseUrl + '/agreement/status';
        let data = { agreementID: this.agreementID };
        let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
        return await fetch({ method: 'POST', url, headers, data });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  
    async createPayment({
      mode,
      amount,
      merchantAssociationInfo,
      currency,
      intent ,
      merchantInvoiceNumber ,
      agreementID,
      payerReference,
      callbackURL
    }) {
      try {
        let url = this.baseUrl + '/create';
        let data = {
          mode,
          payerReference,
          merchantAssociationInfo,
          amount,
          currency,
          agreementID,
          intent,
          merchantInvoiceNumber,
          callbackURL
        };
        let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
        return await fetch({ method: 'POST', url, headers, data });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  
    async executePayment({ paymentID }) {
      try {
        let url = this.baseUrl + '/execute';
        let data = { paymentID };
        let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
        return await fetch({ method: 'POST', url, headers, data });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  
    async queryPayment(paymentID) {
      try {
        let url = this.baseUrl + '/payment/status';
        let data = { paymentID };
        let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
        return await fetch({ method: 'POST', url, headers, data });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  
    async paymentStatus(paymentID) {
      try {
        let url = this.baseUrl + '/payment/status';
        let data = { paymentID };
        let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
        return await fetch({ method: 'POST', url, headers, data });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  
    async searchTransaction(trxID) {
      try {
        let url = this.baseUrl + '/general/searchTransaction';
        let data = { trxID };
        let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
        return await fetch({ method: 'POST', url, headers, data });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  
    async searchTransactionDetails() {
      try {
        let url = this.baseUrl + '/general/searchTransaction';
        let headers = {
          Authorization: this.token,
          'X-APP-Key': this.appKey,
        };
        let data = { trxID: this.trxID };
        return await fetch({ method: 'POST', url, headers, data });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
  
  export default Bkash;