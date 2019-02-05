var app=angular.module("knote",["ngRoute","ngSanitize"]);
//configuration de l'application
app.config(function($routeProvider) {
    $routeProvider
		.when("/home", {templateUrl :"pages/home.html"			
			})
		.when("/categorie/:idcat", 
			{
				templateUrl :"pages/categorie.html",
				controller:"ctrlCategorie"
			})
		.when("/creat/:idCat/:type", 
			{
				templateUrl :"pages/editenote.html",
				controller:"creatArticle"
			})
		.when("/lecture/:idArt", 
			{
				templateUrl :"pages/lecteur.html",
				controller:"readArticle"
			})
		.otherwise({redirectTo:"/home"});
});

app.directive("controlCat",function(){
	return{
		templateUrl:'pages/controlCategorie.html'
	}
});

