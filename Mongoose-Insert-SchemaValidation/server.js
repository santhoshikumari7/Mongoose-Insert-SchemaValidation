let mongoose = require("mongoose");


let studentSchema = new mongoose.Schema({
    name:String,
    age:{
        type:Number,
        min:[15,"Too young to create account."],
        max:[75,"Too old to create account."],
        required: [true,"Age is mandatory."],
    },
    gender: {
        type:String,
        enum:["male","female"],
        lowercase:true,
        required:true,
    },
    email: {
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`,
        },
        required: [true, "email id is required"],
      },
    mobileNo: {
        type: String,
        validate: {
          validator: function(v) {
            return  /^(?:\+91|91)?[6-9]\d{9}$/.test(v);
          },
          message: props => `${props.value} is not a valid indian mobile number!`,
        },
        required: [true, "mobile number is required"],
      },
});

let Student = new mongoose.model("student",studentSchema,
    "Batch2408Student");

let insertDataIntoDB = async ()=>{

    try{
        let madhu = new Student({
            name:"Madhu",
            age:30,
            gender:"Female",
            email:"madhu5@gmail.com",
            mobileNo:"9899908932",
        });
    
       await madhu.save();

       let kumari = new Student({
        name:"kumari S",
        age:25,
        gender:"Female",
        email:"kumari7@gmail.com",
        mobileNo:"9868564467",
       });

       await kumari.save();

       console.log("data saved to db successfully");

    
    }catch(err){
       console.log(err);
       console.log("data not saved to db");
    }
   
    };

   
let connectToMDB = async ()=>{
  try{
    mongoose.connect("mongodb+srv://santhoshikumari:santhoshikumari@bath2408cluster.vp7w6.mongodb.net/BRNDB?retryWrites=true&w=majority&appName=Bath2408Cluster");

    console.log("connected to MDB successfully.");
    
    insertDataIntoDB();
  }catch(err){
      console.log("unable to connect to MDB.");
  }
  
};

connectToMDB();