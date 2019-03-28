const mysql=require("mysql"),
fs=require("fs"),
ini=require("ini");

config = ini.parse(fs.readFileSync('./config.ini', 'utf-8')),
connexion=mysql.createConnection({
	host:config.host,
	user:config.user,
	password : config.password,
	database : config.database
});
connexion.connect();
connexion.on('error', function(err) {
  console.log("[mysql error]",err);
});
module.exports=connexion;