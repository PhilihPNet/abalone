var limites=[[2,6],[2,7],[1,7],[1,8],[0,8],[1,8],[1,7],[2,7],[2,6]];
var MiseEnPlace=[[2,6],[2,7],[3,5]];

var h=[[],[]];for(var i=77;i<=428;i+=(428-77)/8)h[0].push(i);
//for(var i=70;i<=419;i+=(419-70)/8)h[1].push(i+((h[0][1]-h[0][0])/2));
var v=[];for(var i=60;i<=372;i+=(372-60)/8)v.push(i);

var info;
var x=40;
var y=40;
a=[];
var billes=[];
var scores=[0,0];
var joueurs=["black","white"]
var joueur;
var message=[
"les Noirs jouent",
"les Blancs jouent",
"les Blancs commencent!"//ce message en dernier
];
var tour=0;

function rapportDeForce(dh,dv,billeS/*index*/,fleche){
var ligneDeBilles=evaluerAlignement(dh,dv,[billeS/*billes[0].listSelected()[index]*/],fleche);
if(fleche&&ligneDeBilles.length>1) return false;

	var forces=[];
	for(var i=0;i<ligneDeBilles.length-1;i++)
		if(ligneDeBilles[i+1].couleur!=ligneDeBilles[i].couleur)forces.push(i+1);
		
		if(ligneDeBilles.length>5){return false;}
		if((forces.length==0)&&ligneDeBilles.length>3){return false;}
		
		if((forces.length>1)){return false;}
		if((forces[0]<1)||(forces[0]>3)){return false;}
		if((forces[0]<=(ligneDeBilles.length-forces[0]))){return false;}
		return true;
}
//var ligneDeBilles=evaluerAlignement(-1,-1,[billes[14]]);
function evaluerAlignement(dh,dv,ligneDeBilles,fleche){
var index=ligneDeBilles[ligneDeBilles.length-1].index;
var memoDH=dh;
var memoT=billes[index].t;
var memoL=billes[index].l;
var out=false;
//verticalement

	var t=billes[index].t+dv;
	
	if((t>8)||(t<0)){
		out=true;
		//ligneDeBilles.push('out');
		return ligneDeBilles;
	}
	
//horizontalement
	if(dv==0)
			dh=dh;
	if(dh>0){
		if(t%2==0){
			if(dv>0)dh=0;
			if(dv<0)dh=0;
		}
		if(t%2==1){
			if(dv>0)dh=dh;
			if(dv<0)dh=dh;
		}
	}
	if(dh<0){
		if(t%2==0){
			if(dv>0)dh=dh;
			if(dv<0)dh=dh;
		}
		if(t%2==1){
			if(dv>0)dh=0;
			if(dv<0)dh=0;
		}
	}
					
	var l=billes[index].l+dh;	
	if((l>limites[t][1])||(l<limites[t][0])){
		out=true;
		//ligneDeBilles.push('out');
		return ligneDeBilles;
	}
	//if(!out&&billes[index].listSelected().length==1){
		 var billesAPousser=prochaineBilleAPousser(l,t);
		if(billesAPousser){ligneDeBilles.push(billesAPousser);
			ligneDeBilles=evaluerAlignement(memoDH,dv,ligneDeBilles,fleche);
		}
	//}
return ligneDeBilles;
}
function prochaineBilleAPousser(l,t){
var bille=false;
	for (var i=0;i<billes.length;i++){
		if((billes[i].l==l)&&(billes[i].t==t))
			bille=(billes[i]/*[i,billes[i]]*/);
	}
	return bille;
}

