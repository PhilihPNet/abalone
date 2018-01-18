//L'architecture informatique ajax (acronyme d'asynchronous JavaScript and XML)
// permet de construire des applications Web et des sites web dynamiques interactifs
// sur le poste client en se servant de différentes technologies ajoutées aux navigateurs web entre 1995 et 2005.
//Ajax combine JavaScript, les CSS, JSON, XML, le DOM et le XMLHttpRequest

//j'utilise La fonction suivante telle qu'elle est écrite ici depuis 2005.
//	Elle permet 
//		d'envoyer une requête à un script PHP par la méthode POST.
//		d'appeler et d'éxécuter à la volée des fichiers .js.
//		d'insérer inline du html.

//le script PHP, après analyse des arguments de la requête, "peut" renvoyer des instructions en javascript:
// -mise à jour d'une variable javascript dans le script appelant,
// -appel à une fonction avec des arguments issus de l'analyse par le script PHP,
// -construction de nouveaux éléments dans le DOM de la page appelante,
// -changement de style/classe d'éléments de la page,
// ...et tellement plus encore! :-)
// Tout cela sans jamais rafraîchir la page appelante. (pas "d'effet de flash")
/*_______________________________________________________*/
//arguments: tous les arguments sont de type "string":
// -script		= le script php auquel on envoie la requête 
//					(ex: "script.php" ou "../autreRepertoire/script.php" ou "http://autrenomdomaine.net/script.php"),

// -ReponseType	= 	"js" pour exécuter du javascript,

//					ou rien pour insérer du html,
// -datas		= les arguments tels qu'on les aurait envoyé avec la méthode GET:séparés par"&"
//					(ex: "arg1=valeur1&arg2=valeur2(...)&argXXX=valeurXXX")
//					datas est optionel, on peut ne pas le renseigner.
//('Req'=requête)+Ajax;
function ReqAjax(script,ReponseType,datas){
if(ReqAjax.arguments.length==0)return false;
   var xhr_object = null;
   if(window.XMLHttpRequest)
	  xhr_object = new XMLHttpRequest();
   else if(window.ActiveXObject)
	  xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
   else {
	  alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
	  return false;
   }
	var methode="POST";//méthode (GET ou POST)
	var asynchrone=true;//mode asynchrone(true)/synchrone(false)
	//on pourrait les passer en argument dans la fonction: ReqAjax(script,datas, methode, asynchrone)
	xhr_object.open(methode,script ,asynchrone); 
	xhr_object.onreadystatechange = function() {
		if(xhr_object.readyState == 4){
			var r=
			 (ReponseType&&ReponseType=="js")
				?eval(xhr_object.responseText)
				:(
					(ReponseType&&(typeof(ReponseType)=="object")&&ReponseType.id)
					? ReponseType.innerHTML +=(xhr_object.responseText)
					:document.body.innerHTML +=(xhr_object.responseText)
				);

				if(typeof(codeHTML)=="undefined"){if(document.getElementById('codepage'))document.getElementById('codepage').innerHTML=document.body.parentElement.outerHTML.replace(/(<textarea[^]*>)[^]*(<\/textarea>)/gi,'').replace(/></mgi,">\n<").replace(/(<script[^]*>)\n<\/(script>)/mgi,"$1</$2").replace(/<br>/g,"<br>\n").replace(/<br>\n';/g,"<br>';").replace(/<br>\n";/g,'<br>";').replace(/\n\n/g,"\n");}
				else{codeHTML();}
		}

	};
   xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   xhr_object.send(datas);
}