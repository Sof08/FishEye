


//Mettre le code JavaScript lié à la page photographer.html

// Etape 4 : Récup des informations en se basant sur ID url href 
//console.log(window.location);
//URL actuelle
const url = new URL(window.location);
// Création d'un nouvel objet URLSearchParams avec la chaîne de requête de l'URL actuelle
const params = new URLSearchParams(url.search);
// Recupère via la barre d'adresse l'id du photograph
// Vérification si l'ID est une valeur numérique
const idPhotograph = Number(params.get("id"));
console.log(idPhotograph);

/************************Fonction d'affichage profil Photograph************************** */
function displayDataPhotograph(name, portrait, city, country, tagLine) {
    const photographSection = document.querySelector(".photograph-header");
    const contactButton = document.querySelector(".contact_button");
   
    //Création d'un nouvel élément article
    let article = document.createElement("article");
    article.setAttribute("class", "presentationP");
    photographSection.appendChild(article);
   /****NOM****/
   //Création d'un nouvel élément <h1>
    let nom = document.createElement("h1");
    //Ajout de la class a l'element
    nom.setAttribute("class", "nameP");
    // Ajout de texte à l'élément
    nom.innerHTML = name;
    
    /****Localisation****/
    //Création d'un nouvel élément de paragraphe <p>
    let localisation = document.createElement("p");
    localisation.innerHTML = city + ", " + country;
    localisation.setAttribute("class", "locationP");
   /****TAGLINE****/
    let tagP = document.createElement("p");
    tagP.innerHTML = tagLine;
    tagP.setAttribute("class", "tagP");
    
    //Ajout h1 / des paragraphes au conteneur en utilisant append
    article.appendChild(nom);
    article.appendChild(localisation);
    article.appendChild(tagP);
    //Element div contact button
    let divContact = document.createElement("div");
    photographSection.appendChild(divContact);
    divContact.setAttribute("class", "divContact");
    divContact.appendChild(contactButton);
    //Element image du photograph
    let divImg = document.createElement("div");
    photographSection.appendChild(divImg);
    divImg.setAttribute("class", "divImg");
  
    let img = document.createElement("img");
    divImg.appendChild(img);
    img.setAttribute("class", "photographPhotoProfil");
    img.setAttribute("src", `assets/photographers/${portrait}`);
    img.setAttribute("alt", "#");
}
  

/***********Récupérer TOUTES Les données du fichier JSON *******************/
async function getDataPhotographers() {
    const reponse = await fetch('data/photographers.json');
    const photographers = await reponse.json();
    //Retourner le tableau photographers seulement une fois récupéré
    return photographers; 
}

/*********** Récupérer les données du photographe depuis le fichier JSON en se basant sur ID url***********/
async function getDataPhotographer(idPhotographer) {
    const photographersJson = await getDataPhotographers();
    
    //Récuperer les infos du photograph dans le cas ou id url = id json
    const myPhotographer = photographersJson.photographers.find(function (photographer) {
        return photographer.id === idPhotographer;
    });

    return myPhotographer;

    
}
async function getMediaPhotographer() {
    //Récupérer le nom du photograph pour accéder au lien de l'image OU video
    const photographersJson = await getDataPhotographers();
    //Tableau de tous les médias
    const mediaPhotographer = photographersJson.media;
    return mediaPhotographer;
}
async function displayGallery(medias, photographerId) {
    //Récupérer le nom du photograph pou accéder au dossier des images / vidéos
    const data = await getDataPhotographer(photographerId);
    const name = data.name.split(" ")[0].replace("-", " ");
    //div qui va contenir l'affichage des photos/videos
    const realisationDOM = document.querySelector(".section-realisation");
    const photographerMedias = medias.filter((media) => media.photographerId == photographerId);
    //creating the photographer's gallery
    photographerMedias.map((media) => {
      console.log(media);
      const descriptionContainer = document.createElement("div");
      const photoContainer = document.createElement("div");
      const photoArticle = document.createElement("article");
      const mediaDiv = document.createElement("div");
      
      // Verfier si media est une img ou video
      let photo = "";
      let card = "";
      if ("video" in media) {
        photo = `
            <a class="lienImageGallery" src="assets" href= "#">
              <video class="imageGallerie" title="${media.title}" src="assets/photos/${name}/${media.video}" type="video/mp4" alt="${media.title}"</video>
            </a>
          `;
      }
      //else add html with img element
      else {
        photo = `
            <a class="lienImageGallery" src="assets" href= "#">
                <img class="imageGallerie" title="${media.title}" alt="${media.image}" src="assets/photos/${name}/${media.image}">
            </a>
          `;
      }
      card = `
            <h2 class="title">${media.title}</h2>
            <div class="likes">
              <p id="mediaLikes" class="like">${media.likes}</p>
              <button class="btn-like" aria-label="click to like">
                <i class="fas fa-heart icon-background"></i>
              </button>
            </div>`;
          
      photoArticle.id += media.id; //links each media id to an article
      descriptionContainer.className += "descriptionContainer"
      mediaDiv.className += "cardImage";
      mediaDiv.innerHTML += photo;
      descriptionContainer.innerHTML += card;
      photoArticle.appendChild(mediaDiv);
      photoArticle.appendChild(descriptionContainer);
      realisationDOM.appendChild(photoArticle);
    }); 

}
let totalLikes = 0;
let likeContainer = document.querySelectorAll(".like");
function getTotalLikes() {
    for (let i = 0; i < likeContainer.length; i++) {
      totalLikes += parseInt(likeContainer[i].innerHTML);
    }
};
getTotalLikes();
console.log(likeContainer);
async function init() {
    //Récupérer les infos du photograph
    const data = await getDataPhotographer(idPhotograph);
    //Récupérer les réalisations Media du photograph
    const media = await getMediaPhotographer();
    //Affichage des données du profil photograph
    displayDataPhotograph(
        data.name,
        data.portrait,
        data.city,
        data.country,
        data.tagline
    );
    displayGallery(media, idPhotograph);

      

}

//Fonction utilisée pour récupérer que a première partie du nom du photograph afin d'accèder au dossier img 
/*function recupererNom(chaine) {
    // Vérifier si la chaîne contient un tiret "-"
    if (chaine.includes("-")) {
        // Diviser la chaîne en parties séparées par le tiret "-"
        let parties = (chaine.split(" "))[0].split("-");
        // Retourner les deux premières parties avec un espace entre elles
        return parties[0] + " " + parties[1];
    } else {
        // Retirer les espaces et retourner la première partie de la chaîne
        return chaine.trim().split(" ")[0];
    }
    
}*/


init();

//etape affichage somme like et price 

