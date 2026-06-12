# CliniquePlus - Prototype d'API interne
##Description 

Ce projet est une API backend réalisée avec Express node js. Il gére l'activité d'une clinique.

---

##Fonctionnalites

L'application gére actuellement les routes API suivantes :
-   l'authentification d'un utilisateur
-   le CRUD des utilisateurs 
-   D'autres routes API seront ajoutées au fur et à mesure :
    GET /patients
    GET /patients/:id
    POST /patients
    GET /appointments
    POST /appointments


---

##Technologies utilisees

-Node.js 
-Express 
-SQLite
-JSON pour les échanges API 
-Git pour le versionnement

---

##Structure du projet
- model : dossier pour contenir nos fichiers modéles, fonctions d'accés à la base de données, requetes sql 
- controllers : le dossier des controlleurs 
- routes : dossier pour mettre toutes les routes de l'application.
-

##Installation 

1.  git clone https://github.com/emfall2015/Clinique_Plus_Prototype_dapi_interne.git
2.  cd Clinique_Plus_Prototype_dapi_interne

--

##Dépendance

npm install sqlite3
npm install express


--

##Test 

nodemon app.js

--

##Auteurs 

-   Malick
-   Mario

--

##Licence 

Simplon tout droits réservés
