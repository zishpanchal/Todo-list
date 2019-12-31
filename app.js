const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var items = ["Buy groceries", "Buy jeans"];
var workItems = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newItemsList: items});
})
app.post("/", function (req, res) {

    if (req.body.list === "Work List"){
        workItems.push(req.body.newItem);
        res.redirect("/work");
    }
    else{
        items.push(req.body.newItem);
        res.redirect("/");
    }

})

app.get("/work", function(req, res){
    res.render("list", { listTitle: "Work List", newItemsList: workItems });
})
app.post("/work", function (req, res) {
    workItems.push(req.body.newItem);
    redirect("/work")
})

app.listen(process.env.PORT|| 3000, function(){
    console.log("Started server on port 3000");
})