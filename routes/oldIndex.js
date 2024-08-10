var express = require('express');
var router = express.Router();
const low = require('lowdb')
const path = require("path")
const FileSync = require('lowdb/adapters/FileSync')
const formidable = require('formidable')
const booksModel=require("../dbModles/booksModel")

const adapter = new FileSync(path.resolve(__dirname, "../data/persons.json"))
const db = low(adapter)
db.defaults({ persons: [], user: {} })
  .write()
/* GET home page. */
router.get('/accton', function (req, res, next) {
  res.render('registry');
});
router.post('/registry', function (req, res, next) {
  const form = formidable({
    multiples:true,
    uploadDir: path.resolve(__dirname,"../public/images") ,
    keepExtensions: true
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log("fields-----",fields)
    console.log("files-----",files)
    const id = new Date().getTime().toString()
    const image_url=files.file.newFilename
    booksModel.insertMany([{ ...fields,image_url }]).then(data=>{
      console.log("插入成功-----",data)
    }).catch(err=>{
      console.log("插入失败-----",err)
    })
  });

  res.render('success', { name: req.body.name });
});
router.get('/accountList', function (req, res, next) {
  booksModel.find().then(allBooks=>{
    console.log("allBooks-----",allBooks)
    res.render('accountList', { allBooks });
  })
});
router.get("/delete/:id", (req, res) => {
  const id = req.params.id
  booksModel.findById(id).then(data=>{
    return data
  }).then(data=>{
    const {name}=data
    console.log("data-----find----",data)
    booksModel.deleteOne({_id:id}).then(data=>{
      console.log("删除成功----",data)
      res.render('delete', { name });
    }).catch(err=>{
      console.log("err-----",err)
      res.send("删除失败")
    })
  })
 
})
module.exports = router;
