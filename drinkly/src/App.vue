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
          <img :src="drink.strDrinkThumb + '/preview'" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
//<div class="drink-name">{{ drink.strDrink }}</div>
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
}

main {
  min-height: 100vh;
  padding: 25px;
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
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
}

.results {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.drink-item {
  width: 40vw;
  overflow: hidden;
}

.drink-item img {
  width: 40vw;
  object-fit: cover;
}
</style>
