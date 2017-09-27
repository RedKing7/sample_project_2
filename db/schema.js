const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SnowbardSchema = new Schema ({
   name: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true
   }
})

const CompanySchema = new Schema ({
   name:{
      type: String,
      required: true,
      unique: true
   },
   country: {
      type: String,
      required: true
   },
   snowboards: [SnowbardSchema]
})

const CompanyModel = mongoose.model('Company', CompanySchema);
const SnowbardModel = mongoose.model('Snowboard', SnowbardSchema);
module.exports = {
   CompanyModel: CompanyModel,
   SnowbardModel: SnowbardModel
}