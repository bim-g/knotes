app.service("actionBDD",function($window,$rootScope){
	//initialisation de la base de donne via angularsJS
	var mydb = $window.openDatabase('knte','1.0','k-note',5*1024*1024);
    var categorie="CREATE TABLE IF NOT EXISTS categorie (idcat INTEGER PRIMARY KEY AUTOINCREMENT, nomcat VARCHAR(18),couleur VARCHAR(12),datecreat DATETIME)";
    //--
    var article="CREATE TABLE IF NOT EXISTS article (idArt INTEGER PRIMARY KEY AUTOINCREMENT,idcat INTEGER, nomArt VARCHAR(18),contenuArt VARCHAR(5000),datecreart DATETIME,FOREIGN KEY (idcat) REFERENCES categorie(idcat))";
    //--
    var secutity="CREATE TABLE IF NOT EXISTS security (idsecu INTEGER PRIMARY KEY AUTOINCREMENT, nomsecu VARCHAR(10) DEFAULT 'ecriture' )";
    //reqsecurity="INSERT INTO security (nomsecu) VALUES ('ecriture')";
    //--
    var optionCategorie="CREATE TABLE IF NOT EXISTS optionCategorie (idoptcat INTEGER PRIMARY KEY AUTOINCREMENT, idcat INTEGER,idart INTEGER,type VARCHAR(10),idsecu INTEGER,motdepass VARCHAR(150),dateOperation DATETIME,FOREIGN KEY(idcat) REFERENCES categorie(idcat),FOREIGN KEY(idart) REFERENCES article(idArt),FOREIGN KEY(idsecu) REFERENCES security(idsecu))";  
   
    this.initBdd=function(){
        mydb.transaction(function(tx){
            tx.executeSql(categorie);		
        });
        mydb.transaction(function(tx){		
            tx.executeSql(article);		
        });
        mydb.transaction(function(tx){		
            tx.executeSql(secutity);		
        },error);
        mydb.transaction(function(tx){		
            tx.executeSql(optionCategorie);		
        });
	}
	//
	this.getSecu=function(cb){
		mydb.transaction(function(tx){
			tx.executeSql("SELECT * FROM security",[],function(tx,result){
				ln= result.rows.length;
				if(ln<1){
					tx.executeSql(reqsecurity,[],function(tx,result){
						$rootScope.$apply(function(){
							cb(result.rows);
						});
					});
				}
			},error);
		});
	};
	//initial
	this.displayCategories=function(cb){	
		var reqcat="SELECT * FROM categorie";
		mydb.transaction(function (tx){
			tx.executeSql(reqcat,[],function(tx,result){
				$rootScope.$apply(function(){
					cb(result.rows);
							});
			},error);
		});
	}
	//Categorie control
	this.infosCategories=function(id,cb){	
			var reqcat="SELECT * FROM categorie WHERE idcat=?";
			mydb.transaction(function (tx){
				tx.executeSql(reqcat,[id],function(tx,result){
					$rootScope.$apply(function(){
						cb(result.rows[0]);
								});
				},error);
			});
	}
	this.createCategorie=function(dt,cb){
		var req="INSERT INTO categorie (nomcat,couleur,datecreat) VALUES (?,?,DateTime())";
		mydb.transaction(function(tx){
			tx.executeSql(req,[dt.name,dt.color],function(tx,res){
				$rootScope.$apply(function(){
					cb("success");
				});		
			},error);
		});
	};

	this.updateCategorie=function(dt,cb){
		var req="UPDATE categorie SET nomcat=?,couleur=? WHERE idcat=?";
		mydb.transaction(function (tx){
			tx.executeSql(req,[dt.name,dt.couleur,dt.id],function(tx,result){
				$rootScope.$apply(function(){
					cb("success");
				});
			},error);
		});
	};
	this.deleteCategorie=function(id,cb){
		var req="DELETE FROM categorie WHERE idcat=?";
		var reqArt="DELETE FROM article WHERE idcat=?";
		mydb.transaction(function (tx){
			tx.executeSql(reqArt,[id],function(tx,result){
				tx.executeSql(req,[id],function(tx,result){
					$rootScope.$apply(function(){
						cb("success");
					});
				},function(tx,result){
					$rootScope.$apply(function(){
						alert("del Cat::"+result);
					});
				});
			},error);
		});
	};
	//----- Article -------
	this.displayArticles=function(id,cb){	
		var reqcat="SELECT * FROM article WHERE idcat=? ORDER BY datecreart DESC";
		mydb.transaction(function (tx){
			tx.executeSql(reqcat,[id],function(tx,result){
				$rootScope.$apply(function(){
					cb(result.rows)});
			},error);
		});
	};
	this.readArticle=function(id,cb){
		var reqcat="SELECT * FROM article WHERE idArt=?";
		mydb.transaction(function (tx){
			tx.executeSql(reqcat,[id],function(tx,result){
				$rootScope.$apply(function(){
					cb(result.rows[0]);
				});
			},error);
		});
	};
	this.insertArticle=function(dt,cb){
		var req="INSERT INTO article (idcat,nomArt,contenuArt,datecreart) VALUES (?,?,?,DateTime())";
		mydb.transaction(function(tx){
			tx.executeSql(req,[dt.idCat,dt.nomArt,dt.contenu],function(tx,res){
				$rootScope.$apply(function(){
					cb("success");
				});
			},error);
		});
	};
	this.upadateArticle=function(dt,cb){		
		var req="UPDATE article SET nomArt=?,contenuArt=? WHERE idArt=? ";
		mydb.transaction(function(tx){
			tx.executeSql(req,[dt.name,dt.contenu,dt.id],function(tx,res){
				$rootScope.$apply(function(){
					cb("success");
				});
			});
		},error);
	};
	this.removeArticle=function(id,cb){		
		var req="DELETE FROM article WHERE idArt=? ";
		mydb.transaction(function(tx){
			tx.executeSql(req,[id],function(tx,res){
				$rootScope.$apply(function(){
					cb("success");
				});
			});
		},error);
	};

});

function error(result){
	alert(result.message);
}