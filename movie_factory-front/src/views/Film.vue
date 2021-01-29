<template>
  <div>
    <navbar></navbar>
    <div class="selectedFilm">
      <div id="filmHeader">
        <h2>{{ selectedFilm.title }}</h2>
      </div>
      <div id="selectedFilm">
        <div class="selectedFilmPicture">
          <img
            class="moviePict"
            :src="`https://image.tmdb.org/t/p/w400/${selectedFilm.poster_path}`"
            alt="picture"
          />
        </div>

        <div class="selectedFilmDescribe">
          <iframe
            width="480"
            height="320"
            :src="$store.state.videoPath"
            frameborder="0"
            allowfullscreen
          ></iframe>

          <p>{{ selectedFilm.overview }}</p>
        </div>
      </div>
      <div id="filmFooter">
        <p>
          Add to favorite
          <span class="badge badge-danger" @click="addFavorite(selectedFilm.id)"
            >+</span
          >

          Seen/unseen
          <span class="badge badge-success" @click="addToSeen(selectedFilm.id)"
            >+</span
          >
        </p>
        <p>
          popularity:<span class="badge badge-warning">
            {{ selectedFilm.popularity }}</span
          >
          release:
          <span class="badge badge-warning"
            >{{ selectedFilm.release_date }}
          </span>
          vote average:
          <span class="badge badge-warning">{{
            selectedFilm.vote_average
          }}</span>
          vote count:
          <span class="badge badge-warning">{{ selectedFilm.vote_count }}</span>
        </p>
      </div>
      <!-- Carousel d'artiste -->
      <div class="actorList">
        <div
          v-for="(actor, index) in cast"
          :key="index"
          @click="handleActor(actor.id)"
        >
          <img
            class="photoActor"
            :src="`https://image.tmdb.org/t/p/w200/${actor.profile_path}`"
            alt="photo"
          />
          <h4>{{ actor.name }}</h4>
          <p>popularity: {{ actor.popularity }}</p>
        </div>
      </div>
      <div v-if="actorsFilm.length != 0" class="filmList">
        <!-- Carousel de film -->
        <div v-for="(film, index) in actorsFilm" :key="index" class="filmCard">
          <!-- on vérifie la présence de photo pour le film -->
          <img
            v-if="film.poster_path"
            class="photoFilm"
            :src="`https://image.tmdb.org/t/p/w200/${film.poster_path}`"
            alt="photo"
            @click="handleActorsFilm(film)"
          />
          <div class="cardDescription">
            <h5>{{ film.title }}</h5>
            <p>{{ film.overview.slice(0, 100) }}</p>
            <span>popularity: {{ film.popularity }}</span>
            <span>vote average: {{ film.vote_average }}</span
            ><span>vote count: {{ film.vote_count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Navbar from "./Navbar.vue";

export default {
  components: { Navbar },
  name: "Film",
  data() {
    return {
      actorsFilm: [],
    };
  },
  computed: {
    ...mapState(["selectedFilm", "cast"]),
  },
  methods: {
    handleActor(actor) {
      console.log("Actor: ", actor);
      axios
        .get(`http://localhost:3050/api/movie/person/${actor}`)
        .then(async (response) => {
          let result = await response.data.results.slice(0, 6);
          console.log(this.$store);
          this.actorsFilm = result;
        })
        .catch((err) => console.log(err));
    },
    addFavorite(id) {
      axios
        .put(`http://localhost:3050/user/addfavorite`, {
          email: "karasutan@gmail.com",
          filmId: id,
        })
        .then((res) => console.log(res))
        .catch((err) => err);
    },
    addToSeen(id) {
      axios
        .put(`http://localhost:3050/user/seen`, {
          email: "karasutan@gmail.com",
          filmId: id,
        })
        .then((res) => console.log(res))
        .catch((err) => err);
    },
    handleActorsFilm(index) {
      axios
        .get(`http://localhost:3050/api/movie/${index.id}`)
        .then(async (response) => {
          let result = await response.data;
          this.$store.dispatch("addFilm", result);
          this.actorsFilm = [];
        })
        .catch((err) => console.log(err));
    },
  },
  beforeMount() {
    console.log("before Mount l155");
  },
  beforeUpdate() {
    console.log("before update l158");
    axios
      .get(`http://localhost:3050/api/movie/credits/${this.selectedFilm.id}`)
      .then(async (response) => {
        let result = await response.data;
        result = result.cast.slice(0, 5);
        this.$store.dispatch("fetchCast", result);
      })
      .catch((err) => console.log(err));
  },
  updated() {
    console.log("updated l169");
  },
  created() {
    console.log("created l172");
  },
  beforeCreate() {
    console.log("before create l175");
  },
  beforeDestroy() {
    console.log("before destroy l178");
  },
  destroyed() {
    console.log("destroyed l181");
  },
  mounted() {
    console.log("mounted l184");
    axios
      .get(`http://localhost:3050/api/movie/video/${this.selectedFilm.id}`)
      .then(async (res) => {
        console.log("link:", res.data.results[0]);
        if (res.data.results[0].site == "YouTube") {
          let path =
            (await "https://www.youtube.com/embed/") +
            (await res.data.results[0].key);
          this.$store.dispatch("fetchVideoPath", path);
        } else {
        }
      })
      .catch((err) => err);
  },
};
</script>

<style scoped>
/* TODO faire un carousel */
div {
  color: white;
}

.photoActor {
  border-radius: 50%;
  width: 150px;
}

.filmFooter {
  margin: 0;
}

.photoFilm {
  width: 150px;
}

.actorList {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.filmList {
  display: flex;
  flex-direction: row;
}

.filmCard {
  display: flex;
  flex-direction: row;
}

.moviePict {
  width: 85%;
}

#selectedFilm {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 3rem;
}

.selectedFilm {
  background: #111416ea;
}

.selectedFilmDescribe {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  padding-left: 1rem;
}

.selectedFilmDescribe p {
  width: 480px;
  text-align: justify;
}

.cardDescription {
  display: flex;
  flex-direction: column;
  transition: all ease-in-out 0.25s;
  width: 0;
  height: 250px;
  background: #111416ea;
}

.cardDescription h5,
.cardDescription p,
.cardDescription span {
  transition: all ease-in-out 0.75s;
  display: none;
}

.photoFilm:hover {
  border: 3px solid #f4f4f4;
}

.photoFilm:hover ~ .cardDescription {
  width: 300px;
  height: 250px;
}

.photoFilm:hover ~ .cardDescription h5,
.photoFilm:hover ~ .cardDescription p,
.photoFilm:hover ~ .cardDescription span {
  display: block;
}
</style>