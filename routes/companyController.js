const express = require('express');
const router = express.Router();

const Schema = require('../db/schema');

const CompanyModel = Schema.CompanyModel;
const SnowboardModel = Schema.SnowboardModel;

router.get('/', (req,res)=>{
   CompanyModel.find({})
      .then((companies)=>{
         res.render('companies/index',{
            companies
         })
      })
})

// router.get('/:name/snowboards', (req, res)=>{
//    const thisName = req.params.name;
//    CompanyModel.findOne({name: thisName})
//       .then((company)=>{
//          res.render('companies/snowboards', {
//             company
//          });
//       })
//       .catch((err)=>{
//          console.log(err);
//       })
// })

module.exports = router