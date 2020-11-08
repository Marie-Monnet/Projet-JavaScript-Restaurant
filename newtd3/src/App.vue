<template>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="width=device-width,initial-scale=1,minimal-ui" name="viewport">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons">
    <link rel="stylesheet" href="https://unpkg.com/vue-material/dist/vue-material.min.css">
    <link rel="stylesheet" href="https://unpkg.com/vue-material/dist/theme/default.css">
  </head>

  <body>
    <div class="page-container">
      <md-app md-mode="reveal">
        <md-app-toolbar class="md-light">
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
            <md-icon><i class="material-icons">home</i></md-icon>
          </md-button>
        </md-app-toolbar>
        <md-app-drawer :md-active.sync="menuVisible">
          <md-toolbar class="md-transparent" md-elevation="0">Menu</md-toolbar>
          <md-list>
            <div id="app">
              <md-list-item>
                <router-link to="/" style= "color: black; "><md-icon><i class="material-icons">home</i></md-icon> Accueil</router-link>
              </md-list-item>
              <md-list-item>
                <router-link to="/ListeDesRestaurants" style= "color: black; "><md-icon><i class="material-icons">list</i></md-icon> Liste des restaurants</router-link>
              </md-list-item>
              <md-list-item>
                <router-link to="/nouveauRestaurant" style= "color: black; "><md-icon><i class="material-icons">add_circle</i></md-icon>Ajouter un nouveau restaurant</router-link>
              </md-list-item>
            </div>
          </md-list>
        </md-app-drawer>
        <md-app-content>
          <router-view></router-view>
        </md-app-content>
      </md-app>
    </div>
  </body>
</html>
</template>

<script>

export default {
  name: 'Reveal',
  components: {

  },
data: () => ({ //c'est un obj
        menuVisible: false
    }),
};

</script>

<style>

</style>
