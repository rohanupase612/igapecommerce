var express = require("express");
var bodyparser = require("body-parser");
var jsonparser = bodyparser.json();
const router = express.Router();
var BusinessDealsProducts = require("../../models/business/BusinessDealsProduct");

router.post("/save", async (req, res) => {
    let body = req.body;
    let businessdealsproduct = new BusinessDealsProducts.BusinessDealProduct();
    businessdealsproduct.id = body.data.id;
    businessdealsproduct.dealid = body.data.dealid;
    businessdealsproduct.productid = body.data.productid
    businessdealsproduct.save().then(result =>{
        let data = 
        {
            "data":{
                "status":"success",
                "data":result
            }
        }
        res.end(JSON.stringify(data));
    },
    err =>{
        let data = {
            "data":{
                "status":"fail"
            }
        };
        res.end(JSON.stringify(data))
    }
    );
});

router.post("/get", async (req, res) => {
          let body = req.body;
          let businessdealsproduct = new BusinessDealsProducts.BusinessDealProduct();
          businessdealsproduct.id = body.data.id;
          businessdealsproduct.get().then(
            (result) => {
              let data = {
                data: {
                  status: "success",
                  data: result,
                },
              }
              res.end(JSON.stringify(data));
            },
            (err) => {
              let data = {
                data: {
                  status: "fail",
                },
              };
              res.end(JSON.stringify(data));
            }
          );
        });
router.post("/list", async (req, res) => {
    let body = req.body;
    let businessdealsproduct = new BusinessDealsProducts.BusinessDealProduct();
    businessdealsproduct.list().then(result =>{
    let data = 
        {
            "data":{
                "status":"success",
                "data":result
            }
        }
        res.end(JSON.stringify(data));
    },
    err =>{
        let data = {
            "data":{
                "status":"fail"
            }
        };
        res.end(JSON.stringify(data))
    }
    );
});

router.post("/delete", async (req, res) => {
    let body = req.body;
    let businessdealsproduct = new BusinessDealsProducts.BusinessDealProduct();
    businessdealsproduct.id = body.data.id;
    businessdealsproduct.delete().then(
      (result) => {
        let data = {
          data: {
            status: "success",
            data: result,
          },
        }
        res.end(JSON.stringify(data));
      },
      (err) => {
        let data = {
          data: {
            status: "fail",
          },
        };
        res.end(JSON.stringify(data));
      }
    );
  });
module.exports = router;