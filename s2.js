/*
    LIFWEB 2025 -- CC2 TP noté
    SUJET 2 - 11:45

    Compléter les exercices demandés en 60 minutes (hors tiers-temps).
    Déposer dans la cellule correspondante de Tomuss le fichier JS complété et UNIQUEMENT ce fichier.

    Rendu attendu : https://tabard.fr/dd/lifweb-CC2-2-2025.mov
    Les exercices 1 à 3 se suivent, le 4 est indépendant

    Les rendus par mail ne seront PAS pris en compte (sauf tiers-temps).
    Un fichier qui ne se charge pas correctement ne sera PAS pris en compte.

    Tous les documents et l'accès à internet sont autorisés : votre code, les corrections, MDN, stack-overflow, etc.
    Vous pouvez utiliser votre ordinateur personnel ou les ordinateurs de la salle de TP.

    Toute communication entre humains est INTERDITE.
    Les IAs/LLMs (ChatGPT, GitHub Copilot, etc.) sont INTERDITS.
    Si vous utilisez Copilot ou un outil similaire dans votre IDE, DÉSACTIVEZ-LE.

    Le barême est donné à titre indicatif et pourra être adapté en cas de déséquilibre entre les groupes.
    
    */

// Exercice 1
//
// Compléter la fonction afficherAppartements() cette fonction prend en entrée
// une liste d'appartement et les affiche.
//
// Au chargement de la page, la fonction est appelée avec la liste d'appartement
// fournie dans le fichier lifweb-2025-cc2-sujet-2-data.js
//
// TODO Parcourir la liste d'appartements et pour chaque appartement :
// 1. Créer un div ayant pour nom de classe "appartement", et
//    un id correspondant à celui de l'appartement dans le jeu de données. (1pt)
// 2. Dans ce div ajouter un titre h3 présentant l'appartement ainsi
//    que des paragraphes pour l'adresse, le loyer et les charges, la surface (1pt)
// 3. Dans ce div ajouter aussi le nombre de colocataires. (1pt)
// 4. Dans ce div ajouter un bouton "Voir les colocataires"
//    donner une classe à ce bouton elle sera utilisée dans l'exo 2 (0,5pt)
// 5. Insérer ce div dans la page Web à l'endroit prévu pour cela (0,5pt)
//
// Favoriser les bonnes pratiques vues en cours que ce soit sur les boucles,
// La manipulation du DOM, ou la manipulation de tableau javascript.

function afficherAppartements(listeAppartements) {
  
   // je recupere la section html par son id
    const section = document.querySelector("#listeAppartements");
  
    // q1
    listeAppartements.forEach((appartement) => {
    const divA= document.createElement("div"); // creer un div
    divA.classList.add("appartement"); // ajout de la classe
    divA.id = appartement.id; // ajout de l'id

    //q2 
    // ajout de titre
    const titr = document.createElement("h3"); // je creer un element h3
    titr.textContent = appartement.titre; // je l'applique au titre de l'appartement
    divA.appendChild(titr); // j'ajoute le titre dans le div
    
    // ajout adresse
    const adress = document.createElement("p");
    adress.textContent = appartement.adresse;
    divA.appendChild(adress);

    //ajout loyer et charges
    const loy = document.createElement("p");
    loy.textContent = `Loyer : ${appartement.loyer} € + charges : ${appartement.charges} €`;
    divA.appendChild(loy);

    //ajout surface
    const surf = document.createElement("p");
    surf.textContent = `Surface : ${appartement.surface} m²`;
    divA.appendChild(surf);

    // q3 ajout du nbre de colocataire
    const coloc = document.createElement("p");
    coloc.textContent = `Nombre de colocataire : ${appartement.colocatairesId.length}`;
    divA.appendChild(coloc);

    // q4 ajout du bouton
    const bout = document.createElement("button"); 
    bout.textContent = "Voir les colocataires";
    bout.classList.add ("but");
    divA.appendChild(bout);

    // q5 insertion du div dans la page
      // section div deja recupere plus haut
      // j'ajoute le div dans la section
      section.appendChild(divA);

}); // foreach se termine comme ça 

exo2(); // garder cet appel

}

afficherAppartements(data.appartements);


// Exercice 2 (4pt)
//
// Compléter la fonction exo2() qui va ajouter à tous les boutons
// "Voir les colocataires" un event listener (1pt)
// pour qu'en cas de click :
//
// 1. On retire la classe "selected" de tous les div présentant un appartement (1pt)
// 2. On ajoute la classe "selected" au div contenant le bouton sur lequel
//    on vient de cliquer (1pt)
// 3. On appelle afficherColocataires(id), cet id correspond à l'appartement
//    dont on veut afficher les colocataires. (1pt)
//
function exo2() {
  // je recupere tous les boutons grace a la class "but"
  const butAll = document.querySelectorAll(".but");

  // j'ajoute un event a chaque bouton
  butAll.forEach((but) => {
    but.addEventListener("click", () => {
    // actions au clic
    // q1  
      // je recupere tous les div ayant pour classe "appartement"
        const divAll = document.querySelectorAll(".appartement");
      // je retire la classe "selected" de tous les div
        divAll.forEach((appartement)=>{
           appartement.classList.remove("selected"); });

    // q2
      // je recupere le div parent du bouton clique
          const divParent = but.parentElement;
      // j'ajoute la classe "selected" a ce div
          divParent.classList.add("selected");

    // q3
      // je recupere l'id de l'appartement a partir du div parent
          const divParentId = divParent.id;
          // j'appelle la fonction afficherColocataires avec cet id
          afficherColocataires(divParentId);
    });
  });

}

