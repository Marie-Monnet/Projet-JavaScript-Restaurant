<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="ajouterRestaurant">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Ajouter un restaurant</div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="name">Nom du restaurant :</label> 
                                <md-input name="name" id="name" required v-model="nom"/>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="cuisine">Type de cuisine :</label>
                                <md-input name="cuisine" id="cuisine" required v-model="cuisine"/>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                                <label for="borough">Ville du restaurant :</label> 
                                <md-input name="borough" id="borough" required v-model="borough"/>
                            </md-field>
                        </div>
                    </div>


                </md-card-content>
                <md-card-actions>
                    <md-button type="submit" class="md-light">Ajouter</md-button>
                </md-card-actions>
            </md-card>
        </form>
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

<style>

</style>