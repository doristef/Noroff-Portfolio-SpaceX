<template>
    <b-container class="[ container ][ bg-nav ]">
        <b-row align-h="center" class="[ m-2 mb-5 ]">
            <h1 class="[ text-white ]"> SpaceX - History </h1>
        </b-row>
        <b-row class="[ m-2 mb-5 ][ text-white ]">
            <b-container>
                <div v-if="!loading">
                    <p>
                        <strong>{{ aboutArray.name }}</strong> was founded in <strong>{{ aboutArray.founded }}</strong> by the incredible <strong>{{ aboutArray.founder }}</strong>.<br />
                        <strong>{{ aboutArray.name }}</strong> has now <strong>{{ aboutArray.employees }}</strong> employees, <strong>{{ aboutArray.vehicles }}</strong> vehicles,
                        <strong>{{ aboutArray.launch_sites }}</strong> launch sites and <strong>{{ aboutArray.test_sites }}</strong> test site. <br />
                    </p>
                    <h4 class="[ text-white ]"> Management </h4>
                    <p>
                        The <strong>CEO</strong> is {{ aboutArray.ceo }}, The <strong>CTO</strong> is {{ aboutArray.cto }},
                        The <strong>COO</strong> is {{ aboutArray.coo }} and the <strong>CTO of Propulsion</strong> is {{ aboutArray.cto_propulsion }}.
                    </p>

                    <h4 class="[ text-white ]"> Location </h4>
                    <p>
                        <strong>{{ aboutArray.name }}</strong> is located at {{ aboutArray.hqAddr }}, {{ aboutArray.hqCity }}, {{ aboutArray.hqState }} in the United States of America.
                    </p>

                    <h4 class="[ text-white ]"> Summary </h4>
                    <p>
                        {{ aboutArray.summary }}
                    </p>
                    <p>
                        {{ aboutArray.name }} is valued at {{ aboutArray.valuation | formatMoney }}
                    </p>
                </div>
                <div class="[ text-center ]" v-else>
                    <h4 class="[ text-white ]">Loading..</h4>
                </div>
            </b-container>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios';
const corsURL = "https://cors-anywhere.herokuapp.com/"; // Needed for Unblocking Cross-Origin request
const apiURL = "https://api.spacexdata.com/v2/info/"; // API to fetch from

export default {
  name: 'about',
  data() {
    return {
      aboutArray: [],
      errors: [],
      loading: true
    }
  },

  methods: {
    getAbout: function() {
      this.loading = true;
      this.apiCall();
    },
    apiCall: function() {
      axios.get(corsURL + apiURL)
        .then(response => { this.aboutArray = response.data; })
        .catch(e => { this.errors.push(e) })
        .finally(() => this.loading = false )
    }
  },

  created() {
    this.apiCall();
  }
}
</script>