// Exercice 3 - Affichage des colocataires (7pt)
//
// 1. A partir de appartID retrouver l'appartement auquel il est fait référence (1pt)
//
// Une fois l'appartement retrouvé, appartement.colocataireId fournit
// un tableau des identifiants des colocataires
//
// Pour chaque colocataire de l'appartement :
// 2. reconstruire un url à requêter de la forme (1pt) :
//    http://lifweb.pages.univ-lyon1.fr/CC2/colocataires/colocataire-1.json
//    colocataire-1 correspondant au colocataire d'id==1
// 3. requêter cette url en utilisant fetch() et then(). (2pt)
// 4. si la requête fonctionne construire un div (1pt)
//    - avec pour classe "colocataire" et id l'id du colocataire
//    - Le nom / prénom du colocataire en h3
//    - un paragraphe pour l'age, les études, le contact, les hobbies
// 5. En cas d'erreur afficher un div signalant un problème (1pt)
//
// 6. Si vous testez plusieurs appartements de suite,
//    les colocataires vont s'ajouter dans le div au fur et à mesure.
//    Au tout début de la fonction effacer le contenu du div pour
//    que seul s'affiche les colocataires de l'appartement sélectionné (1pt)
function afficherColocataires(appartID) {
  //q1
  // je recupere l'appartement correspondant a l'id
  const appart = data.appartements.find((app) => app.id === appartID);

  // q6 il faut le faire avant de faire les requetes
  // je recupere le div des colocataires
      const divC = document.querySelector("#listeColocataires");
  // je vide le contenu de ce div
      divC.innerHTML = "";

  // q2
  // je parcours le tableau des colocataires de l'appartement
    appart.colocatairesId.forEach((colocId) => {
  // je reconstruit l'url a requeter
    const url = `http://lifweb.pages.univ-lyon1.fr/CC2/colocataires/colocataire-${colocId}.json`;
    // q3
  // je fais la requete avec fetch
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
    // q4 si la requete fonctionne
        //je construis un div pour le colocataire
        const divColoc = document.createElement("div");
        // j'ajoute une classe et un id a ce div
        divColoc.classList.add("colocataire");
        divColoc.id = data.id;
        // j'ajoute le nom et prenom en h3
       const nomP = document.createElement("h3");
       nomP.textContent = `Nom : ${data.nom} Prenom : ${data.prenom}`;
       // ajouter a la section 
        divColoc.appendChild(nomP);
      // j'ajoute paragraphe 
        const info = document.createElement("p");
        info.textContent = `Age : ${data.age} Etude : ${data.etude} Contact : ${data.contact}  Hobbies : ${data.hobbies}`;
        // ajouter a la section
        divColoc.appendChild(info);
        // j'ajoute le div du colocataire dans la section des colocataires
        divC.appendChild(divColoc);
      })

      .catch((erreur) => {
        // q5 si la requete echoue
        const divErr = document.createElement("div"); 
        divErr.textContent = " la requete a echoue";
        divC.appendChild(divErr);

      });
  });

}

// Exercice 4 - Calcul et affichage des statistiques (5pt)
//
// En utilisant au maximum les array methods https://javascript.info/array-methods,
// notamment reduce, calculer les statistiques suivantes des appartements :
// - prix moyen (2pt si pas de boucle, 1pt si boucle). Le prix moyen doit prendre en compte le loyer et les charges (+1pt si les deux sont pris en compte dans le calcul)
// - surfaceMoyenne (2pt si pas de boucle, 1pt si boucle)
//
function calculerStatistiques() {
  // Calculer le prix moyen (loyer + charges)
    // cumule de loyer et charges
    const total = data.appartements.reduce((acc,app)=>{return acc+app.loyer+app.charges},0);
    const prixMoyen = total/data.appartements.length;

  // Calculer la surface moyenne
    // cumul des surfaces totales
    const totalSurf = data.appartements.reduce((acc,app)=>{return acc+app.surface},0);
    // surface moyenne
    const surfMoyen = totalSurf/data.appartements.length;
    
  // Afficher les statistiques
  const affPrix = document.querySelector("#prixMoyen"); 
  affPrix.textContent =prixMoyen ;

  const affSurf = document.querySelector("#surfaceMoyenne");
  affSurf.textContent=surfMoyen;
}

calculerStatistiques();
