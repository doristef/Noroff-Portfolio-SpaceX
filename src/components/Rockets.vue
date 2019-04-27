<template>
    <b-container class="[ container ][ navbar-bg ]">
        <b-row align-h="center" class="[ m-2 mb-5 ]">
            <h1 class="[ text-white ]"> SpaceX Rockets </h1>
        </b-row>

<!--- CARDS --->
        <b-row align-h="center">

        <h2 v-if="loading">Loading....</h2>
        <b-card v-else
                no-body
                tag="article"
                text-variant="dark"
                class="[ m-3 ][ text-dark ][ card-40 ]"
                v-for="(rocket, key) in rockets" :key="key">

                <b-media class="[ m-3 ]"> 
                    <div class="[ mt-4 ]">
                        <span class="[ float-right ]">  <b>#{{ rocket.rocketid }}</b> </span>
                        <h3>{{ rocket.name }} </h3>
                        
                        <h5 class="[ ml-2 ][ text-muted ]"> {{ rocket.active ? 'Inactive' : 'Active' }} </h5>
                        <div class="[ mt-4 ]">
                                
                            <div v-if="rocket.first_flight" class="[ mb-4 ]">
                                <h5> First Flight: </h5>
                                <p class="[ ml-3 ]">{{ rocket.first_flight | formatDate }}</p>
                            </div>
                            <div v-if="rocket.country" class="[ mb-4 ]">
                                <h5> Country: </h5>
                                <p class="[ ml-3 ]">{{ rocket.country }}</p>
                            </div>
                            <div v-if="rocket.cost_per_launch">
                                <h5> Cost per Launch: </h5>
                                <p class="[ ml-3 ]">{{ rocket.cost_per_launch | formatMoney }}</p>
                            </div>
                            <div v-if="rocket.height.meters && rocket.diameter.meters">
                                <h5> Dimensions: </h5>
                                <p class="[ ml-3 ]"><b>Height:</b> {{ rocket.height.meters }}m</p>
                                <p class="[ ml-3 ]"><b>Diameter:</b> {{ rocket.diameter.meters }}m</p>
                                <p class="[ ml-3 ]"><b>Kg:</b> {{ rocket.mass.kg | formatNumber }}</p>
                            </div>

                            <div v-if="rocket.description">
                                <h5> Description: </h5>
                                <p class="[ ml-3 ]">{{ rocket.description }}</p>
                            </div>
                            <div v-if="rocket.flickr_images" class="[ mb-5 ]">
                                <h6>Images:</h6>
                                    <div class="[ ml-2 ]">
                                        <span class="[ ml-1 ]" v-for="(link, key) in rocket.flickr_images" :key="key">
                                            <a :href="link" :title="key"> 
                                                IMG{{ key + 1 }}</a>
                                        </span>
                                    </div>
                            </div>
                        </div>
                    </div>
                </b-media>
                    <b-card-footer>

                        <div class="[ ml-3 ]">
                            <span>
                                <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'chevron-right' }" size="1x" class="[ mr-2 ]" />

                                <a :href="rocket.wikipedia" title="Rocket Wikipedia" class="[ mr-2 ]"> 
                                    Wikipedia</a>
                            </span>
                        </div>
                    </b-card-footer>
          </b-card>
<!--- CARDS END -->

        </b-row>
    </b-container>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"; 
import axios from 'axios';
const corsURL = "https://cors-anywhere.herokuapp.com/"; // Unblock Cross-Origin request
const apiURL = "https://api.spacexdata.com/v2/rockets/"; // API 

export default {
  name: 'rockets',
  components: { FontAwesomeIcon },
  data() {
    return {
        rockets: [],
        errors: [],
        loading: true,
        isActive: ''
    }
  },

  methods: {
    getRockets: function() {
      this.loading = true;
      this.apiCall();
    },

    apiCall: function() {
      axios.get(corsURL + apiURL)
        .then(response => { this.rockets = response.data; })
        .catch(e => { this.errors.push(e) })
        .finally(() => this.loading = false )
    }
  },

  created() {
    this.apiCall();
  }
}
</script>