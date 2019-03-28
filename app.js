const express=require("express"),
bp=require("body-parser"),
routes=require('./routes'),
fileUpload=require("express-fileupload"),
session=require("express-session"),
app=express();
app.set("view engine","ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileUpload());
app.use("/",routes);
app.use((req,res) => {
  res.render("home.ejs",{"login":"","msg":"","color":"","isConnected":false,
    "imgProfil":"","linkProfil":"#","linkFriends":"#","linkSearch":"#","page":"home.ejs"});
});
app.listen(8080);