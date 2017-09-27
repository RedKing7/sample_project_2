const express = require('express');
const router = express.Router({mergeParams: true});

const Schema = require('../db/schema');
const CompanyModel = Schema.CompanyModel;

// index
router.get('/', (req, res)=>{
   const companyId = req.params.companyId;

   CompanyModel.findById(companyId)
      .then((company)=>{
         res.render('companies/snowboards',{
            company
         })
      })
      .catch((err)=>{
         console.log(err);
      })
})

// show
router.get('/:snowboardId', (req, res)=>{
   const companyId = req.params.companyId;
   const snowboardId = req.params.snowboardId;

   CompanyModel.findById(companyId)
      .then((company)=>{
//     //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\\
         const snowboard = company.snowboards.id(snowboardId);
//     \\!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
         res.render('companies/showboard', {
            snowboard,
            companyId: company._id
         });
      })
      .catch((err)=>{console.log(err)})
})

module.exports = router