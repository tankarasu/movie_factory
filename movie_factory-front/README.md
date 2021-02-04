# movie_factory

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

---

# dependencies

> - axios for the requesting API
> - bootstrap for designing our application
> - splide for using a carousel mode for our film
> - vue router to initialize routing inside the SPA
> - vuex to initialize a store for application

---

# test folder

    this folder is initialized for our test if we want to develop in TDD for example and for our all unit test.

    test file will be named like:
`fileName.spec.js`  

---
# Entry point

    Entry point of the application is **main.js**

    We import inside this file all Bootstrap configs, the carousel, the router and the store.

---
# Views

## App.vue

    Main view of the application, is mounted in the entry point. It contains the router.

---
## Film.vue

### methods inside

this component will display film information in a different view.

> _handleActor( )_: this methods fetch all actors of the film.

> _addFavorite( )_: this methods add a favorite in the store.

> _addToSeen( )_: this methods add a seen inside array in the store.

> _handleActorsFilm( )_: this methods fetch all film of the selected actor bottom down the page.

---
## CommunityPage.vue

    this component display all the users in the database with summary info

---
## Home.vue

    this views contains all film fetched and also the Menu Section.

---
## Login.vue

    this views permit to user to login before using the application.

---
## Menu.vue

    this view permit user to select film by genre or by year.

---
## NavBar.vue

    this view permit user to select the page to navigate.

---
## ProfilPage.vue

## this view permit user to see which film he has seen and added to favorite

---
# Components



## LoginForm.vue

    this component is used to log the user.


### Methods inside

> _handleClick()_: this methods permit the verification by JWT of the user  
> _signups()_: this methods permit to add a new account on the database

---
## NavBar.vue

    It will appears on the most of view, with some different behavior according to where is displayed.

---
## ProfilComponent.vue

    this component will display summary information about user in profil page and the other users in community page.

---
## SearchBar.vue

    this component will permit user to make a search with keyword

---
## movieCard.vue

    this component make the film is available inside a styled card on home page.

---
## Mailer.vue

    this component make the verification and sending a mail possible.
