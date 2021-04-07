<template>
  <div id="app">
    <div class="header">drinkly</div>
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Search for ingredient (e.g. water)"
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
          <img :src="drink.strDrinkThumb" @click="openDetails(drink.idDrink)"/>
        </div>
      </div>
      <div id="drink-details" @click="closeDetails()">
        <div class="detail-image">
          <img :src="drinkDetails.strDrinkThumb"/>
        </div>
        <div class="detail-name">{{drinkDetails.strDrink}}</div>
        <div class="detail-description">{{drinkDetails.strInstructions}}</div>

        <div class="detail-close">click to close drink details</div>
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
      drinkDetails: {},
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
      // TODO: use spinner here e.g.
      fetch(`${this.url_base}${this.api_key}/lookup.php?i=${drinkId}`)
      .then((res) => {
        return res.json();
      })
      .then(this.setDrinkDetails);

      document.getElementById("drink-details").style.display = "block";
      console.log("drinkId: ", drinkId);
    },
    setDrinkDetails(details) {
      this.drinkDetails = details.drinks[0];
      console.log(this.drinkDetails);
    },
    closeDetails() {
      document.getElementById("drink-details").style.display = "none";
      this.drinkDetails = {}
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
  font-family: "montserrat", sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 800px;
  margin: 0 auto;
}

#drink-details {
  position: fixed;
  display: none;
  max-width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 10;
  cursor: pointer;
}

main {
  margin-top: 35px;
  min-height: 20vh;
  padding: 25px;
}

.header {
  color: black;
  font-size: xx-large;
  width: 100vw;
  max-width: 800px;
  position: fixed;
  top: 0px;
  background-color: rgba(255, 255, 255, 0.97);
  padding: 5px;
  z-index: 20;
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
  columns: 2;
  gap: 0.5em;
}

.drink-item {
  width: 100%;
  overflow: hidden;
  cursor: pointer;
}

.drink-item:hover {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
}

.drink-item img {
  width: 100%;
  object-fit: cover;
}

.detail-close {
  margin-top: 1em;
  color:  rgba(0, 0, 0, 0.25);
  cursor: pointer;
  font-size: small;
}

.detail-image {
  margin-top: 10vh;
}

.detail-image img {
  width: 60vw;
  max-width: 400px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
}

.detail-name {
  color: black;
  font-size: xx-large;
  margin: auto;
  margin-top: 2vh;
  width: 60vw;
  max-width: 400px;
}

.detail-description {
  color: black;
  width: 60vw;
  max-width: 400px;
  margin: auto;
  margin-top: 1vh;
}
</style>