function deplacer(dh,dv,index){//avant horizontal
//function vertical(dv,index){//avant horizontal
var memoDH=dh;
var memoT=billes[index].t;
var memoL=billes[index].l;
var t=billes[index].t;

	billes[index].t=billes[index].t+dv;
	
	if((billes[index].t>8)||(billes[index].t<0)){
	billes[index].out=true;
	}
	billes[index].t=billes[index].t>8?0:billes[index].t<0?8:billes[index].t;
//function horizontal(dh,dv,index){//après vertical
var t=billes[index].t;
		if(dv==0)
			dh=dh;
	if(dh>0){
		if(t%2==0){
			if(dv>0)dh=0;
			if(dv<0)dh=0;
		}
		if(t%2==1){
			if(dv>0)dh=dh;
			if(dv<0)dh=dh;
		}
	}
	if(dh<0){
		if(t%2==0){
			if(dv>0)dh=dh;
			if(dv<0)dh=dh;
		}
		if(t%2==1){
			if(dv>0)dh=0;
			if(dv<0)dh=0;
		}
	}
					
	var l=billes[index].l+dh;	
	if((l>limites[t][1])||(l<limites[t][0])){
	billes[index].out=true;
	}
	l=l>limites[t][1]?limites[t][0]:l<limites[t][0]?limites[t][1]:l;
	billes[index].l=l;
	

	if(!billes[index].out&&billes[index].listSelected().length==1){//>0){
		 var billesAPousser=billes[index].prochaineBilleAPousser();
		for(var i=0;i<billesAPousser.length;i++){
			deplacer(memoDH,dv,billesAPousser[i][0]);
		}
	}
	scores=[0,0];
	billes[0].listOut();

	billes[index].setTop(v[billes[index].t]);
	billes[index].setLeft(h[0][l]+((t%2==0)?0:-((h[0][1]-h[0][0])/2)));
	billes[index].selected=false;
}
function afficheMessage(n, m){document.getElementById('info').innerHTML=message[n]+(m?"&nbsp;"+m:"");}

