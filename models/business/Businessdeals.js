const database = require("../Database");
var fs = require("fs");

class Businessdeals {

  id = 0;
  businessid = 0;
  title = "";
  startdate = "";
  enddate = "";
  picpath = "";
  imagecode = "";
  description = "";
  db = new database.Database();

  constructor() {
    this.id = 0;
    this.businessid = 0;
    this.title = "";
    this.startdate = "";
    this.enddate = "";
    this.picpath = "";
    this.imagecode= "";
    this.description = "";
    this.query = "";
  }

  save = () => {
          if (this.imagecode != "") {
                    let base64image = this.imagecode.replace(/^data:image\/jpeg;base64,/, "");
                    base64image = base64image.replace(/^data:image\/png;base64,/, "");
                    this.picpath = "businessdeals/" + Math.random().toString(36).substring(2, 7) + ".png";
                    fs.writeFile("public/" + this.picpath, base64image, 'base64', function (err) {
                        console.log("Error image saving-" + err);
                    });
                }
    if (this.id == 0) {
      this.query = "INSERT INTO business_dealsofday (businessid, title, startdate, enddate, picpath, description) ";
      this.query += "VALUES(" + this.businessid + ", '" + this.title +  "',";
      this.query += "STR_TO_DATE('" + this.startdate + "', '%d/%m/%Y'),";
      this.query += "STR_TO_DATE('" + this.enddate + "', '%d/%m/%Y'),";
      this.query += "'" + this.picpath + "', " ;
      this.query += "'close')";
    } 
    else {
      this.query = "UPDATE business_dealsofday SET  businessid = " + this.businessid + ", ";
      this.query += "title = '" + this.title + "', ";
      this.query += "startdate = STR_TO_DATE('" + this.startdate + "', '%d/%m/%Y'), ";
      this.query += "enddate = STR_TO_DATE('" + this.enddate + "', '%d/%m/%Y'), ";
      if(this.picpath != "")
      this.query += "picpath = '" + this.picpath + "', ";
      this.query += "description = '" + this.description + "' ";
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
    this.query = "SELECT * FROM  business_dealsofday WHERE id = " + this.id;
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  };

 

  list = () => {
    this.query = "SELECT * FROM  Business_dealsofday WHERE businessid = " + this.businessid + " ORDER BY startdate";
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) reject(err);
        resolve(result);
      });
    });
  };

  delete = () => {
        this.query = "DELETE FROM  Business_dealsofday WHERE id = " + this.id;
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
          Businessdeals: Businessdeals
};
