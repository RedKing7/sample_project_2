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

//create
router.get('/new', (req, res)=>{
   const companyId = req.params.companyId
   res.render('snowboards/new', {
      companyId: companyId
   })
})

//edit
router.get('/:snowboardId/edit', (req, res)=>{
   const companyId = req.params.companyId;
   const snowboardId = req.params.snowboardId;

   CompanyModel.findById(companyId)
      .then((company)=>{
         const snowboard = company.snowboards.id(snowboardId);
         res.render('snowboards/edit', {
            snowboard,
            companyId
         })
      })
})

//edit put
router.put('/:snowboardId', (req, res)=>{
   const companyId = req.params.companyId;
   const snowboardId = req.params.snowboardId;
   const updatedSnowboard = req.body;

   CompanyModel.findById(companyId)
      .then((company)=>{
         const snowboard = company.snowboards.id(snowboardId);

         snowboard.name = updatedSnowboard.name
         snowboard.price = updatedSnowboard.price

         return company.save();
      })
      .then(()=>{
         res.redirect(`/companies/${companyId}/snowboards/${snowboardId}`)
      })
      .catch((err)=>{
         console.log(err);
      })
})

//put
router.post('/', (req, res)=>{
   const companyId = req.params.companyId;
   const newSnowboard = req.body;

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\\
//   The Proper Way to Nest Promises    \\
   CompanyModel.findById(companyId)
      .then((company)=>{
         company.snowboards.push(newSnowboard)
         return company.save()
      })
      .then((company)=>{
         res.redirect(`/companies/${company._id}/snowboards`);
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

//delete

module.exports = router