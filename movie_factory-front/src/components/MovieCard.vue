<template>
  <div class="row p-1 m-0 movieCard" @click="selectFilm(film)">
    <div class="col-4 p-0">
      <img
        class="moviePict"
        :src="`https://image.tmdb.org/t/p/w200/${path}`"
        alt="picture"
      />
    </div>
    <div class="col-8">
      <div class="card-body p-2 cardBody">
        <h5 class="card-title">
          {{ title.slice(0, 20) + (title.length >= 20 ? "..." : "") }}
        </h5>
        <p class="card-text describe">
          {{
            description.slice(0, 100) + (description.length >= 100 ? "..." : "")
          }}
        </p>
        <p class="card-text">
          <small class="text-muted vote">vote average: {{ vote }}</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  components: {},
  methods: {
    async selectFilm(film) {
      await this.$store.dispatch("addFilm", film);
      if (this.$route.path !== "/film") {
        this.$router.push("/film");
      }
    },
  },
  // tableau de strings pour les props
  props: ["title", "description", "vote", "path", "film", "isActive"],
};
</script>

<style scoped>
.movieCard {
  border: 1px solid transparent;
  cursor: pointer;
}

.movieCard:hover {
  border: 1px solid #6c6c6c;
}

.moviePict {
  width: 150px;
}

.cardBody {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.describe {
  font-size: 1rem;
  text-align: justify;
}

.vote {
  font-size: 1rem;
  text-align: justify;
}
</style>