function pad(){
for(var i=0;i<6;i++)
{
{	var f=document.createElement('div');
	f.id='f_'+(i);
	f.className='dir';
	//f.style.content='url(direction.svg)';
	f.style.transform='rotate('+(i*60)+'deg)';
	//    f.style.position='absolute';
    //f.style.zIndex='1';
    f.style.top =(y+(Math.sin((i*60)*Math.PI/180)*30))+'px';
    f.style.left=(x+(Math.cos((i*60)*Math.PI/180)*30))+'px';
		a[a.length]=[
		((Math.round((Math.sin((i*60)*Math.PI/180))*1000)/1000)==0?0:(Math.sin((i*60)*Math.PI/180))<0?-1:1),
		(((Math.abs(Math.cos((i*60)*Math.PI/180))*1000)/1000)==1?(Math.round((Math.cos((i*60)*Math.PI/180))*1000)/1000):(Math.cos((i*60)*Math.PI/180))<0?-1:1)
		];
}
	f.addEventListener('click',function(){
		if((billes.length>0)&&(billes[0].listSelected().length>0)){
			//var listSelected=billes[0].listSelected();
			
			if(billes[0].listSelected().length==1){
				billeS=billes[0].listSelected()[0];
			}
			else{//listSelected.length>1
				var tmpV=billes[0].listSelected().sort(function (a, b){return a.top - b.top;});
				var tmpH=billes[0].listSelected().sort(function (a, b){return a.left - b.left;});
				var billeS;
				if(tmpV[0].top-tmpV[tmpV.length-1].top==0){
					if(this.id.split('_')[1]==0)billeS=tmpH[0];
					if(this.id.split('_')[1]==3)billeS=tmpH[tmpH.length-1];
				}else{
					if(tmpV[0].left-tmpV[tmpV.length-1].left <0){
						if(this.id.split('_')[1]==1)billeS=tmpV[0];
						if(this.id.split('_')[1]==4)billeS=tmpV[tmpV.length-1];
					}
					if(tmpV[0].left-tmpV[tmpV.length-1].left >0){
						if(this.id.split('_')[1]==2)billeS=tmpV[0];
						if(this.id.split('_')[1]==5)billeS=tmpV[tmpV.length-1];
					}
				}
			}
			if(billeS){
				var rapportF=rapportDeForce(a[this.id.split('_')[1]][1],a[this.id.split('_')[1]][0],billeS);
				if(!rapportF)return false;
				billes[0].deSelectAll();
				billeS.selected=true;
				//deplacer(a[this.id.split('_')[1]][1],a[this.id.split('_')[1]][0],billeS.index);
				ReqAjax('deplacer.php','js','&d=billes['+billeS.index+'].selected=true;deplacer('+(a[this.id.split('_')[1]][1])+','+(a[this.id.split('_')[1]][0])+','+(billeS.index)+');'+'&tour='+tour);
			}else{
				var rapportF=true;
				for(var i=billes[0].listSelected().length-1;i>=0;i--)
					rapportF=rapportF&&(rapportDeForce(a[this.id.split('_')[1]][1],a[this.id.split('_')[1]][0],billes[0].listSelected()[i],true));
				if(rapportF){var dep="";
					for(var i=billes[0].listSelected().length-1;i>=0;i--)
						//deplacer(a[this.id.split('_')[1]][1],a[this.id.split('_')[1]][0],billes[0].listSelected()[i].index);
						dep+='deplacer('+(a[this.id.split('_')[1]][1])+','+(a[this.id.split('_')[1]][0])+','+(billes[0].listSelected()[i].index)+');';
						ReqAjax('deplacer.php','js','&d='+dep+'&tour='+tour);
				}
				else{
					billes[0].deSelectAll();
					afficheMessage(joueur, "les déplacements en \"flèche\" ne peuvent pas pousser de billes!!!");
					return false;
				}	
				}
			
			}
			//billes[0].deSelectAll();
			//joueur=joueur==0?1:0;
			//afficheMessage(joueur);
		
	});

	document.getElementById('pave').appendChild(f);
}
}
function initScores(){
scores=[0,0];

			var i=document.createElement('div');
			i.id="scoresNoirs";
			i.innerHTML="0";
			i.className="scores";
			i.style.position="absolute";
			i.style.top=0;
			i.style.left=(parseInt(document.getElementById('jeu').style.width)-55)+'px';
			i.style.width="55px";
			i.style.height="55px";
			i.style.fontSize="50px";
			i.style.padding='2.5px';
			document.body.appendChild(i);
			var i=document.createElement('div');
			i.id="scoresBlancs";
			i.innerHTML="0";
			i.className="scores";
			i.style.position="absolute";
			i.style.top=(parseInt(document.getElementById('jeu').style.height)-55)+'px';
			i.style.left=(parseInt(document.getElementById('jeu').style.width)-55)+'px';
			i.style.width="55px";
			i.style.height="55px";
			i.style.fontSize="50px";
			i.style.padding='2.5px';
			document.body.appendChild(i);


}
var bille= function (parent){
this.parent=parent;
	this.couleur='black';
	this.top=0;
	this.left=0;
	this.l=0;
	this.t=0;
	this.index=(this.parent.length);
	this.selected=false;
	this.out=false;
	var b=document.createElement('section');
	b.className="bille";
	b.parent=this;
	b.addEventListener('click',function(){
		if(this.parent.out)return false;
		if(this.parent.couleur!=joueurs[joueur])return false;

		if(!this.parent.controleSelection(this.parent)){
			var memoselect=this.parent.selected;
			this.parent.deSelectAll();
			this.parent.selectedmemoselect=memoselect;

		//return false;
		}
		this.parent.selected=!this.parent.selected;
		var typecss='num';
		if(this.parent.o.getElementsByClassName(typecss)[0])this.parent.o.getElementsByClassName(typecss)[0].parentNode.removeChild(this.parent.o.getElementsByClassName(typecss)[0]);
		if(this.parent.selected){
			var i=document.createElement('span');
			i.setAttribute('data-attr',(String(this.parent.index+1).length<2?'0':'')+(this.parent.index+1));
			i.className=typecss;
			this.parent.o.appendChild(i);
		}
	});
	this.o=b;
	var fond=document.createElement('figure');
	fond.className="ball "+this.couleur;
	this.fond=fond;
	b.appendChild(fond);
	document.getElementById('jeu').appendChild(b);
}

