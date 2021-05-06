<template>
  <b-container class="[ container ][ mt-2 ]">
    <b-row align-h="center">
      <b-card
              no-body
              tag="article"
              text-variant="dark"
              class="[ m-3 ][ text-dark ][ card-40 ]">
              <b-card-body> 
                  <b-card-title>
                      People in space right now:
                  </b-card-title>
                  <div class="[ mt-3 ]" >
                      <h2 v-if="loading">Loading...</h2>
                      <ul v-else>
                          <li v-for="(astronaut, i) in astronauts.people" :key="i">
                              <b>{{ astronaut.name }}</b> is in the <b>{{ astronaut.craft }}</b>
                          </li>
                      </ul>
                  </div>
              </b-card-body>
                  <b-card-footer>
                      <span v-if="astronauts.number">That's <b>{{ astronauts.number }}</b> people,</span> how awesome is that!
                  </b-card-footer>
        </b-card>
    </b-row>
  </b-container>
</template>

<script>

import axios from 'axios';
const corsURL = ""; // Needed for Unblocking Cross-Origin request
const astrosApiURL = "http://api.open-notify.org/astros.json"; // API to fetch from

export default {
  name: 'astronauts',
  components: {
      
  },
  data() {
    return {
      astronauts: [],
      errors: [],
      loading: true,
    }
  },

  methods: {
    getAstronauts: function() {
      axios
        .get(corsURL + astrosApiURL)
        .then(response => { this.astronauts = response.data; })
        .catch(e => { this.errors.push(e) })
        .finally(() => this.loading = false)
    }

  },

  created() {
    this.getAstronauts();
  }
}
</script>