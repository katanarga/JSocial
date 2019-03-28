const express = require("express"),
mysql=require("mysql"),
ini=require("ini"),
bp=require("body-parser"),
bcrypt=require("bcrypt"),
fs=require("fs"),
fileUpload=require("express-fileupload"),
routes = express.Router(),
connexion=require("./connexion"),
features=require("./features.js");

/********* REQUETES GET **************/
routes.get("/profil/:login",(req,res) => {
	connexion.query("SELECT * FROM UTILISATEUR WHERE identifiantSite IN "
		+"(SELECT user2 FROM AMI WHERE user1=?) OR identifiantSite IN "
		+"(SELECT user1 FROM AMI WHERE user2=?)",[req.params.login,req.params.login],
		(err,rows,fields)=>{
			if(err)	throw(err);
			else
				features.redirection("profil.ejs",res,req.params.login,"","","",rows,"",
					"","","","","","");
	});
});

routes.get("/friends/:login",(req,res) => {
	connexion.query("SELECT * FROM UTILISATEUR WHERE identifiantSite IN "
		+"(SELECT user2 FROM AMI WHERE user1=?) OR identifiantSite IN "
		+"(SELECT user1 FROM AMI WHERE user2=?)",[req.params.login,req.params.login],
		(err,rows,fields)=>{
			if(err)	throw(err);
			else{
				messages=["","","","",""];
				features.redirection("friends.ejs",res,req.params.login,"",
					messages,"",rows,"","",["","",""]);
			}
	});
});
routes.get("/search/:login",(req,res) => {
	messages=["","","",""];
	connexion.query("SELECT * FROM UTILISATEUR WHERE identifiantSite<>? AND identifiantSite IN"+
		" (SELECT identifiantSite FROM INTERET WHERE interet IN (SELECT interet FROM"+
		" INTERET WHERE identifiantSite=?))",
			[req.params.login,req.params.login],(err,rows,fields)=>{
			if(err)	throw(err);
			else{
				messages=["","","","",""];
				features.redirection("search.ejs",res,req.params.login,"",messages,
					"","","",rows,["","",""]);
			}
	});
});
routes.get("/discuter/:login/:user",(req,res) => {
	connexion.query("SELECT * FROM UTILISATEUR WHERE identifiantSite IN "
		+"(SELECT user2 FROM AMI WHERE user1=?) OR identifiantSite IN "
		+"(SELECT user1 FROM AMI WHERE user2=?)",[req.params.login,req.params.login],
		(err,rows,fields)=>{
			if(err)	throw(err);
			else{
				connexion.query("SELECT * FROM MESSAGE WHERE auteur IN (?,?) AND "+
					"destinataire IN (?,?) ORDER BY date_envoi",
				[req.params.login,req.params.user,req.params.login,req.params.user],(err,rows2,fields) => {
					if(err)	throw(err);
					else	features.redirection("friends.ejs",res,req.params.login,"",messages,
								"",rows,"","",["",req.params.user,rows2]);	
				});
			}
	});
});

