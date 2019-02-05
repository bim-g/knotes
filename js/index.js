app.controller("initreg",function($scope,actionBDD){
   $scope.showColors=function(){
        $scope.colors=!$scope.colors;
    };
    actionBDD.initBdd();
});

app.controller("initcategorie",function($scope,$location,$window,actionBDD,audio){
    alert();
    $scope.newcategorie='';
    $scope.infos='';
    $scope.howTo='';
    $scope.config='';
    $scope.colors=false;
    $scope.action=false;
    $scope.config=false;
    $scope.option=false;
    $scope.langColect=false;
    $scope.Welclang=false;
    //$scope.langue;
    $scope.showColors=function(){
        $scope.colors=!$scope.colors;
    };    
    $scope.togleOption=function(){
        $scope.option=!$scope.option;
    };
    //
   // $scope.categories=[];
    $scope.colorCate=null;
    $scope.none=0;
    $scope.openModal=function(modal){        
        switch(modal){
            case 'categorie':
                $scope.newcategorie='show';
                break;
            case 'about':
                $scope.infos='show';
                break;
            case 'manuel':
                $scope.howTo='show';
                break;
            case 'config':
                $scope.config='show';
                break;
        }
	};
    $scope.toggleColectLang=function(option){
        switch(option){
            case 'lang':
                $scope.langColect=!$scope.langColect;
            break;
            case 'voice':
                $scope.Welclang=!$scope.Welclang;
            break;
        }
    };
    // chargement des categiries
    $scope.chargement=function(){ 
        actionBDD.displayCategories(function(r){
            if(angular.isObject(r) && !angular.isUndefined(r)){ 
                $scope.categories=[]; 
                angular.forEach(r,function(value){                  				
                    $scope.categories.push(value);                    
                    if(r.length>0){
                        $scope.none=1;
                    } 
                });
            }else{
                alert(r);
            }
        });
    };
    $scope.chargement();
    //
    $scope.colorName=null;
    // creation du nouveau categorie
    $scope.newCategorie=function(){        
        $scope.colorName="w3-text-deep-purple";
        if($scope.selectColor!==undefined){
            $scope.colorName=$scope.selectColor;
        }
        if($scope.categorieName!==undefined){
            var data={  name:$scope.categorieName,
                        color:$scope.colorName
                    };
            actionBDD.createCategorie(data,function(r){
                if(r=="success"){
                    $scope.selectColor=undefined;
                    $scope.categorieName=undefined;
                    $scope.chargement();
                    $scope.newcategorie='hide';
                }
            });
        }else{
            $scope.erreur=true;
            $timeout(function(){
                $scope.erreur=false;
            },3000);            
        }
    };
    $scope.getArticles=function(id,name){
        var url="#!categorie/"+id+"/"+name;
        $location.path(url);
    };    
    // changement de la langue
    $scope.setLangue=function(){        
        if(!angular.isUndefined($scope.langue)){
            $window.localStorage.setItem("knoteLangue",$scope.langue);
            audio.setLangue(function(r){
                $scope.langue=r;
            });
            $scope.config='';
        }
    };   
    $scope.langue=$window.localStorage.knoteLangue;
});

