<template>
    <b-container class="[ container ][ bg-nav ]">
        <b-row class="[ m-2 mb-5 mt-4 ][ text-white ]">
            <b-container>
                <div v-if="!loading">
                    <h1 class="[ text-white ]"> SpaceX </h1>
                    <p>
                        <strong>{{ aboutArray.name }}</strong> was founded in <strong>{{ aboutArray.founded }}</strong> by the incredible <strong>{{ aboutArray.founder }}</strong>.<br />
                        <strong>{{ aboutArray.name }}</strong> has now <strong>{{ aboutArray.employees }}</strong> employees, <strong>{{ aboutArray.vehicles }}</strong> vehicles,
                        <strong>{{ aboutArray.launch_sites }}</strong> launch sites and <strong>{{ aboutArray.test_sites }}</strong> test site. <br />
                    </p>
                    <h3 class="[ text-white ]"> Management </h3>
                    <p>
                        The <strong>CEO</strong> is {{ aboutArray.ceo }}, The <strong>CTO</strong> is {{ aboutArray.cto }},
                        The <strong>COO</strong> is {{ aboutArray.coo }} and the <strong>CTO of Propulsion</strong> is {{ aboutArray.cto_propulsion }}.
                    </p>

                    <h3 class="[ text-white ]"> Location </h3>
                    <p>
                        <strong>{{ aboutArray.name }}</strong> is located at {{ aboutArray.hqAddr }}, {{ aboutArray.hqCity }}, {{ aboutArray.hqState }} in the United States of America.
                    </p>

                    <h3 class="[ text-white ]"> Summary </h3>
                    <p>
                        {{ aboutArray.summary }}
                    </p>
                    <p>
                        {{ aboutArray.name }} is valued at {{ aboutArray.valuation | formatMoney }}
                    </p>
                    <h3 class="[ text-white ]"> Social Media Links</h3>
                    <p>
                        <ul class="[ list-unstyled ][ ml-3 ]">
                          <b-media tag="li" v-for="(link, key) in aboutArray.links" :key="key">
                            <b-link :href="link" :title="key" class="[ text-light h6 ]">
                              <font-awesome-icon icon="arrow-alt-circle-right" size="1x" class="[ mr-2 ]" />
                                {{ key | upperFirst }}
                            </b-link>
                          </b-media>
                        </ul>
                    </p>
                </div>
                <div class="[ text-center ]" v-else>
                    <h3 class="[ text-white ]">Loading..</h3>
                </div>
            </b-container>
        </b-row>
    </b-container>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"; 
import axios from 'axios';
const corsURL = "https://cors-anywhere.herokuapp.com/"; // Needed for Unblocking Cross-Origin request
const apiURL = "https://api.spacexdata.com/v2/info/"; // API to fetch from

export default {
  name: 'about',
  components: { FontAwesomeIcon },
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