/********* REQUETES POST **************/
routes.post("/inscription",(req,res) => {
	var msgInscription="Inscription réussie.",color="green";
	if(req.body.passwordInscription==req.body.cpassword && req.body.nom.length<256 &&
		req.body.prenom.length<256 && req.body.passwordInscription.length<256 &&
		req.body.loginInscription.length<256 && req.body.passwordInscription.length>7){
		var sexe=req.body.sexe=="homme"?'H':'F',
		img=req.files.image ? req.files.image.name : "NULL",
		salt=bcrypt.genSaltSync(10),
      	hashedPassword=bcrypt.hashSync(req.body.passwordInscription,salt),
		data=[req.body.nom,req.body.prenom,req.body.age,sexe,
			req.body.loginInscription,hashedPassword,req.body.description,img];
		//on vérifie qu'il n'existe pas 1 utilisateur avec le même identifiant
		connexion.query("SELECT * from UTILISATEUR where identifiantSite=?",
			[req.body.loginInscription],(err,rows,fields) => {
			if(err)	throw(err);
			else if(rows.length)
				msgInscription="Echec de l'inscription, 1 utilisateur avec le même identifiant existe.";
			else{
				connexion.query("INSERT INTO UTILISATEUR (nom,prenom,age,sexe,identifiantSite,"+
			"motDePasseSite,description,image) VALUES (?,?,?,?,?,?,?,?)",data,(err,rows,fields)=>{
					if(err)	throw(err);
					else{
						msgInscription="Inscription réussie.";
						color="green";
						if(img!="NULL")	features.uploadImage(data[4],req);
					}
				});	
				var interets=["peche","foot","programmation","jeuxvideos","lecture"];
				if(!req.body.interets){
					connexion.query("INSERT INTO INTERET (identifiantSite,interet) VALUES (?,?)",
					[data[4],"NONE"],(err,rows,fields) => {
						if(err)	throw(err);
					});	
				}
				else if(interets.includes(req.body.interets))
					connexion.query("INSERT INTO INTERET (identifiantSite,interet) VALUES (?,?)",
					[data[4],req.body.interets],(err,rows,fields) => {
						if(err)	throw(err);
					});	
				else
					req.body.interets.forEach((interet) => {
						connexion.query("INSERT INTO INTERET (identifiantSite,interet) VALUES (?,?)",
						[data[4],interet],(err,rows,fields) => {
							if(err)	throw(err);
						});	
					});
			}
		res.render("home.ejs",{"login":"","msg":msgInscription,"color":color,"isConnected":false,
		"imgProfil":"","linkProfil":"#","linkFriends":"#","linkSearch":"#","page":""});
		});
	}
	else{
		msgInscription="Echec de l'inscription,";color="red";
		if(req.body.passwordInscription!=req.body.cpassword)
			msgInscription+="les mots de passes saisis sont différents.";
		else if(req.body.passwordInscription.length>255 || req.body.loginInscription.length>255)
			msgInscription+="l'identifiant et le mot de passe doivent faire au maximum 255 caractères.";
		else if(req.body.passwordInscription.length<8)
			msgInscription+="le mot de passe doit faire au moins 8 caractères.";
		else
			msgInscription+="le nom et le prénom doivent faire au maximum 255 caractères.";
		res.render("home.ejs",{"login":"","msg":msgInscription,"color":color,"isConnected":false,
	    		"imgProfil":"","linkProfil":"#","linkFriends":"#","linkSearch":"#","page":""});
	}
});

routes.post("/connexion",(req,res) => {
	connexion.query("SELECT * FROM UTILISATEUR WHERE identifiantSite=?",
		[req.body.login],(err,rows,fields) => {
			var msg="",isConnected=false;
			if(err){
				throw(err);
				msg="Echec de la connexion";
			}
			else if(rows.length && bcrypt.compareSync(req.body.password,rows[0].motDePasseSite))
				//connexion réussie
				isConnected=true;
			else	msg="Echec de la connexion,identifiants incorrect.";
			if(!isConnected)
				res.render("home.ejs",{"login":"","msg":msg,"color":"red","isConnected":false,
	    		"imgProfil":"","linkProfil":"#","linkFriends":"#","linkSearch":"#","page":""
	    		});
			else{
				messages=[msg,"","",""];
				features.redirection("home.ejs",res,req.body.login,"",messages,"",
					"","","",["","",""]);
			}
	});
});

