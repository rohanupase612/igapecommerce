var express = require("express");
var bodyparser = require("body-parser");
var jsonparser = bodyparser.json();
const router = express.Router();
var businessdeals = require("../../models/business/BusinessDeals");

router.post("/save", async (req, res) => {
    let body = req.body;
    let businessdeal = new businessdeals.Businessdeals();
    businessdeal.id = body.data.id;
    businessdeal.businessid = body.data.businessid;
    businessdeal.title = body.data.title;
    businessdeal.startdate = body.data.startdate;
    businessdeal.enddate = body.data.enddate;
    businessdeal.imagecode= body.data.imagecode;
    businessdeal.description = body.data.description;
    businessdeal.save().then(result =>{
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
          let businessdeal = new businessdeals.Businessdeals();
          businessdeal.id = body.data.id;
          businessdeal.get().then(
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
    let businessdeal = new businessdeals.Businessdeals();
    businessdeal.businessid = body.data.businessid;            
    businessdeal.list().then(result =>{
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
    console.log(body);
    let businessdeal = new businessdeals.Businessdeals();
    businessdeal.id = body.data.id;            
    businessdeal.delete().then(result =>{
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
module.exports = router;