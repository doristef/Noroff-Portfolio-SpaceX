<template>
    <b-container class="[ container ][ navbar-bg ]">
        <b-row align-h="center" class="[ m-2 mb-5 ]">
            <h1 class="[ text-white ]"> Upcoming Launches</h1>
        </b-row>
<!--- SORT --->
        <b-row align-h="center" class="[ m-2 mb-5 ]">
                <b-dropdown text="Sort By" variant="secondary" slot="append">
                    <b-dropdown-item>
                        <a href="#" id="mission_name"
                            @click="requestKeyChange('mission_name')">Mission Name
                            <font-awesome-icon icon="check" size="1x" class="[ mr-2 ]"
                            v-if="filterKey==='mission_name'" />
                        </a>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <a href="#" id="launch_date_unix"
                            @click="requestKeyChange('launch_date_unix')">Launch Date
                            <font-awesome-icon icon="check" size="1x" class="[ mr-2 ]"
                            v-if="filterKey==='launch_date_unix'" />
                        </a>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <a href="#" id="flight_number"
                            @click="requestKeyChange('flight_number')"
                            >Flight Number
                            <font-awesome-icon icon="check" size="1x" class="[ mr-2 ]"
                            v-if="filterKey==='flight_number'" />
                        </a>
                    </b-dropdown-item>

                <b-dropdown-divider></b-dropdown-divider>

                    <b-dropdown-item>
                        <a href="#" id="asc"
                            @click="requestDirChange('asc')">Asc
                            <font-awesome-icon icon="check" size="1x" class="[ mr-2 ]"
                            v-if="filterDir==='asc'" />
                        </a>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <a href="#" id="desc"
                            @click="requestDirChange('desc')">Desc
                            <font-awesome-icon icon="check" size="1x" class="[ mr-2 ]"
                            v-if="filterDir==='desc'" />
                        </a>
                    </b-dropdown-item>
                </b-dropdown>
        </b-row>
<!--- SORT END --->
<!--- CARDS --->
        <b-row align-h="center">

    <h2 v-if="loading">Loading...</h2>
        <b-card v-else v-for="(launch, i) in getFilteredLaunches" :key="i"
                no-body
                tag="article"
                text-variant="dark"
                class="[ m-3 ][ text-dark ][ card-30 ]">
                <b-card-body> 
                    <b-card-title>{{ launch.mission_name }} <span class="float-right"><b>#{{ launch.flight_number }}</b></span> </b-card-title>
                    <b-card-sub-title class="[ ml-2 ]">{{ launch.launch_date_utc | formatDate }}</b-card-sub-title>
                        <div class="[ mt-4 ]">

                            <div v-if="launch.launch_site.site_name_long" class="[ mb-4 ]">
                                <h5> Launch Site: </h5>
                                <p class="[ ml-3 ]">{{ launch.launch_site.site_name_long }}</p>
                            </div>

                            <div v-if="launch.rocket.rocket_name">
                                <h5> Rocket: </h5>
                                <p class="[ ml-3 ]">{{ launch.rocket.rocket_name }}</p>
                            </div>

                        </div>
                </b-card-body>
                    <b-card-footer>
                        <span v-for="(link, i) in launch.links" :key="i">
                            <span  v-if="link !== null && link.isArray" class="[ ml-3 ]">
                                <a :href='String( link )' :alt="{ i }"><b> {{ i | upperFirst }} </b></a>
                            </span>
                        </span>
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
const apiURL = "https://api.spacexdata.com/v2/launches/upcoming"; // API 

export default {
  name: 'upcominglaunch',
  components: { FontAwesomeIcon },
  data() {
    return {
        launches: [],
        errors: [],
        loading: true,
        filterKey: 'mission_name',
        filterDir: 'desc'
    }
  },

  computed: {
    getFilteredLaunches() {
        // eslint-disable-next-line
        return _.orderBy(this.launches, function(item){
            return item[this.filterKey];
        }.bind(this),this.filterDir);
    }
  },

  methods: {
    getLaunches: function() {
      this.loading = true;
      this.apiCall();
    },

    apiCall: function() {
      axios.get(corsURL + apiURL)
        .then(response => { this.launches = response.data; })
        .catch(e => { this.errors.push(e) })
        .finally(() => this.loading = false )
    },
    
    requestDirChange: function(dir) {
        return this.filterDir = dir;
    },

    requestKeyChange: function(key) {
        return this.filterKey = key;
    }
  },

  created() {
    this.apiCall();
  }
}
</script>