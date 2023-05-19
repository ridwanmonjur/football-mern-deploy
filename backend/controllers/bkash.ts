import * as fs from 'fs';
import * as path from 'path';
import NewMailer from '../service/Mail';
import Bkash from '../service/Bkash';
console.log("hit")
const bkashService = new Bkash();

const mailService = new NewMailer();

const { frontend } = process.env

export const createPayment = async (req, res) => {
    console.log({bkashService, body: req.body})
    try {
        const createAgreement = await bkashService.createAgreement({
            // moved the other parameters into the bkash.createAgreement as DEFAULT ARGUMENTS 
            // that are not related to req.body
            // e.g. mode="0000"
            payerReference: req.body.phone,
            email: req.body.email,
            totalPrice: req.body.totalPrice,
        });
        if (createAgreement.statusCode === "0000" && createAgreement.statusMessage === "Successful") {
            console.log({ createAgreement })
            res.status(200).send(createAgreement);
        }
        else {
            res.status(400).send({ error: createAgreement.statusMessage });
        }
    } catch (error) {
        res.status(500).send('something went wrong');
    }
};


export const executePayment = async (req, res) => {
    console.log({bkashService})
    const executeAgreement = await bkashService.executeAgreement(
        {
            paymentID: req.query.paymentID
        });
    // console.log({executeAgreement})
    if (Number(executeAgreement.statusCode) !== 2054) {
        const crtPayment = await bkashService.createPayment({
            payerReference: req.query.payerReference,
            amount: req.query.amount,
            agreementID: executeAgreement.agreementID,
            callbackURL: 'http://localhost:8000/api/bkash/status/?email=' + req.query.email,
            mode: "0001",
            merchantAssociationInfo: "MI05MID54RF09123456One",
            currency: "BDT",
            intent: "sale",
            merchantInvoiceNumber: "Inv0124",
        });
        // console.log({crtPayment})

        return await res.redirect(crtPayment.bkashURL);
    }
    else await res.redirect(frontend + '/?buy=fail');

};

export const status = async (req, res) => {
    console.log({bkashService})

    let executePay = await bkashService.executePayment({ paymentID: req.query.paymentID });
    console.log({ executePay })

    // Send a Confirmation Email
    if (executePay.statusCode === '0000') {
        const mail2 = await mailService.sendMail({
            receiver: req.query.email,
            subject: 'Coding test from mjrrdnasm@gmail.com',
            body: fs.readFileSync(path.resolve(__dirname, 'templates', 'emailTemplate.html')),
            type: 'html'
        });
        console.log({ mail2 });
        let email = req.query.email;
        res.redirect(frontend + '?buy=success&email=' + email);
    }
    else await res.redirect(frontend + '/?buy=fail');
};
