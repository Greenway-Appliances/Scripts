const mongoose = require('mongoose')

const schema = mongoose.Schema
const orderSchema = new schema({
    id: schema.Types.ObjectId,
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    customerName: {
        type: String
    },
    customerPhoneNo: {
        type: String
    },
    customerId: {
        type: schema.Types.ObjectId,
        ref: 'customer'
    },
    fund: {
        type: schema.Types.ObjectId,
        ref: 'fund'
    },
    fundArray: {
        type: [schema.Types.ObjectId],
        ref: 'fund'
    },
    user:  {
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    batchNo: {
        type: String
    },
    partnerName: {
        type: String
    },
    partnerBatchNo: {
        type: String
    },
    branchCode: {
        type: String
    },
    branchName: {
        type: String
    },
    productCode: {
        type: String
    },
    qty: {
        type: String
    },
    circleName: {
        type: String
    },
    spArea: {
        type: String
    },
    spName: {
        type: String
    },
    spPhoneNo: {
        type: String
    },
    ocNumber: {
        type: String
    },
    ocAddress: {
        type: String
    },
    ocDate: {
        type: Date
    },
    assignedTo: {
        type: Object
    },
    taluk: {
        type: String
    },
    district: {
        type: String
    },
    orderReceivedDate: {
        type: Date
    },
    tags: {
        type: [String]
    },
    orderStatus: {
        type: String,
        default: 'New Order'
    },
    ewayBillNo: {
        type: String  
    },
    dispatchDate: {
        type: Date
    },
    dispatchTrackingNumber: {
        type: String
    },
    transportPartner: {
        type: String
    },
    dispatchVehicleType: {
        type: String
    },
    dispatchVehicleNumber: {
        type: String
    },
    dispatchDriverName: {
        type: String
    },
    dispatchDriverPhoneNo: {
        type: String
    },
    deliveryChallanNo: {
        type: String
    },
    deliveryCost: {
        type: String
    },
    invoiceId: {
        type: String
    },
    sOName: {
        type: String
    },
    asoName: {
        type: String
    },
    projectOffice: {
        type: String
    },
    UidDataDispatch: {
        type: String
    },
    stoveId: {
        type: String
    },
    stoveIds: {
        type: Array,
        default:void 0
    },
    idCardTypeCode: {
        type: String
    },
    otherIdCardType:{
        type: String  
    },
    idCardNo: {
        type: String
    },
    consigneeIdCardPhoto: {
        type: String
    },
    consigneeSignPhoto: {
        type: String
    },
    stoveIdPhoto:{
        type:String
    },
    consigneePhoto: {
        type: String
    },
    distributionDate: {
        type: Date
    },
    customerGPSLoc: {
        type: String
    },
    primaryDeliveryDate: {
        type: String
    },
    secondaryDeliveryDate:{
        type:String
    },
    secondaryDelivery:{
        type:String
    },
    finalDeliveryDate:{
        type:String
    },
    finalDeliver:{
        type:String
    },
    finalDelivery:{
        type:String
    },
    customerDelivery:{
        type:String
    },
    month:{
        type:String
    },
    remarks:{
        type: Array
    },
    syncTime:{
        type:Date
    },
    updatedAt:{
        type: Date,
    },
    loanId: {
        type: String
    },
    loanAmount: {
        type: String
    },
    logOrder: [
        {
            logId: {
                type: schema.Types.ObjectId,
                ref: 'logOrders'
            },
            logOperationType: {
                type: String
            }
        }
    ],
    isOrderDeleted: {
        type: Boolean,
        default: false
    },
    graNumber: {
        type: String
    },
    isGraGenerated: {
        type: Boolean,
        default: false
    },
    graDate: {
        type: Date
    },
    isSpDistribution: {
        type: Boolean,
        default: false
    },
    spDistributionId: {
        type: schema.Types.ObjectId,
        ref: 'spDistribution'
    },
    comment: {
        type: String
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    isDistributed: {
        type: Boolean,
        required: true,
        default: false
    },
    maskedConsigneeIdCardPhoto: {
        type: String
    },
    maskedConsigneeSignPhoto: {
        type: String
    },
    maskedStoveIdPhoto:{
        type:String
    },
    maskedConsigneePhoto: {
        type: String
    },
    pickedStoveQuantity: {
        type: String
    },
    photoVehicleWithStove: {
        type: String
    },
    graAcknowledgementSignature: {
        type: String
    },
    invoiceSerial: {
        type: String
    },
    invoiceDate:{
        type:Date
    },
    customerDistributionDate:{
        type: Date
    },
    spDistributionDate:{
        type: Date
    },
    distributionUpdateDate:{
        type: Date
    },
    deliverySameAsBuyer:{
        type: Boolean
    },
    deliveryAddress:{
        address: String,
        city: String,
        state: String,
        pinCode: String,
        country: String
    },
    buyerId:{
        type: schema.Types.ObjectId,
        ref: 'partner'
    },
    supplierId:{
        type: schema.Types.ObjectId,
        ref: 'supplier'
    },
    ocSerial:{
        type:String
    },
    taxDetail:{
        taxableAmount: schema.Types.Decimal128,
        CGST:{
            percentage: schema.Types.Decimal128,
            amount: schema.Types.Decimal128
        },
        SGST:{
            percentage: schema.Types.Decimal128,
            amount: schema.Types.Decimal128
        },
        IGST:{
            percentage: schema.Types.Decimal128,
            amount: schema.Types.Decimal128
        }
    },
    invoicePdf:{
        type: String
    },
    createdBy:{
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    rawOrderFileUrl:{
        type: String
    },
    hasStoveScanned:{
        type: Boolean
    },
    isVerifiedStove:{
        type: Boolean
    },
    verifiedBy:{
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    stoveVerifiedDate:{
        type: Date
    },
    hasIdCardScanned:{
        type: Boolean
    },
    isVerifiedAadhar:{
        type: Boolean
    },
    aadharverifiedBy:{
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    aadharVerifiedDate:{
        type: Date
    },
    modifiedBy:  {
        type: Object
    },
    geoLocation:  {
        type: Object
    },
    carbonPdf:{
        type: String
    },
    isInTransitDamageReplacement:{
        type: String
    },
    isWarrantyReplacement:{
        type: String
    },
    oldStoveId: {
        type: String
    },
    oldDistributionDate: {
        type: Date
    },
    creditNoteId: {
        type: String
    },
    creditNoteSerial: {
        type: String
    },
    creditNoteDate:{
        type:Date
    },
    creditNotePdf:{
        type:String
    },
    isVerifiedIdCard: {
        type: Boolean
    },
    isVerifiedCustomerSign: {
        type: Boolean
    },
    isVerifiedCustomerPhoto: {
        type: Boolean
    },
    isVerifiedGRASign: {
        type: Boolean
    },
    isVerifiedVehicleWithStove: {
        type: Boolean
    },
    photoRemarks: {
        type:Object
    },
    addressSameAsIdCard: {
        type:Boolean
    },
    consigneeIdCardBackPhoto: {
        type:String
    },
    idCardAddress: {
        line1: String,
        state:String,
        district:String,
        pincode:String
    },
    originalIdFrontPhoto:{
        type:String
    },
    originalIdBackPhoto: {
        type:String
    },
    aadhaarAddress: {
        type:Object
    },
    ocrDetails: {
        type:Object
    },
    maskedIdCardNo: {
        type:Object
    },
    responseReportDetail: {
        isSent: Boolean,
        message: String,
        sentDate: Date
    },
    photoVerifiedBy: {
        _id: schema.Types.ObjectId,
        name:String
    },
    customerUpdatedBy: {
        _id: schema.Types.ObjectId,
        name:String
    },
    isUploading: {
        type:Boolean
    },
    isEncrypted: {
        type: Boolean,
        default:true
    },
    ocCreationEmailDetail: {
        type:Object
    },
    isEwaybillTriggered: {
        type: Boolean
    },
    ewayBillsLog: [
        {
            _id: schema.Types.ObjectId,
            status: String,
            ewaybillDocId: {
                type: schema.Types.ObjectId,
                ref: 'ewayBills'
            },
            requestType:String,  //new field added
            referenceId:String   //new field added
        }
    ]

})

module.exports = mongoose.model('orders_dump23', orderSchema)