app.controller("ctrlCategorie",function($scope,$routeParams,$location,actionBDD){
    
    $scope.idcat=$routeParams.idcat;
    $scope.option=false;
    $scope.btn=false;
    $scope.setprotection=false;
    $scope.securite=false;
    $scope.editcatgorie=false;
    $scope.about=false;

    $scope.none=0;
    $scope.len=0;
    $scope.toggleButton=function(){
        $scope.btn=!$scope.btn;
    };
    $scope.toggle=function(){
        $scope.option=!$scope.option;
    };

    $scope.showModal=function(src){
        switch(src){
            case 'protection':
            $scope.setprotection=true;
            break;
            case 'about':
            $scope.about=true;
            break;
            case 'edit':
            $scope.editcatgorie=true;
            break;
            case 'secur':
            // pour saisir le mot de pass avant la supressio ou la modification 
            $scope.delArticle=true;
            break;
        }
        $scope.toggleButton();
    };
    //
    $scope.loadArticle=function(){
        if($scope.idcat!=undefined){
            $scope.mesaticle=0;
            actionBDD.displayArticles($scope.idcat,function(r){
                $scope.articles=[];
                if(angular.isObject(r) && !angular.isUndefined(r) ){
                    angular.forEach(r,function(value){
                        $scope.articles.push(value);
                        $scope.len=$scope.articles.length
                        if($scope.len>0){
                            $scope.none=1;
                            $scope.mesaticle=1;
                        }
                    });
                }
            });       
            actionBDD.infosCategories($scope.idcat,function(r){
                if(angular.isObject(r) && !angular.isUndefined(r) ){
                    $scope.categorie=r;
                    $scope.categorieName=$scope.categorie.nomcat;
                    var cl=$scope.categorie.couleur;
                    $scope.couleurCat=cl.replace("-text","");
                    $scope.colorName=cl;
                    $scope.mydate=new Date($scope.categorie.datecreat);
                }else{
                    if(angular.isUndefined(r)){
                        $location.path();
                    }else{
                        console.log(r);
                    }
                }
            });       
        }else{
            $location.path();
        }
    };
    $scope.loadArticle();
    $scope.read=function(id){
        var url="#!lecture/"+id+"/"+$scope.idcat;
        $location.path(url);
    };
    $scope.testDel=function(src){
        switch(src){
            case 'article':
                if(confirm("Voulez-vous Supprimer l'article")){
                    $scope.testSecurity=function(id,src){
                        actionBDD.testSecurity(id,src,function(r){
                            if(r==null){
                                $scope.delArticle='show';
                            }else{
                                $scope.deleteArt();
                            }
                        });        
                    };
                }
            break;
            case 'dossier':
            if(confirm("Voulez-vous Supprimer le Dossier")){
                $scope.delArticle='show';
                $scope.deleteArt();
            }
        }
    };
    $scope.editCatgorie=function(){       
        if($scope.idcat!=undefined){
            if($scope.selectColor!==undefined){
                $scope.colorName=$scope.selectColor;
            }
            if($scope.categorieName.length!==undefined){
                var data={name:$scope.categorieName,couleur:$scope.colorName,id:$scope.idcat};
                actionBDD.updateCategorie(data,function(r){
                    if(r=="success"){
                        $scope.loadArticle();
                        $scope.editcatgorie='';
                    }
                });
            }else{
                $scope.erreur=true;
            }
        }else{
            alert("Impossible de modifier");
        }        
    };
    
    $scope.delElement=function(src,id){
        switch(src){
            case 'categorie':
            if(confirm("voulez-vous supprimer ce dossier?")){
                if(confirm("vous allez aussi supprimer aussi tous sont contenus.")){
                    if(!angular.isUndefined($scope.idcat)){
                        actionBDD.deleteCategorie($scope.idcat,function(r){
                            if(r=="success"){
                                $location.path("home");
                            }
                        });    
                    }else{
                        alert("Impossible de supprimer ce dossier");
                    }
                }
            }
            break;
            case 'article':
            if(confirm("Voulez-vous Supprimer cette article?")){
                if(!angular.isUndefined(id)){
                    actionBDD.removeArticle(id,function(r){
                        if(r=="success"){
                            $scope.loadArticle();
                        }else{
                            console.log(r);
                        }
                    });
                }else{
                    alert("Ne peut pas supprimmer l'Article");
                }
            }  
            break;
        }
    };
});

