// gestion de l'editeur
//window.addEventListener("DOMContentloaded",iFrameOn);
var cible;
function iFrameOn(){
	window.frames[0].document.designMode = 'On';
	cible=window.frames[0].document;
}
function iBold(){
	cible.execCommand('bold',false,null); 	
}
function iUnderline(){
	cible.execCommand('underline',false,null);
}
function iItalic(){
	cible.execCommand('italic',false,null); 
}
function iFontSize(id){
	var e = _(id);
	var index = e.selectedIndex;
	var size = e.options[index].value;
	if((typeof size!="undefined") && parseInt(size)){
		cible.execCommand('FontSize',false,6);
	}	
}
function iForeColor(id){
	var e = _(id);	
	var color = e.value;	
	cible.execCommand('ForeColor',false,color);
}
function iBgColor(id){
	var e = _(id);	
	var color = e.value;	
	cible.execCommand('backColor',false,color);
}
function iFontName(id){
	var e = _(id);
	var index = e.selectedIndex;
	var name = e.options[index].value;
	cible.execCommand('FontName',false,name)
}
// function submit_form(id){
// 	var theForm = _(id);//on on recupere le nom du formulaire
// 	theForm.value = window.frames[0].document.body.innerHTML;//on recupere le textArea du formulaire dans le quel on va afficher les contenus de l'iframe
// 	//theForm.submit();
// }
function _(id){return document.getElementById(id);}