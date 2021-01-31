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
            v-if="selectedFilm.results[0].key"
            width="480"
            height="320"
            :src="$data.youtubePath + selectedFilm.results[0].key"
            frameborder="0"
            allowfullscreen
          ></iframe>

          <p>{{ selectedFilm.overview }}</p>
        </div>
      </div>
      <div id="filmFooter">
        <p>
          Add to favorite
          <span class="badge badge-danger" @click="addFavorite(selectedFilm)"
            >+</span
          >

          Seen/unseen
          <span class="badge badge-success" @click="addToSeen(selectedFilm)"
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
          v-for="(actor, index) in selectedFilm.cast"
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

      <splide v-if="actorsFilm.length" class="filmList" :options="options">
        <!-- Carousel de film -->
        <splide-slide
          v-for="(film, index) in actorsFilm"
          :key="index"
          class="filmCard"
        >
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
            <span>Runtime {{ selectedFilm.runtime }} mn</span>
            <span>popularity: {{ film.popularity }}</span>
            <span>vote average: {{ film.vote_average }}</span
            ><span>vote count: {{ film.vote_count }}</span>
          </div>
        </splide-slide>
      </splide>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Navbar from "./Navbar.vue";
// import des components du slider
import { Splide, SplideSlide } from "@splidejs/vue-splide";
// import css du slider
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

export default {
  components: { Navbar, Splide, SplideSlide },
  name: "Film",
  data() {
    return {
      actorsFilm: [],
      options: {
        rewind: true,
        width: 800,
        gap: "1rem",
      },
      youtubePath: "https://www.youtube.com/embed/",
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
          console.log(result);
          this.actorsFilm = result;
        })
        .catch((err) => console.log(err));
    },
    addFavorite(film) {
      axios
        .put(`http://localhost:3050/user/addfavorite`, {
          email: "karasutan@gmail.com",
          filmId: film,
        })
        .then((res) => console.log(res))
        .catch((err) => err);
    },
    addToSeen(film) {
      axios
        .put(`http://localhost:3050/user/seen`, {
          email: "karasutan@gmail.com",
          filmId: film,
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

          // axios
          //   .get(
          //     `http://localhost:3050/api/movie/video/${this.selectedFilm.id}`
          //   )
          //   .then(async (res) => {
          //     if (res.data.results[0].site == "YouTube") {
          //       let path =
          //         (await "https://www.youtube.com/embed/") +
          //         (await res.data.results[0].key);
          //       this.$store.dispatch("fetchVideoPath", path);
          //     } else {
          //     }
          //   })
          //   .catch((err) => err);
        })
        .catch((err) => console.log(err));
    },
  },
  beforeMount() {
    console.log("before Mount l155");
  },
  beforeUpdate() {
    console.log("before update l158");
    // axios
    //   .get(`http://localhost:3050/api/movie/credits/${this.selectedFilm.id}`)
    //   .then(async response => {
    //     let result = await response.data;
    //     console.log("result", result);
    //     result = result.cast.slice(0, 5);
    //     this.$store.dispatch("fetchCast", result);
    //   })
    //   .catch(err => console.log(err));
    // axios
    //   .get(`http://localhost:3050/api/movie/spec/${this.selectedFilm.id}`)
    //   .then(async response => {
    //     let result = await response.data;
    //     this.$store.dispatch("fetchFilmSpec", result);
    //   });
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
    // axios
    //   .get(`http://localhost:3050/api/movie/video/${this.selectedFilm.id}`)
    //   .then(async res => {

    //   if (res.data.results[0].site == "YouTube") {
    //     let path =
    //       (await "https://www.youtube.com/embed/") +
    //       (await res.data.results[0].key);

    //   } else {
    //   }
    // })
    //   .catch(err => err);
  },
};
</script>

<style scoped>
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

.splide {
  left: 15%;
  margin-bottom: 2rem;
}

.photoFilm {
  margin-left: 175px;
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
  margin: 0 auto;
  width: 500px;
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
  width: 300px;
  height: 250px;
  background: #111416ea;
}
</style>
