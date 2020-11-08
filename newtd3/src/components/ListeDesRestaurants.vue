<template>
  <div>
    <h1>Restaurants à New York</h1>
    <h4>Nombre de restaurants : {{nbRestaurantsTotal}}</h4>
    <p>Chercher par nom: <input
        @input="chercherRestaurants()"
        type="text" v-model="nomRestauRecherche"></p>
    <p>Nb de pages total : {{nbPagesTotal}}</p>
    <p>Nb restaurants par page
        <input 
            @input="getRestaurantsFromServer()"
            type="range" min=2 max=100 v-model="pagesize"
        >{{pagesize}}</p>
    <md-button class="md-raised" :disabled="page===0" @click="pagePrecedente()" style="background-color:#79bd9a">Précédent</md-button>
    <md-button class="md-raised" :disabled="page===nbPagesTotal" @click="pageSuivante()" style="background-color:#a8dba8">Suivant</md-button>
    <br>
    <p>Page {{page}} </p>
    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc" md-card>
        <md-table-row :style="{backgroundColor:getColor(index)}" slot="md-table-row" slot-scope="{ item, index }">
            <md-table-cell md-label="Name" md-sort-by="name">{{item.name}}</md-table-cell>
            <md-table-cell md-label="Cuisine" md-sort-by="cuisine" > {{item.cuisine}}</md-table-cell>
            <md-table-cell md-label="Action">
                <md-button class="md-raised" :to="'/restaurant/' + item._id" style= "color: black; ">Détails du restaurant</md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
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




import _ from "lodash";
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
        pagePrecedente() {
            if(this.page===0) return;
            this.page--;
            this.getRestaurantsFromServer()
        },

        pageSuivante() {
            if(this.page === this.dernierePage) return;
            this.page++;
            this.getRestaurantsFromServer()
        },

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
        chercherRestaurants: _.debounce(function() {
            //appelée que si on n'a pas tapé de touches pendant un certain délai
            this.getRestaurantsFromServer();
        },300),
        supprimerRestaurant(r) {
            let url = "http://localhost:8080/api/restaurants/" + r._id;

            fetch(url, {
                method: "DELETE",
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
        },
        getColor(index) {
            return (index % 2) ? '#79bd9a' : '#a8dba8';
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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