bille.prototype.controleSelection=function(ctx){		
		if(ctx.out)return false;
		if(ctx.couleur!=joueurs[joueur])return false;
		if((ctx.listSelected().length==3)&&(!ctx.selected)){
			afficheMessage(joueur, "3 BILLES MAXIMUM!!!");
			return false;
		}
		afficheMessage(joueur);
	
	{contigus=true;
	//-la selection des billes se fait une par une.

		//-si il n'y a déja au moins une bille sélectionnée: (ici on ne sera pas au plus qu'à 2 billes déjà sélectionnées)
		if(ctx.listSelected().length>=1){
				//-quand on arrive ici, si la bille cible n'est pas selectionnée, alors elle sera candidate à la selection
				if(!ctx.selected){
									var tmp=billes[0].listSelected();
									tmp.push(ctx);
				}
				//si elle est déjà sélectionnée, sa désélection peut nuire à la continuité
				else{
								var tmp=[];
								for(var i=0;i<billes[0].listSelected().length;i++)
								if(billes[0].listSelected()[i]!==ctx)tmp.push(billes[0].listSelected()[i]);
				}
			//-si à ce moment, le nombre de billes sélectionnées est au moins de 1 alors, sa distance en 'l' et en 'h' avec la nouvelle bille ne doit pas être supérieure à 1 unité (h[0][1]-h[0][1])(/2?).
						var tmpH=tmp.sort(function (a, b) {return a.left - b.left;});
						contigus=[];
				for(var i=0;i<tmpH.length-1;i++)
					contigus.push(tmpH[i+1].left-tmpH[i].left);
					//-si à ce moment, le nombre de billes pré-sélectionnées est de 2 alors leur distance en 'l' et en 'h' ne doit pas être supérieure à 1 unité (h[0][1]-h[0][1])(/2?).
					if(contigus.length==1)
						contigus=(((contigus[0]==h[0][1]-h[0][0])||(contigus[0]==(h[0][1]-h[0][0])/2)))?true:false;
				
					//-si à ce moment, le nombre de billes pré-sélectionnées est de 3 alors elle doit être alignée en 'l' et en 'h' avec les 2 autres,
					//	et sa distance en 'l' et en 'h' ne doit pas être supérieure à 1 de l'une des 2 autres.
					if(contigus.length==2)contigus=((contigus[0]==contigus[1])&&((contigus[0]==h[0][1]-h[0][0])||(contigus[0]==(h[0][1]-h[0][0])/2)))?true:false;
				if(contigus){//test en vertical
						var tmpH=tmp.sort(function (a, b) {return a.top - b.top;});
						contigus=[];
				for(var i=0;i<tmpH.length-1;i++)
					contigus.push(tmpH[i+1].top-tmpH[i].top);
					//-si à ce moment, le nombre de billes pré-sélectionnées est de 2 alors leur distance en 'h' ne doit pas être supérieure à 1 unité (h[0][1]-h[0][1])(/2?).
					if(contigus.length==1)
						contigus=(((contigus[0]==v[1]-v[0])||(contigus[0]==(v[1]-v[0])/2))||(contigus[0]==0))?true:false;
				
					//-si à ce moment, le nombre de billes pré-sélectionnées est de 3 alors elle doit être alignée en 'h' avec les 2 autres,
					//	et sa distance en 'h' ne doit pas être supérieure à 1 de l'une des 2 autres.
					if(contigus.length==2)contigus=((contigus[0]==contigus[1])&&((contigus[0]==v[1]-v[0])||(contigus[0]==(v[1]-v[0])/2)||(contigus[0]==0)))?true:false;
				
				}
		}
		if(!contigus){
			afficheMessage(joueur, "&nbsp;LES BILLES DOIVENT ÊTRE ALIGNÉES ET SE TOUCHER");
			return false;
		}
		return true;
	}	
}
bille.prototype.setColor=function(color){
	this.couleur=color;
	this.fond.className="ball "+color;
}
bille.prototype.setTop=function(top){
	this.top=(this.out?(this.couleur=="black"?-2:430):top);
	this.o.style.top=this.top;
}
bille.prototype.setLeft=function(left){
	this.left=left;
	this.o.style.left=left;
}
bille.prototype.listSelected=function(){
var tmp=[];
	for (var i=0;i<this.parent.length;i++){
	if(this.parent[i].selected)tmp.push(this.parent[i]);
	}
	return tmp;
}
bille.prototype.deSelectAll=function(){
	for (var i=0;i<this.parent.length;i++){
		var typecss='num';
		if(this.parent[i].o.getElementsByClassName(typecss)[0])this.parent[i].o.getElementsByClassName(typecss)[0].parentNode.removeChild(this.parent[i].o.getElementsByClassName(typecss)[0]);
		this.parent[i].selected=false;
	}
}
bille.prototype.prochaineBilleAPousser=function(){
var tmp=[];
	for (var i=0;i<this.parent.length;i++){
		if((this.parent[i]!==this)&&(this.parent[i].l==this.l)&&(this.parent[i].t==this.t))tmp.push([i,this.parent[i]]);
	}
	return tmp;
}
bille.prototype.listOut=function(){
	for (var i=0;i<this.parent.length;i++){
		if(this.parent[i].out)scores[this.parent[i].couleur=='black'?0:1]=scores[this.parent[i].couleur=='black'?0:1]+1;;
	}
	document.getElementById('scoresNoirs').innerHTML=scores[1];
	document.getElementById('scoresBlancs').innerHTML=scores[0];
	if((scores[0]>=6)||(scores[1]>=6)){
		ReqAjax('nouvellePartie.php','js','&i');
		//alert("Victoire "+((scores[1]>=6)?"NOIRS":"BLANCS"));
		//init();
	}
	return scores;
}

