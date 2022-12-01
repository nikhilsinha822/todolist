const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname+"/date.js");
//console.log(date())


const app = express();
const items = ["Buy Food","Cook Food","Eat Food"];
const workItems = [];

app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>
{
  let day = date.getDate();
  res.render("list", {newListItems: items, listOfTitle: day});
});

app.post("/",(req,res)=>{
  const item = req.body.newItem;

  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }

  // res.render("list", {kindOfDay: day, newListItem: item});

})
app.get("/about",(req,res)=>{
  res.render("about");
})
app.get("/work",(req,res)=>{
  res.render("list", {newListItems: workItems, listOfTitle: "Work List"});
})
app.listen(3000,()=>
{
  console.log("server started at port 3000")
});
