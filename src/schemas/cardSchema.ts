import joi from "joi";

export const cardSchema = joi.object({
    title: joi.string().required(),
    cardNumber: joi.string().pattern(new RegExp('^[0-9]{16}$')).required(),
    cardHolderName: joi.string().required(),
    securityCode: joi.string().pattern(new RegExp('^[0-9]{3,4}$')).required(),
    expirationDate: joi.string().pattern(new RegExp('^(0[1-9]|1[0-2])\/?([0-9]{2})$')).required(),
    password: joi.string().required(),
    isVirtual: joi.bool().required(),
    type: joi.string().valid('Credit', 'Debit', 'Credit/Debit').required()
})
