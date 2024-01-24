import { Schema } from 'mongoose';
import { models, model } from 'mongoose';

const FavouriteSchema= new Schema({
    coinId:{
       type: String}
});
const HoldingCryptoSchema= new Schema({
    coinId:{
       type: String
    },
    stakeNo:{
        type:Number
    },
    amount:{
        type: Number
    }
});
const HistorySchema=new Schema({
    amount:{
        type:Number,
    },
    transactionType:{
        type:String,
    },
    receiver:{
        type:String,
    },
    date:{
        type:String,
    },
    crypto:{
        type:String,
    },
    transfertype:{
        type:String,
    },
    stakeNo:{
        type:String
    }
    

})

const userSchema=new Schema({
    email:{
        type:String,
        unique:[true,'Email already exist'],
        required:[true,'Email is Required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
      },
    password:{
        type:String,
        required:[true,'Password is required'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    favourites: [FavouriteSchema], // Use the FavouriteSchema for favourites    
    holdings:[HoldingCryptoSchema],
    balance:{
        type:Number,
        default:0,
        
    },
    history:[HistorySchema]
});

const User = models.User || model('User', userSchema);

export default User;