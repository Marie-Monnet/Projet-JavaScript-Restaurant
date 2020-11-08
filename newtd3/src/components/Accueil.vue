<template>
    <div>
        <md-card class="md-layout-item md-size-75" style="margin: auto">
            <md-card-header>
            <div class="md-title" style ="color:#3b8686; text-align: center">Bienvenue sur la page des restaurants de New York</div>
            </md-card-header>
            <md-card-content>
                <br><br>
                <router-link to="/ListeDesRestaurants" style= "color: black; ">
                    <md-icon><i class="material-icons">list</i></md-icon>
                Liste des restaurants</router-link>
                <br><br><br>
                <router-link to="/nouveauRestaurant" style= "color: black; ">
                    <md-icon><i class="material-icons">add_circle</i></md-icon>
                Ajouter un nouveau restaurant</router-link>
                <br><br>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(VueMaterial)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs);

export default {
  name: 'Reveal',

  data: () => ({ //c'est un obj
        restaurants: [],
        nom: '',
        cuisine: '',
        nbRestaurantsTotal:0,
        page:0,
        pagesize:10,
        nbPagesTotal:0,
        nomRestauRecherche:'',
        menuVisible: false
    }),
    mounted(){
        this.getRestaurantsFromServer();
        console.log("sdfghjklm");
    },
    methods: {
        getRestaurantsFromServer() {
            let url = "http://localhost:8080/api/restaurants?";
            url +="page=" + this.page;
            url +="&pagesize=" + this.pagesize;
            url +="&name=" + this.nomRestauRecherche;

            fetch(url) //on attend la réponse
                .then((reponseJSON) => { //arrow function, conserve le bon "this"
                // la réponse est en JSON, on l'a convertie avec la ligne suivante
                    reponseJSON.json().then((resJS) => {
                    // Maintenant res est un vrai objet JavaScript
                     this.restaurants = resJS.data;
                     this.nbRestaurantsTotal= resJS.count;
                     this.nbPagesTotal = Math.round(this.nbRestaurantsTotal / this.pagesize);
                    });
                })
                .catch(function (err) {
                    console.log(err);
            });
        },
        ajouterRestaurant(event) {
            // Récupération du formulaire. Pas besoin de document.querySelector
            // ou document.getElementById puisque c'est le formulaire qui a généré
            // l'événement
            let form = event.target;

            // Récupération des valeurs des champs du formulaire
            // en prévision d'un envoi multipart en ajax/fetch
            let donneesFormulaire = new FormData(form);

            let url = "http://localhost:8080/api/restaurants";

            fetch(url, {
                 method: "POST",
                body: donneesFormulaire
            })
            .then( (responseJSON) => {
                responseJSON.json()
                .then((resJS) => {
                         // Maintenant res est un vrai objet JavaScript
                        console.log(resJS.msg)
                        this.getRestaurantsFromServer();
                });
            })
            .catch(function (err) {
                console.log(err);
            });
            this.nom = "";
            this.cuisine = "";
            this.borough = "";
        }
    }
}
</script>

<style scoped>
h1 {
    color:#3b8686;
    margin-top:50px;
    text-align: center;
}
h4 {
    color: #cff09e;
    text-align: center;
}
</style>