routes.post("/profil/:login/imgProfil/:nameImage",(req,res) => {
	connexion.query("UPDATE UTILISATEUR SET image=? WHERE identifiantSite=?",
		[req.params.nameImage,req.params.login],(err,row,fields) => {
		if(err)	throw(err);
		else{
			var msgImage="Votre image de profil est maintenant "+req.params.nameImage,
			color="green";
			messages=["","",msgImage,"",""];
			features.redirection("profil.ejs",res,req.params.login,color,messages,
				"","","","",["","",""]);
		}
	});
});
routes.post("/profil/:login/uploadImage",(req,res) => {
	var msgImage="L'image "+req.files.image.name+" a bien été ajoutée.",
	color="green";
	features.uploadImage(req.params.login,req);
	messages=["","",msgImage,""];
 	features.redirection("profil.ejs",res,req.params.login,color,messages,
 		"","","","",["","",""]);
});
routes.post("/profil/:login/removeImage/:nameImage",(req,res) => {
	try {
		fs.unlinkSync("./public/"+req.params.login+"/"+req.params.nameImage);
		var color="green",msgImage="L'image "+req.params.nameImage+" a bien été supprimée.";
		messages=["","",msgImage,""];
 		features.redirection("profil.ejs",res,req.params.login,color,messages,
 		"","","","",["","",""]);
	} catch(err) {
		console.error(err);
	}
});
routes.post("/profil/:login/removeFriend/:friend",(req,res) => {
	connexion.query("DELETE FROM AMI WHERE (user1=? AND user2=?) OR (user1=? AND user2=?)",
		[req.params.login,req.params.friend,req.params.friend,req.params.login],(err,row,fields) => {
		if(err)	throw(err);
		else{
			connexion.query("DELETE FROM AIME WHERE (celui_qui_aime=? AND celui_qui_est_aime=?)"+
		" OR (celui_qui_aime=? AND celui_qui_est_aime=?)",
		[req.params.login,req.params.friend,req.params.friend,req.params.login],(err,row,fields) => {
			if(err)	throw(err);
			else{
				connexion.query("DELETE FROM MESSAGE WHERE (auteur=? AND destinataire=?)"+
		" OR (auteur=? AND destinataire=?)",
		[req.params.login,req.params.friend,req.params.friend,req.params.login],(err,row,fields) => {
			if(err)	throw(err);
			else{
				connexion.query("SELECT * FROM UTILISATEUR WHERE identifiantSite IN "
				+"(SELECT user2 FROM AMI WHERE user1=?) OR identifiantSite IN "
				+"(SELECT user1 FROM AMI WHERE user2=?)",[req.params.login,req.params.login],
				(err,rows2,fields)=>{
					if(err)	throw(err);
					else{
				messages=["","","",req.params.friend+" a été retiré de votre liste d'amis"];
		 		features.redirection("profil.ejs",res,req.params.login,"green",messages,
		 		"",rows2,"","",["","",""]);
		 	}});
		 	}
		 	});
		}});
	}		
	});
});
routes.post("/profil/:login/changePassword",(req,res) => {
	var msg,messages;
	if(req.body.newPassword.length<8 || req.body.newPassword!=req.body.cnewPassword){
		msg="Modification annulée, les mots de passe doivent être identiques et "+
			"faire au moins 8 caractères.";
		messages=["","","","",msg];
		features.redirection("profil.ejs",res,req.params.login,"red",messages,
			req.body.description,"","","",["","",""]);
	}
	else{
		var salt=bcrypt.genSaltSync(10),
	    hashedPassword=bcrypt.hashSync(req.body.newPassword,salt);
		connexion.query("UPDATE UTILISATEUR SET motDePasseSite=? WHERE identifiantSite=?",
			[hashedPassword,req.params.login],(err,row,fields) => {
			if(err)	throw(err);
			else{
				msg="Votre mot de passe a bien été modifé.";
				messages=["","","","",msg];
				features.redirection("profil.ejs",res,req.params.login,"green",messages,
					req.body.description,"","","",["","",""]);
			}
		});
	}
});
routes.post("/profil/:login/description",(req,res) => {
	connexion.query("UPDATE UTILISATEUR SET description=? WHERE identifiantSite=?",
		[req.body.description,req.params.login],(err,row,fields) => {
		var msgDescription="Votre description a bien été modifée.",
		color="green";
		if(err)	throw(err);
		else{
			messages=["",msgDescription,"",""];
			features.redirection("profil.ejs",res,req.params.login,color,messages,
				req.body.description,"","","",["","",""]);
		}
	});
});

