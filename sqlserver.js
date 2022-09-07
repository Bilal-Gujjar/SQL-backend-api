//curd in express with postgresql localhost 5432
const express = require("express");
var cors = require('cors')
const app = express();
//env variables
app.use(cors())
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const { Pool } = require("pg");


const client = new Pool({
 connectionString: process.env.DATABASE_URL,
 ssl: {
 rejectUnauthorized: false
 }
});
client.connect();

app.get("/",(req,res)=>{
  res.send("please enter the route")
})


app.get("/users", (req, res) => {
  client.query(`Select * from users`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});

//Add New user to table from postman
app.post("/users", (req, res) => {
  const user = req.body;
  let insertQuery = `insert into users(id, name, email, address)
                          values(${user.id}, '${user.name}', '${user.email}', '${user.address}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

//Update user data in table from postman
app.patch("/users/:id", (req, res) => {
  const user = req.body;
  let updateQuery = `update users set ${Object.keys(user)} = '${Object.values(
    user
  )}' where id=${req.params.id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

//upadte user data multiple fields in table from postman using patch method
app.patch("/users/:id", (req, res) => {
  const user = req.body;
  let updateQuery = `update users set `;
  for (let key in user) {
    updateQuery += `${key} = '${user[key]}',`;
  }
  updateQuery = updateQuery.slice(0, -1);
  updateQuery += ` where id=${req.params.id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});


//login successfull if the user is found in the table and password is correct
app.post("/login", async(req, res) => {
  
  const api =  { email ,name } = req.body;
  foundUser =  await client.query(`Select  email,name from users `)
  let data = foundUser.rows
  console.log(data);
  let found = data.find((user) => user.email === api.email && user.name === api.name);
  if (found) {
    res.send("Login Successfull");
    //onl;y placed order if the user logged in
  } else {
    res.send("Login Failed");
  }

 
  client.end;
});


//get all products
app.get("/products", (req, res) => {
  client.query(`Select * from product`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});

//add product to table from postman
app.post("/products", (req, res) => {
  const productse = req.body;
  let insertQuery = `Insert into product(productname,productid,productprice,productdetails,img)
                            values('${productse.productname}',${productse.productid},${productse.productprice},'${productse.productdetails}','${productse.img}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});
//update product data in table from postman
app.patch("/products/:id", (req, res) => {
  const product = req.body;
  let updateQuery = `update product set `;
  for (let key in product) {
    updateQuery += `${key} = '${product[key]}',`;
  }
  updateQuery = updateQuery.slice(0, -1);
  updateQuery += ` where productid=${req.params.id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});
//delete product data in table from postman
app.delete("/products/:id", (req, res) => {
  let deleteQuery = `delete from product where productid=${req.params.id}`;

  client.query(deleteQuery, (err, result) => {
    if (!err) {
      res.send("Delete was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

//get all orders
app.get("/orders", (req, res) => {
  client.query(`Select * from orders`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});

//place new order in table from postman
app.post("/orders", (req, res) => {
  const order = req.body;
  let insertQuery = `Insert into orders(orderid,userid,productid,totalprice,timestp)
                            values(${order.orderid},${order.userid},${order.productid},${order.totalprice},${order.timestp})`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

//update order data in table from postman
app.patch("/orders/:id", (req, res) => {
  const order = req.body;
  let updateQuery = `update orders set `;
  for (let key in order) {
    updateQuery += `${key} = '${order[key]}',`;
  }
  updateQuery = updateQuery.slice(0, -1);
  updateQuery += ` where orderid=${req.params.id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});
//delete order data in table from postman
app.delete("/orders/:id", (req, res) => {
  let deleteQuery = `delete from orders where orderid=${req.params.id}`;

  client.query(deleteQuery, (err, result) => {
    if (!err) {
      res.send("Delete was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});
