/*
    LIFWEB 2025 -- CC2 TP noté
    SUJET 1 - 10:00

    Compléter les exercices demandés en 60 minutes (hors tiers-temps).
    Déposer dans la cellule correspondante de Tomuss le fichier JS complété et UNIQUEMENT ce fichier.

    Rendu attendu : https://tabard.fr/dd/lifweb-CC2-1-2025.mov

    Les exercices 1 à 3 sont liés, faites les dans l'ordre.

    Les rendus par mail ne seront PAS pris en compte (sauf tiers-temps).
    Un fichier qui ne se charge pas correctement ne sera PAS pris en compte.

    Tous les documents et l'accès à internet sont autorisés : votre code, les corrections, MDN, stack-overflow, etc.
    Vous pouvez utiliser votre ordinateur personnel ou les ordinateurs de la salle de TP.

    Toute communication entre humains est INTERDITE.
    Les IAs/LLMs (ChatGPT, GitHub Copilot, etc.) sont INTERDITS.
    Si vous utilisez Copilot ou un outil similaire dans votre IDE, DÉSACTIVEZ-LE.
*/

// Exercice 1 (4 points)
//
// À partir du jeu de données chargé dans la constante globale data, compléter
// la fonction getProprietesUniques() pour qu'elle retourne le tableau javascript
// suivant qui contient les propriétés des recettes :
// ["Végétarien", "Sans gluten", "Classique", "Sans lactose", "Végétalien"]
//
// En vous appuyant sur cette liste, remplir le menu déroulant <select>
// déjà présent dans le fichier HTML via la fonction remplirSelect().
//
// Favoriser les bonnes pratiques vues en cours que ce soit sur les boucles,
// La manipulation du DOM, ou la manipulation de tableau javascript.
//
function getProprietesUniques() {
  /* TODO */
  // Une constante globale data définie dans lifweb-2025-cc2-sujet-1-data.js est disponible
  // trie du tableau pour avoir que les propriétés des recettes avec map
  const tab = data.recettes.map(r => r.propriete);
  // convertir en tableau[... Set] et éliminer les doublons avec new Set
  const tabSd = [... new Set(tab)];
  return tabSd;
}

function remplirSelect() {
  //recupere tabSd de getProprietesUniques
  const tableauProprietes = getProprietesUniques();
  // je recupere le select dans le DOM
  const select = document.querySelector("#type-recettes");
  // pour chaque propriété, créer une option et l'ajouter au select
  tableauProprietes.forEach((r)=>{
    // créer une option
    const opt = document.createElement("option");
    // lui donner une val et un texte
    opt.value = r;
    opt.textContent = r;
    // l'ajouter au select
    select.appendChild(opt);
  });

}

remplirSelect();

// En cas de blocage, pour passer à la suite
// vous pouvez mettre le code suivant dans le <select> du fichier HTML :
//
// <option value="Végétarien">Végétarien</option>
// <option value="Sans gluten">Sans gluten</option>
// <option value="Classique">Classique</option>
// <option value="Sans lactose">Sans lactose</option>
// <option value="Végétalien">Végétalien</option>
//

// Exercice 2 (6 pts)
//
// Ajouter de manière programmatique un event listener sur le <select>.
// Suite au choix d'un élément du menu, remplir la balise <nav> déjà présente
// avec une liste des recettes correspondant à la propriété choisie dans le menu.
//
// Chaque element de la liste devra être au format suivant :
// "NOM RECETTE - 32 minutes"
// chaque élément de la liste sera un lien pointant vers le json de la recette
//
// Privilégier l'utilisation de map() plutôt qu'une boucle.
//
// Voici le résultat attendu à la fin des exercices 2 et 3 inclus :
// https://tabard.fr/dd/lifweb-CC2-1-2025.mov
//
// En cas de nouvelle sélection dans le menu, la liste sera mise à jour.
//
// Pour avoir la totalité des points, l'écrire de la façon la plus
// concise et fonctionnelle possible.
//
// La moitié des points est attribuée pour une solution correcte mais
// qui utilise des variables mutables ou des boucles.

function exo2() {
  // TODO
  // je recupere le select
    const select = document.querySelector("#type-recettes");
  // ajouter un event sur le select
    select.addEventListener("change",(e)=>{
// je recupere la valeur selectionner 
    const ev = e.target.value;
//Je filtre le select pour avoir que les propriété de ev 
    const recetteFiltre = data.recettes.filter(r =>r.propriete === ev);
    // je recupere le nav
    const nav = document.querySelector("nav");
    // je cree la liste des recettes
    const listeRecettes = document.createElement("ul");
    // je cree element liste
    const elem = recetteFiltre.map(r=> {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = `${r.nom} - ${r.duree_preparation} minutes`;
      a.href = r.link;
      li.appendChild(a);
      return li;
    })
    // j'ajoute elem a ul
    elem.forEach((e) => {
      listeRecettes.appendChild(e);
    }); 
    // je vide le nav et j'ajoute la liste 
    nav.innerHTML = "";
    nav.appendChild(listeRecettes);
});

  // cet appel sera nécessaire pour l'exercice suivant
  exo3();
}

exo2();

// Exercice 3 (7 pt)
//
// Ajouter un listener de clic sur tous les éléments <a> de la page (1 pt), qui va :
// 1. Bloquer le comportement par défaut du clic  (1 pt)
// 2. Télécharger le fichier JSON correspondant à la recette. (2pt)
//    Utiliser un style async/await
// 3. Récupérer et extraire les étapes de la recette. (1pt)
// 4. Remplir l'élément <article> avec les étapes. (1pt)
//    En cas de clic sur une autre recette, l'élément article est mis à jour (1pt)
//
function exo3() {

  // je recupere tout les a
  const a = document.querySelectorAll("a");
  //Je parcours les a pour ajouter l'event
  a.forEach((e)=>{
    // ajout d'un event de clic sur chaque a 
    e.addEventListener("click",async(b)=>{
      // Q1 bloquer comportement
      b.preventDefault(); // empeche redirection
      // Q2 telecharger le json de la recette 
      // je rercupre le lien de la recette 
      const url = e.href;
      // je fetch le json 
      const response = await fetch(url);
      const recette = await response.json();
      // Q3 recuperer les etapes de la recette
      const etapes = recette.etapes;
      // Q4 remplir article avec les étapes 
      const article = document.querySelector(".recette");
      //vide l'article avant d'afficher les nouvelles etapes de la recette selectionner
      article.innerHTML = "";
      // je creer une liste des etapes
      const listEtapes = document.createElement("ul");
      // je parcours les etapes a ajouter 
      etapes.forEach((e)=>{
        const li = document.createElement("li");
        li.textContent = e;
        listEtapes.appendChild(li);
      });
      // j'ajoute listEtapes a article
      article.appendChild(listEtapes);
    });

  });
}