routes.post("/search/:login",(req,res) => {
	var params=[req.params.login,req.body.agemin,req.body.agemax],
	query="SELECT * FROM UTILISATEUR WHERE identifiantSite<>? AND AGE BETWEEN ? AND ? AND "+
	"identifiantSite IN (SELECT identifiantSite FROM INTERET WHERE interet IN (",
	interets=["peche","foot","programmation","jeuxvideos","lecture"];
	if(!req.body.interets){
		query+="?))";
		params.push("NONE");
	}
	else if(interets.includes(req.body.interets)){
		query+="?))";
		params.push(req.body.interets);
	}
	else{
		for(var i=0;i<req.body.interets.length;i++){
			query+= i<req.body.interets.length-1 ? "?," : "?))";
			params.push(req.body.interets[i]);
		}
	}
	if(req.body.sexe!="tous"){
		query+=" AND sexe=?";
		params.push((req.body.sexe=="femme")?'F':'H');
	}
	connexion.query(query,params,(err,rows,fields) => {
		if(err)	throw(err);
		else{
			messages=["","","","",""];
			features.redirection("search.ejs",res,req.params.login,"",
				messages,"","",rows,true,["","",""]);
		}
	});
});
routes.post("/like/:login/:user",(req,res) => {
	connexion.query("SELECT * FROM AIME WHERE celui_qui_aime=? AND celui_qui_est_aime=?",
		[req.params.login,req.params.user],(err,rows,fields) => {
		if(err)	throw(err);
		else if(rows.length){
			var msgFriend="Vous avez déjà aimé ce profil.";
			var messages=["","","",msgFriend,""];
			features.redirection("search.ejs",res,req.params.login,"",messages,"",
				"","","",[true,"",""]);
		}
		else{
			connexion.query("INSERT INTO AIME (celui_qui_aime,celui_qui_est_aime) VALUES (?,?)",
				[req.params.login,req.params.user],(err,rows2,fields) => {
				if(err)	throw(err);
				else{
					connexion.query("SELECT * FROM AIME WHERE celui_qui_aime IN (?,?) AND "+
					"celui_qui_est_aime IN (?,?)",[req.params.login,req.params.user,
					req.params.login,req.params.user],(err,rows3,fields) => {
						var msgFriend="Vous avez aimé le profil de "+req.params.user;
						if(err)	throw(err);
						else if(rows3.length==2){
							// les utilisateurs d'identifiants login et user deviennent amis
							connexion.query("INSERT INTO AMI (user1,user2) VALUES (?,?)",
							[req.params.login,req.params.user],(err,rows4,fields) => {
								if(err)	throw(err);
								else{
									msgFriend="Vous êtes maintenant ami avec "+req.params.user;
									messages=["","","",msgFriend,""];
									features.redirection("search.ejs",res,req.params.login,"",
										messages,"","","","",[true,"",""]);
								}
							});
						}
						else{
							messages=["","","",msgFriend,""];
							features.redirection("search.ejs",res,req.params.login,"",messages,
							"","","","",[true,"",""]);
						}
					});
				}
			});
		}
	});
});
routes.post("/message/:login/:user",(req,res) => {
	var today = new Date();
	var d=String(today.getDate()).padStart(2,'0'),
	mo=String(today.getMonth()+1).padStart(2,'0'),
	y=today.getFullYear(),
	h=today.getHours(),
	mi=today.getMinutes();
	connexion.query("INSERT INTO MESSAGE (auteur,destinataire,contenu,date_envoi) VALUES (?,?,?,?)",
		[req.params.login,req.params.user,req.body.contenu,"Le "+d+"/"+mo+"/"+y+" à "+h+"h "+mi],
		(err,rows,fields) => {
		if(err)	throw(err);
		else{
			connexion.query("SELECT * FROM UTILISATEUR WHERE identifiantSite IN "
		+"(SELECT user2 FROM AMI WHERE user1=?) OR identifiantSite IN "
		+"(SELECT user1 FROM AMI WHERE user2=?)",[req.params.login,req.params.login],
		(err,rows,fields)=>{
			if(err)	throw(err);
			else{
				connexion.query("SELECT * FROM MESSAGE WHERE auteur IN (?,?) AND "+
					"destinataire IN (?,?) ORDER BY date_envoi",
				[req.params.login,req.params.user,req.params.login,req.params.user],(err,rows2,fields) => {
					if(err)	throw(err);
					else	features.redirection("friends.ejs",res,req.params.login,"",messages,
								"",rows,"","",["",req.params.user,rows2]);	
				});
			}
			});
		}
	});
});
module.exports=routes;