require('dotenv').config();
const mongoose = require('mongoose');
const Schema = require('./schema.js');

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection;

db.on('open', ()=>{
   console.log('database has been connected')
})


const CompanyModel = Schema.CompanyModel;
const SnowboardModel = Schema.SnowbardModel;

CompanyModel.remove({}, (err)=>{
   console.log(err);
})

const burton = new CompanyModel({
   name: 'Burton',
   country: 'US'
})
const dc = new CompanyModel({
   name: 'DC',
   country: 'Canada'
})

const bigSnowboard = new SnowboardModel({
   name: 'Big Snowboard',
   price: 123
})
const littleSnowboard = new SnowboardModel({
   name: 'Little Snowboard',
   price: 111
})
const blueSnowBoard = new SnowboardModel({
   name: 'Blue Snowboard',
   price: 132
})


const companies = [burton, dc]
const snowboards = [bigSnowboard, littleSnowboard, blueSnowBoard]

companies.forEach((company)=>{

   company.snowboards = snowboards;

   company.save()
      .then((company)=>{
         console.log(company.name, 'saved')
      })
      .catch((error)=>{
         console.log(error);
      })
})

db.close();