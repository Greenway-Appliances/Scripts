const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const keys = require("./config");
const bodyParser = require("body-parser");
const Leads = require("./models/lead");
const Customers = require("./models/customer");
const Orders = require("./models/order");

app.use(cors("*"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.listen(3000)
// mongo connection
mongoose.connect(keys.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", false);

const connection = mongoose.connection;
connection.on("error", (error) => {
  console.log("MongoDB connection error", error);
});
connection.on("open", () => {
  console.log("MongoDB connected");
});
app.get('/collectionTest', async (req,res)=>{
  let orders = await Leads.find({ memberId: { $regex: /^0/ }})
  console.log(orders);
  return res.send({
    message:"api hit",
    length: orders.length,
    data:orders,
  })
})
app.get('/cleaningLead', async (req,res)=>{
  try {

    let getBadId = await Leads.find({ memberId: { $regex: /^0/ }})
    console.log("getBadId", getBadId)
    getBadId.forEach((obj) =>{
      obj.memberId = parseFloat(obj.memberId)
    })
   let cleanedResult =  Leads.bulkWrite(
      getBadId.map((obj) => ({
          updateOne: {
              filter: { _id: obj._id },
              update: { $set: {memberId: obj.memberId} },
          },
      }))
  )
  let cleanedPromise = await Promise.all([cleanedResult])
  console.log("cleanedPromise", cleanedPromise);
  let modifiedCount = cleanedPromise[0].result.nModified
  console.log("modifiedCount", modifiedCount);
  if(getBadId.length == modifiedCount ){
    return res.send({
      message:"All member id corrected",
      got:getBadId.length,
      modified:modifiedCount
    })
  }else{
    return res.send({
      message:"Not all member id corrected",
      got:getBadId.length,
      modified:modifiedCount
    })
  }
  }
  catch(error){
    console.log("error",error)
    returnResponse(500, {message: error})
  }
})
app.get('/mapLead', async (req,res)=>{
  console.log("hit")

  try {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    console.log("skip",skip, "limit", limit)
    let orders = await Orders.find({
      customerId:{$exists:true},
      isOrderDeleted:false,
      createdAt:{$gte: new Date("2023-04-01T00:00:00.000+00:00")}
    },{customerName:1, loanId:1})
        // },{customerName:1, loanId:1}).skip(skip).limit(limit)
    console.log("orders===>", orders.length)
    let matchedLeads = []
    let mappedLeadsCount = 0   
    let unMappedLeadsCount = 0 
    for(const order of orders){
      let customer = await Customers.find({ customerName: order.customerName,loanId: order.loanId},{groupId:1, memberId:1}).limit(1)
      console.log("customer==>", customer)
      if(customer.length > 0 && customer[0].groupId && customer[0].memberId){
        let leadUpdateResult = await Leads.updateOne({ isMapped:false,isDeleted:false, 'uniqueId': customer[0].groupId + "-" + customer[0].memberId, 'isDeleted': false },
        {
            $set: { 'isMapped': true },
            $push: {
                'orderIds': order._id,
            }
        });
        if(leadUpdateResult.modifiedCount == 1){
          mappedLeadsCount++
          matchedLeads.push(leadUpdateResult)
        }else{
          unMappedLeadsCount++
        }
      }                  
    }
    console.log("matchedLeads ==>", matchedLeads)
    console.log("matchedLeads.length ==>", matchedLeads.length)
    return res.send({
      message:"api hit",
      data:matchedLeads,
      length:matchedLeads.length
    })
  }
  catch(error){
    console.log("error",error)
    return res.send({
      message:"catch error",
    })  }
 
})
app.get('/checkUnMappedLeads', async (req,res)=>{
  console.log("hit")

  try {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    console.log("skip",skip, "limit", limit)
    console.time("order_query")
    let orders = await Orders.find({
      customerId:{$exists:true},
      isOrderDeleted:false,
      createdAt:{$gte: new Date("2023-04-01T00:00:00.000+00:00")}
    },{customerName:1, loanId:1})
    // },{customerName:1, loanId:1}).skip(skip).limit(limit)
    // console.log("orders===>", orders)
    console.timeEnd("order_query")

    let matchedLeads = []
    let mappedCustomers = []
    for(const order of orders){
      let customer = await Customers.find({ customerName: order.customerName,loanId: order.loanId}).limit(1)
      if(customer.length > 0 && customer[0].groupId && customer[0].memberId){
      let matchedLead = await Leads.find({ isMapped:false, isDeleted:false, 'uniqueId': customer[0].groupId + "-" + customer[0].memberId, 'isDeleted': false },{ uniqueId: 1,groupId: 1,memberId: 1, isMapped: 1 })
      // console.log("matchedLead", matchedLead)

      if(matchedLead.length>0){
        matchedLeads.push(matchedLead)
       }     
      }                  
    }
    // console.log("matchedLeads ==>", matchedLeads)
    // console.log("matchedLeads.length ==>", matchedLeads.length)
    return res.send({
      message:"api hit",
      data:matchedLeads,
      length:matchedLeads.length
    })
  }
  catch(error){
    console.log("error",error)
    return res.send({
      message:"catch error",
    })  }
 
})
app.get('/mapDistributedLead', async (req,res)=>{
  console.log("hit")

  try {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    console.log("skip",skip, "limit", limit)
    let orders = await Orders.find({
      isOrderDeleted:false,
      customerId:{$exists:true},
      isDistributed:true,
      createdAt:{$gte: new Date("2023-04-01T00:00:00.000+00:00")}
    },{customerName:1, loanId:1})
    let matchedLeads = []
    let mappedCustomers =[]
    // for(const order of orders){
    //   let customer = await Customers.find({ customerName: order.customerName,loanId: order.loanId}).limit(1)
    //   if(customer[0].groupId){
    //     let leadUpdateResult = await Leads.updateOne({ isMapped:true, isDistributed:false, 'uniqueId': customer[0].groupId + "-" + customer[0].memberId, 'isDeleted': false },
    //     {
    //         $set: { 'isDistributed': true },
    //     });
    // matchedLeads.push(leadUpdateResult)
    //   }
                  
    // }
    let bulkLead =[]
    for(const order of orders){
      let customer = await Customers.findOne({ customerName: order.customerName,loanId: order.loanId},{groupId:1, memberId:1})
      console.log("customer==>", customer)
      if(customer){
        let updateLead = {
          updateOne: {
            filter: { isMapped:true, isDistributed:false, isDeleted:false, 'uniqueId': customer.groupId + "-" + customer.memberId, 'isDeleted': false },
            update: { $set: { 'isDistributed': true } }
          }
        };
        console.log("updateLead==>", updateLead)
        bulkLead.push(updateLead)
        // let leadUpdateResult = await Leads.updateOne({ isMapped:true, isDistributed:false, 'uniqueId': customer[0].groupId + "-" + customer[0].memberId, 'isDeleted': false },
        // {
        //     $set: { 'isDistributed': true },
        // });
        // matchedLeads.push(leadUpdateResult)
      }
    }
    console.log("bulkLead==>", bulkLead)
    const bulkLeadPromise = await Leads.bulkWrite(bulkLead)

    console.log("matchedLeads ==>", bulkLeadPromise)
    // console.log("matchedLeads.length ==>", matchedLeads.length)
    return res.send({
      message:"api hit",
      data:bulkLeadPromise,
      // length:bulkLeadPromise.length
    })
  }
  catch(error){
    console.log("error",error)
    return res.send({
      message:"catch error",
    })  }
 
})
app.get('/checkNotDistributedLeads', async (req,res)=>{
  console.log("hit")

  try {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    console.log("skip",skip, "limit", limit)
    let orders = await Orders.find({
      customerId:{$exists:true},
      isOrderDeleted:false,
      isDistributed:true,
      createdAt:{$gte: new Date("2023-04-01T00:00:00.000+00:00")}
    },{customerName:1, loanId:1})
    console.log("orders-->", orders)
    let matchedLeads = []
    let mappedCustomers = []
    for(const order of orders){
      let customer = await Customers.findOne({ customerName: order.customerName,loanId: order.loanId})
      if(customer){
        let matchedLead = await Leads.find({ isMapped:true,isDeleted:false, isDistributed:false, 'uniqueId': customer.groupId + "-" + customer.memberId, 'isDeleted': false },{ uniqueId: 1,groupId: 1,memberId: 1, isMapped: 1 })
        if(matchedLead.length>0){
          matchedLeads.push(matchedLead)
         }     
      }  
    }
    console.log("matchedLeads ==>", matchedLeads)
    console.log("matchedLeads.length ==>", matchedLeads.length)
    return res.send({
      message:"api hit",
      data:matchedLeads,
      length:matchedLeads.length
    })
  }
  catch(error){
    console.log("error",error)
    return res.send({
      message:"catch error",
    })  }
 
})
// console.log("connection", connection);
