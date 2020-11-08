<template>
  <div>
    <h1>{{restaurant.name}}</h1>
    <h4>{{restaurant.grades.length}} avis</h4>
    <br>

    <div id="info">
      <md-toolbar :md-elevation="1" style="background-color: #a8dba8">
        <span class="md-title">Informations</span>
      </md-toolbar>
      <md-list class="md-double-line">
        <md-subheader>Type de cuisine</md-subheader>

        <md-list-item>
          <md-icon style="color:#3b8686">restaurant</md-icon>
          <div class="md-list-item-text">
            <span>{{restaurant.cuisine}}</span>
          </div>
        </md-list-item>
        <md-list-item>
          <img src="https://mk0tarestaurant7omoy.kinstacdn.com/wp-content/uploads/2018/01/premiumforrestaurants_0.jpg" alt="Restaurant" style="height:200px">
        </md-list-item>

        <md-divider></md-divider>

        <md-subheader>Adresse</md-subheader>

        <md-list-item>
          <md-icon style="color:#3b8686">place</md-icon>
          <div class="md-list-item-text">
            <span>{{restaurant.address.building}} {{restaurant.address.street}} {{restaurant.address.zipcode}}</span>
            <span>{{restaurant.borough}}</span>
          </div>
        </md-list-item>
        <md-list-item>
          <GmapMap :center="{lat:restaurant.address.coord[1], lng:restaurant.address.coord[0]}" :zoom="7" style="width: 500px; height: 300px">
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
              />
          </GmapMap>
        </md-list-item>
      </md-list>

      <md-toolbar :md-elevation="1" style="background-color: #79bd9a">
        <span class="md-title">Contacts</span>
      </md-toolbar>
      <md-list class="md-double-line md-dense">
        <md-subheader>Téléphone</md-subheader>

        <md-list-item>
          <md-icon style="color:#3b8686">phone</md-icon>
          <div class="md-list-item-text">
            <span>(650) 555-1234</span>
          </div>
          <md-button class="md-icon-button md-list-action">
            <md-icon>phone</md-icon>
          </md-button>
          <md-button class="md-icon-button md-list-action">
            <md-icon>sms</md-icon>
          </md-button>
        </md-list-item>

        <md-divider></md-divider>

        <md-subheader>Email</md-subheader>

        <md-list-item>
          <md-icon style="color:#3b8686">email</md-icon>
          <div class="md-list-item-text">
            <span style="word-spacing: -5px">{{restaurant.name}}@mail.com</span>
          </div>
        </md-list-item>
      </md-list>
    </div>
  </div>
</template>

<script>

export default {
  name1: 'Restaurant',
  name2: 'DoubleLine',
  props: {

  },
  computed:{
      id() {
          return this.$route.params.r
      }
  },
  data: function() {
      return {
          restaurant:{
            name: "",
            grades:[],
            cuisine:"",
            address: {
              building:"",
              street:"",
              zipcode:"",
              coord:[1, 1]
            },
            borough:""
          },

          markers: []
      }

  },
  mounted() {
      console.log("Avant affichage");
      console.log("ID=" + this.id);
      let url = "http://localhost:8080/api/restaurants/" + this.id;
      fetch(url)
      .then(reponse => {
          return reponse.json();
      }).then(data => {
          console.log(data.restaurant.name)
          this.restaurant = data.restaurant;
          this.markers.push({lat:this.restaurant.address.coord[1], lng:this.restaurant.address.coord[0]});
      })
  },
  methods : {
    
  },
}
</script>

<style scoped>
  template {
    font-family: Arial, Helvetica, sans-serif;
  }
  small {
    display: block;
  }
  .md-list {
    width: 500px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
  }

  #info {
    width: 500px;
    max-width: 100%;
    border-style: groove;
  }

h1 {
    color:#3b8686;
    margin-top:30px;
    text-align: center;
}
h4 {
    color: #cff09e;
    text-align: center;
}
</style>
