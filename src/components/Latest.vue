<template>
    <b-container class="[ container ][ bg-nav ]">
        <b-row align-h="center" class="[ m-2 mb-5 ]">
            <h1 class="[ text-white ]"> Latest Launch </h1>
        </b-row>

<!--- CARDS --->
        <b-row align-h="center">

        <h2 v-if="loading">Loading....</h2>
        <b-card v-else
                no-body
                tag="article"
                text-variant="dark"
                class="[ m-3 ][ text-dark ]">

                <b-media> 
                    <div slot="aside">
                        <div class="[ m-2 ]"><h5>#{{ latestLaunch.flight_number }}</h5></div>
                        <b-img v-if="latestLaunch.links.mission_patch"  :src="latestLaunch.links.mission_patch" class="[ launch-img ][ my-2 ]" />
                    </div>
                    <div class="[ mt-4 ]">
                        <h3>{{ latestLaunch.mission_name }} </h3>

                        <h5 class="[ ml-2 ][ text-muted ]" v-if="latestLaunch.launch_date_utc">{{ latestLaunch.launch_date_utc | formatDate }}</h5>
                        <div class="[ mt-4 ]">
                                

                            <div v-if="latestLaunch.launch_site.site_name_long" class="[ mb-4 ]">
                                <h5> Launch Site: </h5>
                                <p class="[ ml-3 ]">{{ latestLaunch.launch_site.site_name_long }}</p>
                            </div>

                            <div v-if="latestLaunch.rocket.rocket_name">
                                <h5> Rocket: </h5>
                                <p class="[ ml-3 ]">{{ latestLaunch.rocket.rocket_name }}</p>
                            </div>

                            <div v-if="latestLaunch.details">
                                <h5> Details: </h5>
                                <p class="[ ml-3 ]">{{ latestLaunch.details }}</p>
                            </div>
                            <div v-if="latestLaunch.links.flickr_images" class="[ mb-5 ]">
                                <h6>Images:</h6>
                                    <div class="[ ml-2 ]">
                                        <span class="[ ml-1 ]" v-for="(link, key) in latestLaunch.links.flickr_images" :key="key">
                                            <a :href="link" :title="key" v-if="key !== 'youtube_id' && typeof link !== 'object'"> 
                                                IMG{{ key + 1 }}</a>
                                        </span>
                                    </div>
                            </div>
                        </div>
                    </div>
                </b-media>
                    <b-card-footer>
                        <h6>Links:</h6>
                        <div class="[ ml-3 ]">
                            <span>
                                <a :href='latestLaunch.telemetry.flight_club' alt="Flightclub" class="[ mr-2 ]"> 
                                    Flightclub</a>
                            </span>
                            <span v-for="(link, key) in latestLaunch.links" :key="key">
                                <font-awesome-icon v-if="key !== 'youtube_id' && typeof link !== 'object'" :icon="{ prefix: 'fas', iconName: 'chevron-right' }" size="1x" class="[ mr-2 ]" />

                                <a :href="link" title="key" v-if="key !== 'youtube_id' && typeof link !== 'object'" class="[ mr-2 ]"> 
                                    {{ key.replace(/(^|_)./g, s => ' ' + s.slice(-1).toUpperCase()) }}</a>
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
const apiURL = "https://api.spacexdata.com/v2/launches/latest"; // API 

export default {
  name: 'latestlaunch',
  components: { FontAwesomeIcon },
  data() {
    return {
        latestLaunch: [],
        errors: [],
        loading: true,
    }
  },

  methods: {
    getlatestLaunch: function() {
      this.loading = true;
      this.apiCall();
    },

    apiCall: function() {
      axios.get(corsURL + apiURL)
        .then(response => { this.latestLaunch = response.data; })
        .catch(e => { this.errors.push(e) })
        .finally(() => this.loading = false )
    }
  },

  created() {
    this.apiCall();
  }
}
</script>