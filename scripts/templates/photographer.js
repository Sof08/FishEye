function photographerTemplate(data) {
    //Etape 2: Récupérer les données nécessaires 
    const { name, portrait,id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        //Ajout href a element parent qui va contenir img et h2
        const href = document.createElement( 'a' );
        //Ajouter des données de la balise a => lien vers la page correspondante du photograph dans un nouvel onglet
        href.setAttribute("href", `photographer.html?id=${id}`); 
        href.setAttribute("alt", name);
        href.setAttribute('target', '_blank');
        //les élements de présentation img + h2
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("aria-label", name);
        img.setAttribute("title", name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        //data photograph
        //Ajout des données (city, country, tag, price) dans un élement div 
        const divData = document.createElement("div");
        //CITY +COUNTRY
        const localisation = document.createElement("p");
        localisation.textContent = city + ", " + country;
        localisation.setAttribute("class", "localisation");
        //TAGLINE
        const tag = document.createElement("p");
        tag.textContent = tagline;
        tag.setAttribute("class", "tag");
        //PRICE
        const prix = document.createElement("p");
        prix.textContent = price + " €/jour";
        prix.setAttribute("class", "prix"); 

        article.appendChild(href);
        href.appendChild(img);
        href.appendChild(h2);
        article.appendChild(divData);
        divData.appendChild(localisation);
        divData.appendChild(tag);
        divData.appendChild(prix);
        href.setAttribute("class", "link"); 
        divData.setAttribute("class", "data"); 
        return (article);
    }
    return { name, picture, getUserCardDOM }
}


