<template>
  <div id="app">
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Search..."
          v-model="query"
          @keypress="fetchDrinksByIngredient"
        />
      </div>
      <div class="results">
        <div
          class="drink-item"
          v-for="drink in this.drinks.drinks"
          :key="drink.idDrink"
        >
          <div class="card">
            <div class="thumbnail">
              <img :src="drink.strDrinkThumb" />
            </div>
            <div class="drink-name">{{ drink.strDrink }}</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      api_key: process.env.VUE_APP_API_KEY,
      url_base: "https://www.thecocktaildb.com/api/json/v1/",
      query: "",
      drinks: {},
    };
  },
  methods: {
    fetchDrinksByIngredient(e) {
      if (e.key == "Enter") {
        fetch(`${this.url_base}${this.api_key}/filter.php?i=${this.query}`)
          .then((res) => {
            return res.json();
          })
          .then(this.setResults);
      }
    },
    setResults(results) {
      this.drinks = results;
      console.log(results);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "montserrat", sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

main {
  min-height: 100vh;
  padding: 25px;

  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;

  color: #313131;
  font-size: 20px;

  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

.results {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.drink-item {
  width: 30vw;
  margin: 10px;
}

.card {
  height: 30vh;
  overflow: hidden;
  border-radius: 0px 32px 0px 32px;
  transition: 0.4s;
}

.card:hover {
  border-radius: 32px 0px 32px 0px ;
}

.thumbnail {
  
}

.thumbnail img {
  object-fit: cover;

}

.thumbnail:hover img {
  filter: brightness(75%);
  transition: 0.4s;
}

.drink-name {
  z-index: 1;
}
</style>
