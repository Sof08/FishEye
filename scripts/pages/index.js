    //Dans cette fonction ajouter API fetch qui va permettre de récupérer les datas du fichier photographers.json 
    async function getPhotographers() {
        const reponse = await fetch('data/photographers.json');
        const photographers = await reponse.json();
        // et bien retourner le tableau photographers seulement une fois récupéré
        return photographers; 
    }
    //la fonction qui permet d'afficher le contenu de la fonction précédente dans div .photographer_section
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    // Récupère les datas des photographes
    async function init() {
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
