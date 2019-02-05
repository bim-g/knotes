"use strict";
var loclan="";
var navlan="";
navlan = window.navigator.language;
if(navlan=="en-US" || navlan=="en-GB"){
	loclan="en";
}else{
	loclan="fr";
}
var langue={
	fr:{mainmenu:{
			categorie:"categorie",
			article:"article",
			config:"config",
			recherche:"recherche",
			apropos:"Apropos"
		},
		addCategorie:{
			choixCouleur:"Choisir la Couleur pour votre categorie",
			saisieNom:"Entrer le nom de la Categorie",
			btncreer:"creer",
			msgDossieVide:function(txt){
				return "le Dossier \""+txt+"\" est vide";
			}
		},
		AjoutArticle:{
			btnAnnuler:"Annuler",
			btnEnregister:"Enregister",
			btnModifier:"Modifier",
			SelectionCategorie:"Selectionner La categorie",
			TitreArticleholder:"Titre de l'article",
			NoteArticle:"Votre Note",
			msgChampVide:"un de champ doit etre compteter",
			msgErreurpswd:"Vous avez saisie un mot de pass incorrect",
			msgChoixCategorie:"Selectionnez une categorie",
			msgSuprimArticle:"Voulez-vous Supprimer Cet Article?",
			msgSuprimSecuArticle:"Voulez-Vous Enlerver le securite de cet Article?",msgSuprimSecuArticle:"Voulez-Vous Enlerver le securite de cet Article?",
			inputpswdArticle:"Entrer le mot de pass De confirmation pour deverouiller",
			typeSecuArticle:"Selection de type de securite",
			typeSecuArticleRead:"Lecture",
			typeSecuArticleWrite:"Ecriture",
			typeSecupswd:"Entrer le mot de pass",
			typeSecuConfpswd:"Confirmer votre mot de pass",
			btntypeSecuEnregist:"Enregister",deverouillerArticle:"Entrer le mot de pass pour lire l'Article",
			btntypeSecuAnnluer:"Annuler",
			btnModifierArticle:"Veillez selectionner une categorie",
			msgModificationArticle:"Modification Effectuer avec Succes",btnOuvrirSecuArticle:"Ouvrir",
			btnRemoveSecuArticle:"Detacher",
			btnDeleteSecuArticle:"Delete"
		},
		categoriemenu:{
			modifier:"Modifier"	,
			suprmDos:"Suprimer",
			btnRetourCategorie:"Retour"			
		},
		categorieModifier:{
			btnPersonnaliser:"Personnaliser",
			btnSecurise:"Securiser",
			BanierTitre:"Personnaliser votre Dossier",
			Choicouleur:"Choisissez la nouvelle couleur",
			btnModifier:"Enregistrer Modification",
			msgCorrectColor:"Choisisser une couleur Correct",
			msgSuprimerDossier:"Voulez-Vous Suprimer ces Dossier?\n Ce la va aussi suprimer les Articles lui apartenant"			
		},
		nocategorie:"Pas de Dossier, veiller creer une pour Creer un article",
		noarticle:"Pas d'Article",		
		msgReadArticlereponseSgbd:"impossible de faire la modification \n Aucune donnee a traiter",
		msgquitter:"voulez-vous quitter?"
	},
	en:{mainmenu:{
			categorie:"Category",
			article:"Article",
			config:"Config",
			recherche:"research",
			apropos:"About"
		},
		addCategorie:{
			choixCouleur:"Chose the Color of your category",
			saisieNom:"Enter Category Name",
			btncreer:"Creat",
			msgDossieVide:function(txt){
				return "Your folder \""+txt+"\" is empty";
			}
		},
		AjoutArticle:{
			btnAnnuler:"Cancel",
			btnEnregister:"Save",
			btnModifier:"Modifier",
			SelectionCategorie:"Select a categori",
			TitreArticleholder:"Article Title",
			NoteArticle:"Your Note",
			msgChampVide:"All input should be complete",
			msgErreurpswd:"You write a bad password",
			msgChoixCategorie:"Select a category",
			msgSuprimArticle:"Are you sure you want to delete this Article?",
			typeSecuArticle:"Choose Protection type",
			msgSuprimSecuArticle:"Are you sure, you want to remove security on this Article?",
			inputpswdArticle:"Enter your PassWord for confirmation",
			typeSecuArticleRead:"Read",
			typeSecuArticleWrite:"Write",
			typeSecupswd:"Put Password",
			typeSecuConfpswd:"Confirm your password",
			btntypeSecuEnregist:"Save",
			btntypeSecuAnnluer:"Cancel",
			btnModifierArticle:"Chose a category please",
			deverouillerArticle:"Entrer PassWord to read this Article",
			btnOuvrirSecuArticle:"Open",
			btnRemoveSecuArticle:"Detached",
			msgModificationArticle:"Update saved",
			btnDeleteSecuArticle:"Delete"
		},
		categoriemenu:{
			modifier:"Update",
			suprmDos:"Delete",
			btnRetourCategorie:"Back"
		},
		categorieModifier:{
			btnPersonnaliser:"Customize",
			btnSecurise:"Secure",
			BanierTitre:"Customise your Folder",
			Choicouleur:"Chose new color",
			btnModifier:"Save Modification"	,
			msgCorrectColor:"choose the correct color",
			msgSuprimerDossier:"Are you sure, you want to delete this Folder?\n it will remove also all article inside"			
		},
		nocategorie:"There is no Folder, create one if you want to create an article",
		noarticle:"There is no Article",		
		msgReadArticlereponseSgbd:"impossible to do modification\n There is No data",
		msgquitter:"Do want to quit?"		
		}
};