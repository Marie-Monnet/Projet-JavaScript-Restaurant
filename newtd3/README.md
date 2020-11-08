Le projet s'intitule newtd3 car je l'ai complètement refait.
En effet, j'ai eu un soucis avec la compilation, impossible de trouver l'erreur, j'ai donc décidé de repartir à zero, avec un projet plus propre

App.vue contient la barre de navigation qui va permettre d'acéder à toute les pages.

Accueil.vue est la première page du site, celle par laquelle on arrive au début. Je souhaitais que la page d'accueil ne soit pas directement la liste des restaurants, sans introduction.
Elle contient le nom des pages du site et permet d'y accéder.

ListeDesRestaurants est la page développée grâce à vos vidéos, j'ai ensuite enlevé la partie ajout de restaurant pour le mettre dans une autre page. J'ai également mis en forme la page.

Restaurant.vue est la page que l'on obtient quand on clique sur détail du restaurant dans la page liste des restaurants. Cela nous permet d'obtenir le nom du restaurant, son nombre d'avis, le type de sa cuisine, une image du restaurant, son adresse et son appperçu google maps, son numéro de téléphone avec des boutons pour appeler et pour envoyer un message, et son adresse mail.
Je souhaitais afficher le nombre d'étoiles à côté du nombre d'avis, en fonction de la moyenne de son score.
Je souhaitais également afficher une image au hasard et un numéro de téléphone au hasard, ce que je n'ai pas réussi.
Le grand espace à côté de la fiche d'information servira à insérer le menu du restaurant, lui aussi généré aléatoirement.

Pour finir, nouveauRestaurant.vue permet d'ajouter un nouveau restaurant en saisissant également son type de cuisine et sa ville. Il serait interressant de pouvoir saisir l'adresse complète également.
Après ajout, le nombre de restaurant s'incrémente et on peut retrouver notre nouvel ajout dans la page liste des restaurants.