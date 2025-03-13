var express = require('express');
const ChildrenToyModel = require('../models/ChildrenToyModel');
const BrandModel = require('../models/BrandModel');
var router = express.Router();

//READ feature
//Importance: Must use "async" + await" keywords
router.get('/', async (req, res) => {
   //SQL: SELECT * FROM students
   var ChildrenToyList = await ChildrenToyModel.find({}).populate('brand');
   console.log(ChildrenToyList);
   res.render('ChildrenToy/index', { ChildrenToyList });
});

router.get('/', async (req, res) => {
   //SQL: SELECT * FROM students
   var ChildrenToyList = await ChildrenToyModel.find({});
   console.log(ChildrenToyList);
   res.render('ListProduct/index', { ChildrenToyList });
});


router.get('/list', async (req, res) => {
   var ChildrenToy = await ChildrenToyModel.find({});
   console.log(ChildrenToy);
   res.render('ChildrenToy/list', { ChildrenToy });
});


router.get('/delete/:id', async (req, res) => {
   let id = req.params.id;
   await ChildrenToyModel.findByIdAndDelete(id);
   res.redirect('/ChildrenToy'); 
})
router.get('/deleteall', async (req, res) => {
   await ChildrenToyModel.deleteMany();
   res.redirect('/ChildrenToy');
})


router.get('/add', async (req, res) => {
   var brands = await BrandModel.find({}).select('_id name');
   res.render('ChildrenToy/add',{  brands });
})

router.post('/add', async (req, res) => {
   //get input data from form
   var ChildrenToy = req.body;
   //add data to database
   await ChildrenToyModel.create(ChildrenToy);
   res.redirect('/ChildrenToy');
})




router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var brands = await BrandModel.find({}).select('_id name');
   var ChildrenToy = await ChildrenToyModel.findById(id);
   res.render('ChildrenToy/edit', { ChildrenToy, brands }); 
})

router.post('/edit/:id', async (req, res) => {
   try {
       var id = req.params.id;
       var updatedToy = req.body;
       await ChildrenToyModel.findByIdAndUpdate(id, updatedToy);
       res.redirect('/ChildrenToy'); // Redirect to the toy list page
   } catch (error) {
       console.error(error);
       res.status(500).send('Internal Server Error');
   }
});



router.post('/search', async (req, res) => {
   let keyword = req.body.keyword;
   let ChildrenToy = await ChildrenToyModel.find({ name: new RegExp(keyword, "i") });
   res.render('ChildrenToy/index', { ChildrenToyList : ChildrenToy });
})
module.exports = router;