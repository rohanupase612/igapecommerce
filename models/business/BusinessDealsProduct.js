const database = require("../Database");

class BusinessDealProduct {

  id = 0;
  dealid = 0;
  productid = "";
  db = new database.Database();

  constructor() {
    this.id = 0;
    this.dealid = 0;
    this.productid = "";
    this.query = "";
  }

  save = () => {
    if (this.id == 0) {
      this.query = "INSERT INTO business_dealproducts(dealid, productid) ";
      this.query += "VALUES(" + this.dealid + ", '" + this.productid +  "') ";
    } 
    else {
      this.query = "UPDATE business_dealproducts SET  dealid = " + this.dealid + ", ";
      this.query += "productid = '" + this.productid + "', ";
      this.query += " WHERE id =" + this.id;
    }
    console.log(this.query);
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  };


  get = () => {
    this.query = "SELECT * FROM  business_dealproducts WHERE id = " + this.id;
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        //this.db.close();
        if (err) reject(err);
        resolve(result);
      });
    });
  };

  list = () => {
    this.query = "SELECT * FROM  business_dealproducts";
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) reject(err);
        resolve(result);
      });
    });
  };

  delete = () => {
        this.query = "DELETE FROM  business_dealproducts WHERE id = " + this.id;
      return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) reject(err);
        resolve(result);
      });
    });
  };
  
}

module.exports = {
    BusinessDealProduct: BusinessDealProduct
};
