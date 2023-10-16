const mongoose = require('mongoose')

const schema = mongoose.Schema
const leadSchema = new schema({
    id: schema.Types.ObjectId,
    asmId: {
        type: mongoose.Types.ObjectId
    },
    soId: {
        type: mongoose.Types.ObjectId
    },
    asoId: {
        type: mongoose.Types.ObjectId
    },
    foId: {
        type: mongoose.Types.ObjectId
    },
    asmName: {
        type:String
    },
    soName: {
        type:String
    },
    asoName: {
        type:String
    },
    foName: {
        type:String
    },
    isLeadCustomer:{
    type: Boolean,
        default:true
    },
    orderIds:Array,
    isMapped: {
        type: Boolean,
        default:false
    },
    isDistributed: {
        type: Boolean,
        default:false
    },
    stoveId: {
        type:String
    },
    distributionDate:{
        type:Date
    },
    project:{
        type:String
    },
    userId: {
        type: mongoose.Types.ObjectId
    },
    customerId: {
        type: String
    },
    customerName: {
        type:String
    },
    customerPhoneNo: {
        type:String
    },
    dob:{
        type:Date
    },
    gender: {
        type:String
    },
    branchName: {
        type:String
    },
    memberId: {
        type:String
    },
    groupId: {
        type:String
    },
    uniqueId: {
        type:String
    },
    spName: {
        type:String
    },
    spContact: {
        type:String
    },
    fsName: {
        type:String
    },
    idCardNo: {
        type:String
    },
    idCardType: {
        type:String
    },
    hasIdCardScanned: {
        type: Boolean,
        default:false
    },
    leadDate: {
        type:Date
    },
    leadUpdateDate:{
        type:Date
    },
    consigneeSignPhoto: {
        type:String
    },
    consigneeIdCardPhoto: {
        type:String
    },
    consigneeIdCardBackPhoto: {
        type:String
    },
    orderStatus: {
        type:String
    },
    geoLocation: {
        type: Object
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    createdBy:{
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    verifiedBy:{
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    isVerifiedAadhar:{
        type: Boolean
    },
    modifiedBy:  {
        type: Object
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
    isVerifiedLead: {
        type: Boolean,
        default:false
    },
    remarks: {
        type:String
    },
    photoRemarks: {
        type:Object
    },
    addressSameAsIdCard: {
        type:Boolean
    },
    consigneeIdCardPhoto: {
        type: String
    },
    consigneeSignPhoto: {
        type: String
    },
    consigneeIdCardBackPhoto: {
        type:String
    },
    address1: {
        type:String
    },
    address: {
      type:String  
    },
    pinCode: {
        type:String
    },
    village: {
        type:String
    },
    district: {
        type:String
    },
    state: {
        type:String
    },
    city: {
        type:String
    },
    circleName: {
        type:String
    },
    spArea: {
        type:String
    },
    taluka: {
        type:String
    },
    idCardAddress: {
        type:Object
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
    photoVerifiedBy: {
        _id: schema.Types.ObjectId,
        name:String
    },
    customerUpdatedBy: {
        _id: schema.Types.ObjectId,
        name:String
    },
    isEncrypted: {
        type: Boolean,
        default:true
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    updatedBy:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }

});

module.exports = mongoose.model('leads', leadSchema)