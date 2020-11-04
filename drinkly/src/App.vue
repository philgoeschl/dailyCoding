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
          <img :src="drink.strDrinkThumb + '/preview'" @click="openDetails(drink.idDrink)"/>
        </div>
      </div>
      <div id="drink-details" @click="closeDetails()">
        <div class="detail-close">X</div>
        <div class="detail-image">Hier kommt ein bild</div>
        <div class="detail-name">Cocktail Name</div>
        <div class="detail-description">Zutaten bla bla bla</div>
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
    openDetails(drinkId) {
      document.getElementById("drink-details").style.display = "block";
      console.log("drinkId: ", drinkId);
    },
    closeDetails() {
      document.getElementById("drink-details").style.display = "none";
      console.log("close detail page");
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

#drink-details {
  position: fixed;
  display: none;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
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

.detail-close {
  color: white;
}

.detail-image {
  color: white;
}

.detail-name {
  color: white;
}

.detail-description {
  color: white;
}
</style>
