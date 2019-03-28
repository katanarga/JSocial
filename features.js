const connexion=require("./connexion"),
fs=require("fs");

exports.redirection=(page,res,login,color,messages,desc,friends,users,suggestions,likeDestDiscussion) => {
	connexion.query("SELECT * FROM UTILISATEUR WHERE identifiantSite=?",[login],
		(err,rows,fields) => {
			if(err)	throw(err);
			else if(rows.length){
				paramsEJS={"page":page,"nom":rows[0].nom,"prenom":rows[0].prenom,"age":rows[0].age,
			"login":login,"color":color,"msg":messages[0],"sexe":rows[0].sexe,"msgFriend":messages[3],
			"description":desc?desc:rows[0].description,"msgDescription":messages[1],"msgImage":messages[2],
			"linkProfil":"/profil/"+login,"linkFriends":"/friends/"+login,"linkSearch":"/search/"+login,
			"isConnected":true,"imgProfil":rows[0].image,"friends":friends,"users":users,
			"suggestions":suggestions,"msgPassword":messages[4],"like":likeDestDiscussion[0],
			"dest":likeDestDiscussion[1],"discussion":likeDestDiscussion[2]};
				if(page=="profil.ejs"){	
					if (!fs.existsSync("./public/"+login))
	    				fs.mkdirSync("./public/"+login);
					paramsEJS.images=fs.readdirSync("./public/"+login);
				}
				res.render(page,paramsEJS);
			}
			else	res.send("Problème de redirection.");
	});
}
exports.uploadImage=(login,req) => {
	if(Object.keys(req.files).length==0){
		console.log("Echec de l'upload");
		return false;
	}
	else{
	  	let image=req.files.image;
	  	if (!fs.existsSync("./public/"+login))
	    	fs.mkdirSync("./public/"+login);
		image.mv("./public/"+login+"/"+image.name,(err) => {
	    	if (err){
	    		console.log("Echec de l'upload");
				return false;
	    	}
	    });
	    return true;
	}
}