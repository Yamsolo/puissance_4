// Tapez votre code Javascript ici
// Tapez votre code Javascript ici
/*
function IA(largeur)
{
  return(Hasard(largeur));
}
*/

function recherche_horizontale(longueur, largeur, plateau)
{
  var i = 0;
  var j = 0;
  var p = 0;
  var colonne = 0;
  var max = [];
  max[0] = [];
  var x = 0;
  var compteur = [];
  
  while (j + 3 < longueur)
  {
    i = 0;
    while (i < largeur)
    {
      compteur[x] = [];
      compteur[x][0] = 0;
      p = 0;
      while (p < 4)
      {
        if (plateau[j][i + p] == "(x)")
          compteur[x][0] = compteur[x][0] + 1;
        else if (plateau[j][i + p] == "(o)")
          compteur[x][0] = 0;
        p++;
      }
      if (compteur[x][0] > max)
      {
        max[0][0] = j+ 1;
        max[0][1] = i + 1;
      }
      //Ecrire(max);
//      Ecrire(compteur[x][0]);
      i++;
      x++;
    }
    j++;
  }
  Ecrire(max);
  return(max);
}

function recherche(longueur, largeur, plateau)
{
  recherche_horizontale(longueur, largeur, plateau);
}

function IA(longueur, largeur, plateau)
{
  recherche(longueur, largeur, plateau);
  return(-1);
}

function creation_carte(longueur, largeur)
{
	var plateau = []; // je créé un premier tableau
	var i = 0;
	var j = 0;

	while (j < longueur) // on parcourt chaque case jusqu'à la longueur du tableau défini par le joueur
	{
		i = 0;
		plateau[j] = []; // chaque case de mon tableau sera un tableau
		while (i < largeur) // on parcourt de même pour la largeur !
        {
    		plateau[j][i] = '( )'; // initialisation de chaque case
    		i++;
        }
  	  	j++;
	}
  return(plateau);
}

function affichage_carte(plateau)
{
	for (var i = plateau.length - 1; i >= 0; i--) // je pars de la fin de mon premier tableau pour que [0][0] soit en bas à gauche
	  Ecrire(plateau[i]);
}

function jouer(plateau, joueur, nb, longueur, largeur)
{
  	var x = 0;
	var y;
  	var test = 0;
  	
  	Ecrire(joueur+ " à toi de jouer");
    (nb == 1 ? y = enEntier(Saisie("Quelle colonne?") - 1) : y = IA(longueur, largeur, plateau));
  	if (y == -1)
      return(1);
    if (y > largeur - 1) // on demande la colonne, on vérifie si c'est bien.
    {
      Ecrire("pas assez de colonne");
      return(1);
    } // saisie - 1 pour ne pas choisir la "zérotième collone"
  	do
    {
      if (plateau[x][y] == "( )")
      {
        (nb == 1 ? plateau[x][y] = "(x)" : plateau[x][y] = "(o)"); // une ternaire pour savoir quel joueur joue !
        test = 1;
      }
      else
        x++; // si la ligne une est prise, on monte pour le mettre au dessus!
    } while (x < longueur && test == 0); // une boucle DO ! #proud #lol
	if (test == 0)
    {
      Ecrire("colonne pleine !");
	  jouer(plateau, joueur, nb, longueur, largeur);
    }
	else
    {
	  EffacerEcran();
      affichage_carte(plateau);
    }
    return(plateau);
}

function verification_horizontale(plateau, longueur, largeur)
{
  var i;
  var j;
  
  j = 0;
  while (j < longueur) // parcourt du tableau dans la longueur
  {
    i = 0;
	while(i + 3 < largeur) // ici dans la largeur de chaque longueur. x + 3 car on vérifie 3 pions plus loin
    {
      if (plateau[j][i] != '( )'
         && (plateau[j][i] == "(x)" && plateau[j][i + 1] == "(x)" && plateau[j][i + 2] == "(x)"
             && plateau[j][i + 3] == "(x)") // on vérifie si horizontalement on a 3 x
         || (plateau[j][i] == "(o)" && plateau[j][i + 1] == "(o)" && plateau[j][i + 2] == "(o)"
            && plateau[j][i + 3] == "(o)")) // ou trois o
      {
        Ecrire("Victoire!");
        return(1); // on retourne 1 pour annoncer la victoire
      }
      else
        i++; // sinon on avance
    }
    j++; // rien dans cette partie, on avance
   }
  return(0); // on retour 0, pas de victoire avec cette vérification.
}

