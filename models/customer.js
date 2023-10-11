const mongoose = require('mongoose')

const schema = mongoose.Schema

const customerSchema = new schema({
    id: schema.Types.ObjectId,
    customerId: {
        type: String,
        required: true,
        unique: true
    },
    orders: {
        type: [schema.Types.ObjectId], 
        ref: 'order'
    },
    customerName: {
        type: String
    },
    groupId: {
        type: String
    },
    groupName: {
        type: String
    },
    memberId: {
        type: String
    },
    gender: {
        type: String
    },
    customerPhoneNo: {
        type: String
    },
    customerPhoneNo2: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    city: {
        type: String
    },
    pinCode: {
        type: String
    },
    loanId: {
        type: String
    },
    loanAmount: {
        type: String
    },
    customerIdCardType: {
        type: String
    },
    customerIdCardNo: {
        type: String
    },
    customerGPSLoc: {
        type: String
    },
    isEncrypted: {
        type: Boolean,
        default:true
    },
    isDetailMoved: {
        type:Boolean
    }
})

// customerSchema.path('loanId').validate(async (loanId) => {
//     const orderCount = await mongoose.models.customer.countDocuments({loanId})
//     return !orderCount
// }, 'Duplicate')

module.exports = mongoose.model('customers_dump23', customerSchema)