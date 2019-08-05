<template>
  <div class="main">
    <h1>StarNotary Token DAPP</h1>
    <hr />

    <div class="create-star">
      <div class="new-star">
        <h2>Create a Star</h2>
        <form @submit.prevent="createStarFunc">
          <label for="starName">Star Name:</label>
          <input type="text" id="starName" required v-model="starName" />

          <label for="starId">Star ID:</label>
          <input type="number" id="starId" required v-model="starId" min="1" />

          <button type="submit">Create Star</button>
        </form>
      </div>
      <div class="stars">
        <h2>Created Stars</h2>
        <div class="table">
          <div class="table-wrapper" v-if="stars.length > 0">
            <v-table :data="stars">
              <thead slot="head">
                <th>Star Id</th>
                <th>Star Name</th>
              </thead>

              <transition-group name="list" tag="tbody" slot="body" slot-scope="{displayData}">
                <tr v-for="(star) in displayData" :key="star.starId">
                  <td>{{star.starId}}</td>
                  <td>{{star.name}}</td>
                </tr>
              </transition-group>
            </v-table>
          </div>
          <div v-else class="no-data">
            <span>No star created yet!</span>
          </div>
        </div>
      </div>
    </div>
    <hr />

    <h2>Look up a Star</h2>
    <div class="create-star">
      <form @submit.prevent="starLookup">
        <label for="lookupId">Star ID:</label>
        <input type="number" id="lookupId" required v-model="lookupStarId" min="1" />

        <button type="submit">Get Star</button>
      </form>
    </div>
    <span>Status: {{status}}</span>
    <hr />
  </div>
</template>

<script>
import Provider from "../assets/js";

export default {
  name: "StarNotary",
  Provider: null,

  data() {
    return {
      starName: "",
      starId: "",
      lookupStarId: "",
      status: "",
      stars: [],
      ethAccounts: []
    };
  },
  methods: {
    createStarFunc() {
      if (window.ethereum) {
        this.Provider.instance.methods
          .createStar(this.starName, this.starId)
          .send({ from: this.ethAccounts[0] });

        this.starName = "";
        this.starId = "";
      } else {
        alert("Please consider installing metamask!!!");
      }
    },

    starLookup() {
      this.Provider.instance.methods
        .lookUptokenIdToStarInfo(this.lookupStarId)
        .call({ from: this.ethAccounts[0] })
        .then(result => {
          this.status = result;

          this.lookupStarId = "";
        });
    },

    async getStars() {
      this.stars = [];
      this.Provider.instance
        .getPastEvents("NewStar", { fromBlock: 0, toBlock: "latest" })
        .then(events => {
          events.forEach(event => {
            this.stars.unshift({
              name: event.returnValues.name,
              starId: event.returnValues.starId
            });
          });
        });
    },

    getEthAccounts() {
      web3.eth.getAccounts().then(accounts => {
        accounts.forEach(account => {
          this.ethAccounts.push(account);
        });
      });
    }
  },
  async created() {
    this.Provider = new Provider();
    await this.Provider.start();
    this.getEthAccounts();
    this.getStars();
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.create-star {
  text-align: left;
  padding: 1rem;
  border-radius: 2px;
  margin-top: 2rem;
  margin-bottom: 4rem;
  display: flex;
  justify-content: space-between;
}

.new-star {
  width: 45%;
}

.stars {
  width: 45%;
}

.new-star,
.stars {
  border: #dee2e6 1px solid;
  padding: 0.5rem;
  border-radius: 2px;
}

.table-wrapper {
  border: #dee2e6 1px solid;
  margin: 0.5rem;
  border-radius: 2px;
}

.table {
  height: 220px;
  overflow-y: auto;
}

th {
  background: #f2f0f3;
  border: #d8d3d3 1px solid;
  border-radius: 2px;
  font-size: 0.8rem;
  position: sticky;
  z-index: 5;
  top: 0;
}

.table table {
  table-layout: fixed;
  width: 100%;
  padding: 0.5rem;
}

tbody {
  text-align: center;
  height: 100px;
}

th {
  padding: 0.2rem;
  font-size: 0.8rem;
  background: #f2f0f3;
  border: #d8d3d3 1px solid;
  border-radius: 2px;
}

td,
th {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.5rem;
  font-size: 0.8rem;
}

td {
  border-bottom: 1px solid #cccccc;
}

tbody > tr:last-child > td {
  border-bottom: none;
}

.no-data {
  text-align: center;
  align-content: center;
}
span {
  padding: 2rem;
}

input {
  width: 100%;
  margin: 1rem;
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1px solid #abaeaf;
  border-radius: 1px;
  margin: 1rem auto;
}

button {
  padding: 0.8rem;
  border: 1px solid #2c3e50;
  border-radius: 2px;
  color: #fff;
  font-size: 0.8rem;
  cursor: pointer;
  float: right;
  background-color: #154360;
  transition-duration: 0.4s;
}

button:hover {
  background-color: #4caf50;
  border: 1px solid #40a043;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease-in-out;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
  background-color: #cdf1c3;
}

.list-move {
  transition: transform 1s;
}
</style>