function verification_verticale(plateau, longueur, largeur)
{
  var i = 0;
  var j;
  
  while (i < largeur) // on parcourt le tableau en largeur
  {
    j = 0;
    while (j + 3 < longueur) // puis en longueur dans chaque largeur
    {
      if (plateau[j][i] != "( )"
          && (plateau[j][i] == "(x)" && plateau[j + 1][i] == "(x)" && plateau[j + 2][i] == "(x)" 
               && plateau[j + 3][i] == "(x)") 
         || (plateau[j][i] == "(o)" && plateau[j + 1][i] == "(o)" && plateau[j + 2][i] == "(o)" 
               && plateau[j + 3][i] == "(o)")) // on vérifie si y'en a 4 pareil
      {
        Ecrire("Victoire");
      	return(1); // on annonce que la partie est terminée
      }
      else
        j++;
    }
    i++;
  }
  return(0);
}

function verification_diagonale_droite(plateau, longueur, largeur) // toute les vérifications se ressemblent..
{
  var i = 0;
  var j = 0;
  
  while (j + 3 < longueur)
  {
    i = 0;
    while (i + 3 < largeur)
    {
      if (plateau[j][i] != "( )" && (plateau[j][i] == "(x)" && plateau[j + 1][i + 1] == "(x)"
                                    && plateau[j + 2][i + 2] == "(x)" && plateau[j + 3][i + 3] == "(x)")
         || (plateau[j][i] == "(o)" && plateau[j + 1][i + 1] == "(o)"
                                    && plateau[j + 2][i + 2] == "(o)" && plateau[j + 3][i + 3] == "(o)"))
      {
        Ecrire("Victoire !");
        return(1);
      }
      else
        i++;
    }
    j++;
  }
  return(0);
}

function verification_diagonale_gauche(plateau, longueur, largeur)
{
  var i = largeur - 1;
  var j = 0;
  
  while (j + 3 < longueur)
  {
    i = largeur - 1;
    while (i - 3 >= 0)
    {
      if (plateau[j][i] != "( )" && (plateau[j][i] == "(x)" 
                                    && plateau[j + 1][i - 1] == "(x)"
                                    && plateau[j + 2][i - 2] == "(x)" 
                                    && plateau[j + 3][i - 3] == "(x)")
        || (plateau[j][i] == "(o)" && plateau[j + 1][i - 1] == "(o)"
                                    && plateau[j + 2][i - 2] == "(o)" 
            						&& plateau[j + 3][i - 3] == "(o)"))
      {
        Ecrire("Victoire !");
        return(1);
      }
      else
        i--;
    }
    j++;
  }
  return(0);
}

function verification(plateau, longueur, largeur)
{
  if (verification_horizontale(plateau, longueur, largeur) == 1) // verification horizontale de victoire
    return(1); // on return 1 pour annoncer que la partie est terminée
  if (verification_verticale(plateau, longueur, largeur) == 1)
    return(1);
  if (verification_diagonale_droite(plateau, longueur, largeur) == 1)
    return(1);
  if (verification_diagonale_gauche(plateau, longueur, largeur) == 1)
    return(1);
  // vérification diagonale
}

// C'est ici que tout commence.
var largeur = Saisie("Largeur du plateau");
var longueur = Saisie("Longueur du plateau");
var joueur1 = Saisie("Nom du joueur 1");
var joueur2 = Saisie("Nom du joueur 2");
var plateau = creation_carte(longueur, largeur); // création de la carte
affichage_carte(plateau);
while (42)
{
	if ((plateau = jouer(plateau, joueur1, 1, longueur, largeur)) == 1) // on actualise le plateau en fonction du choix de J1 
      break; // si la fonction jouer retourne 1, il y erreur on arrête la partie.
  	if (verification(plateau, longueur, largeur) == 1) // verification de victoire pour J1
      break; // la partie est terminée
    if ((plateau = jouer(plateau, joueur2, 2, longueur, largeur)) == 1)
      break; 
  	if (verification(plateau, longueur, largeur) == 1) // verification de victoire pour le J2
      break;
}