function init(){
document.getElementById('pave').innerHTML="";
	for (var i=document.getElementsByClassName('bille').length-1;i>=0;i--)
		document.getElementsByClassName('bille')[i].parentNode.removeChild(document.getElementsByClassName('bille')[i]);
	for (var i=document.getElementsByClassName('scores').length-1;i>=0;i--)
		document.getElementsByClassName('scores')[i].parentNode.removeChild(document.getElementsByClassName('scores')[i]);
		if(document.getElementById('r'))document.getElementById('r').parentNode.removeChild(document.getElementById('r'));
billes=[];

pad();
initScores();

for(var i=0;i<MiseEnPlace.length;i++)
 for(var j=MiseEnPlace[i][0];j<=MiseEnPlace[i][1];j++){
	var n=billes.length;
	billes[n]=new bille(billes);
	billes[n].t=i;billes[n].l=j;//limites[billes[n].t][0]+n;
	deplacer(0,0,n);
	}
for(var i=0;i<MiseEnPlace.length;i++)
 for(var j=MiseEnPlace[i][1];j>=MiseEnPlace[i][0];j--){
	var n=billes.length;
	billes[n]=new bille(billes);
	billes[n].setColor('white');
	billes[n].t=8-i;billes[n].l=j;//limites[billes[n].t][0]+n;
	deplacer(0,0,n);
	}

	joueur=1;
	afficheMessage(message.length-1);//"Les Blancs commencent";


//var r=document.createElement('iframe');
//	r.id="r";
// 	r.src="https://drive.google.com/viewerng/viewer?url=http://prototype.philihp.net/abalone/abalone.pdf? pid=explorer&efh=false&a=v&chrome=false&embedded=true";
//r.width="560px";r.height="160px"; 
//document.body.appendChild(r);

}
