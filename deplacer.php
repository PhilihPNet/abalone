<?php 
if(isset($_POST['d'])){
			$fichier = fopen('deplacement', 'a'); 
					$comm = fputs($fichier, 'if(tour==');
					$comm = fputs($fichier, $_POST['tour']);
					$comm = fputs($fichier, '){'."\n");
					$comm = fputs($fichier, $_POST['d']."\n");
					$comm = fputs($fichier,	"billes[0].deSelectAll();"."\n".
											"joueur=joueur==0?1:0;"."\n".
											"afficheMessage(joueur);"."\n".
											"tour++;"."\n".
											"}"."\n");
					fclose($fichier); 
}
?>