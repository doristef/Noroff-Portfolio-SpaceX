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
                    Where is the ISS now?
                </b-card-title>
                <b-card-sub-title>
                    International Space Station
                </b-card-sub-title>
                <div class="[ mt-3 ]" >
                    <h2 v-if="loadingIss">Loading....</h2>
                    <ul v-else>
                        <li>
                            Latitude: <b>{{ removeDecimals(issLocation.iss_position.latitude, 2) }}</b> 
                        </li>
                        <li>
                            Longitude: <b>{{ removeDecimals(issLocation.iss_position.longitude, 2) }}</b>
                        </li>
                    </ul>
                </div>
                <div v-if="issLocation.iss_position" class="[ align-content-center ]"> 
                    <GmapMap
                        :center="{lat: removeDecimals(issLocation.iss_position.latitude, 2), lng: removeDecimals(issLocation.iss_position.longitude, 2) }"
                        :zoom="7"
                        map-type-id="satellite"
                        style="width: 500px; max-width: 95%; height: 300px; max-height: 95%; margin: 0 auto;"
                    >
                        <GmapMarker
                            :position="{lat: removeDecimals(issLocation.iss_position.latitude, 2), lng: removeDecimals(issLocation.iss_position.longitude, 2) }"
                            :clickable="true"
                            :draggable="false"
                            @click="center={lat: removeDecimals(issLocation.iss_position.latitude, 2), lng: removeDecimals(issLocation.iss_position.longitude, 2) }"
                        />
                    </GmapMap>
                </div>
            </b-card-body>
                <b-card-footer>
                    Go look up to the skies 
                </b-card-footer>
        </b-card>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';

const corsURL = "https://cors-anywhere.herokuapp.com/"; // Unblock Cross-Origin request
const issApiURL = "http://api.open-notify.org/iss-now.json"; // API 

export default {
  name: 'issLocation',
  components: {
  },

  data() {
    return {
      issLocation: [],
      errors: [],
      loadingIss: true
    }
  },
  methods: {
    removeDecimals: function(num, dec) {
        return Number(Math.round(num+'e'+dec)+'e-'+dec);
    },

    getIssLocation: function() {
      axios
        .get(corsURL + issApiURL)
        .then(response => { this.issLocation = response.data; })
        .catch(e => { this.errors.push(e) })
        .finally(() => this.loadingIss = false)
    }
  },

  created() {
    this.getIssLocation();
  }
}
</script>