app.controller("creatArticle",function($scope,$routeParams,$location,actionBDD,audio){
    $scope.idcat=$routeParams.idCat;
    $scope.namecat=$routeParams.name;
    $scope.type=$routeParams.type;
    $scope.infos='';
    iFrameOn();
    $scope.num=0;
   
    $scope.Startspeech=function(){
        audio.ecrire(function(r){
            $scope.recording=true;
        });
    };
    $scope.Endspeech=function(){
        $scope.recording=false;
    };
    $scope.initPage=function(){
        switch($scope.type){
            case '2':            
                actionBDD.readArticle($scope.idcat,function(r){
                    if(angular.isObject(r) && !angular.isUndefined(r)){
                        if(angular.isObject(r) && !angular.isUndefined(r)){
                            $scope.article=r;
                            $scope.titleArt=$scope.article.nomArt;
                            window.frames[0].document.body.innerHTML=$scope.article.contenuArt;
                        }
                    }else{
                        console.log(r);
                    }
                });
                $scope.controlArticle=function(){
                    return $scope.modifierArticle();
                };
            break;
            case '1': 
                $scope.controlArticle=function(){
                    $scope.newArticle();
                };
            break;
        }
   };
   $scope.initPage();
    $scope.newArticle=function(){
        $scope.contentArt=window.frames[0].document.body.innerHTML;
        var data={  idCat:$scope.idcat,
                    nomArt:$scope.titleArt,
                    contenu:$scope.contentArt
                };
        if($scope.idcat!==undefined && $scope.titleArt!==undefined){
            actionBDD.insertArticle(data,function(r){
                if(r=="success"){
                    var url="categorie/"+$scope.idcat;
                    $location.path(url); 
                }                
            });
        }else{
            alert('none');
            if($scope.titleArt===undefined){
                alert("entrer le tire de votre article");
            }
        }
    };

    $scope.modifierArticle=function(){
        $scope.contentArt=window.frames[0].document.body.innerHTML;
        if(angular.isDefined($scope.titleArt) && angular.isDefined($scope.contentArt)&& angular.isDefined($scope.idcat)){
            var data={  name:$scope.titleArt,
                        contenu:$scope.contentArt,
                        id:$scope.idcat
                    };
            actionBDD.upadateArticle(data,function(r){
                if(r=="success"){
                    var url="lecture/"+$scope.idcat;
                    $location.path(url);
                }else{
                    console.log(r);
                }
            });
        }else{
            alert("Impossible d'appliquer la modification")
        }
    };
    // edit text
    $scope.iBold=function(){
        return iBold(); 	
    };
    $scope.iUnderline=function(){
        return iUnderline();
    };
    $scope.iItalic=function(){
        return iItalic(); 
    };
    
    $scope.iForeColor=function(id){
        //$rootScope.$apply(function(){
            iForeColor(id);
        //});
    };
});

app.controller("readArticle",function($scope,$routeParams,$location,actionBDD,audio){
    $scope.idArt=$routeParams.idArt;
    $scope.nameCat=$routeParams.nameCat;
    $scope.lecteur=false;
    $scope.play=false;
    actionBDD.readArticle($scope.idArt,function(r){        
        if(angular.isObject(r) && angular.isDefined(r)){
            $scope.article=r;
            $scope.mydate=new Date($scope.article.datecreart);
        
        }else{
            console.log(r);
        }
    });
    $scope.lireText=function(){        
        audio.lire($scope.article.contenuArt);
        $scope.play=!$scope.play;
    };
    $scope.StoplireText=function(){
        audio.stopRW();
        $scope.play=!$scope.play;
    };
    $scope.togleAudio=function(){
        $scope.lecteur=!$scope.lecteur;
    };
    $scope.deleteArt=function(){
        if(confirm("Voulez-vous Supprimer cette article?")){
            if(angular.isDefined($scope.idArt)){
                actionBDD.removeArticle($scope.idArt,function(r){
                    if(r=="success"){
                        var url="categorie/"+$scope.article.idcat;
                        $location.path(url);
                    }else{
                        console.log(r);
                    }
                });
            }else{
                alert("Ne peut pas suprimmer l'Article");
            }
        }            
    };
});

app.service("audio",function($window){
    let appNav=$window.navigator;
    let speech= new p5.Speech();
    
    this.setLangue=function(cb){
        var lang = $window.navigator.language;
        if($window.localStorage.knoteLangue){
            lang=$window.localStorage.knoteLangue;
        }    
        speech.setLang(lang);
        cb(lang);
    };
    this.lire=function(txt){
        this.stopRW();
        speech.speak(txt);
    };
    this.ecrire=function(cb){
        if(appNav.onLine){
            let speechMic = new p5.SpeechRec(lang); 
            speechMic.onResult = showResult; 
            speechMic.start(true,true);

            function showResult()
            {
                cb(speechMic.resultString); // log the result
            }
        }else{
            alert("vous devez etre connectez a internet pour utiliser cette fonction");
        }
    };
    this.setLang= function(lang,cb){
        speech.setLang(lang);
    };
    this.stopRW=function(){
        speech.stop();
    };
});

function clik(){
    alert("Hors Serie");
}