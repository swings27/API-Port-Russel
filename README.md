# API-Port-Russel
[ASSIGNMENT] An API for the Russel marina to manage the booking of catways.

# Description :

API-Port-Russel est une application Node.js/Express qui permet de gérer les réservations de catways dans le port Russel. Elle fournit un tableau de bord pour visualiser les réservations en cours, et intègre également des données externes comme la météo et les marées pour la ville de Marseille.

L’application utilise MongoDB pour stocker les réservations et les catways, et fournit une interface EJS côté serveur pour le dashboard.

# Fonctionnalités :
- Gestion des réservations de catways
- Visualisation des réservations en cours dans le dashboard
- Association des réservations aux catways
- Intégration de la météo via l’API OpenWeather
- Intégration des marées via l’API WorldTides
- Authentification JWT pour sécuriser l’accès aux routes
- Swagger pour la documentation API

# Installation :
1. Cloner le dépôt : git clone https://github.com/swings27/API-Port-Russel.git puis faire : cd API-Port-Russel
2. Démarrer le serveur : npm start

Le serveur sera disponible sur http://localhost:8000.

# Technologies :
- Node.js & Express
- MongoDB / Mongoose
- EJS pour le rendu côté serveur
- Axios pour appels API externes (OpenWeather, WorldTides)
- JWT pour authentification
- Swagger pour documentation