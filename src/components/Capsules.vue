<template>
    <b-container class="[ container ][ bg-nav ]">
        <b-row align-h="center" class="[ m-2 mb-5 ]">
            <h1 class="[ text-white ]"> SpaceX Capsules </h1>
        </b-row>

<!--- CARDS --->
        <b-row align-h="center">

        <h2 v-if="loading">Loading...</h2>
        <b-card v-else v-for="(capsule, key) in capsules" :key="key"
                no-body
                tag="article"
                text-variant="dark"
                class="[ m-3 ][ text-dark ][ card-20 ]">
                <b-card-body> 
                    <b-card-title> {{ capsule.type }} </b-card-title>
                    <b-card-sub-title> <b>{{ capsule.capsule_serial }}</b> </b-card-sub-title>
                    <div class="[ mt-3 ]">

                            <h5 class="[ ml-2 ][ text-muted ]">Status: {{ capsule.status | upperFirst }} </h5>
                                
                            <div v-if="capsule.original_launch" class="[ mb-4 ]">
                                <h5> Original Launch: </h5>
                                <p class="[ ml-3 ]">{{ capsule.original_launch | formatDate }}</p>
                            </div>
                            <div v-if="capsule.country" class="[ mb-4 ]">
                                <h5> Country: </h5>
                                <p class="[ ml-3 ]">{{ capsule.country }}</p>
                            </div>
                            <div v-if="capsule.cost_per_launch">
                                <h5> Cost per Launch: </h5>
                                <p class="[ ml-3 ]">{{ capsule.cost_per_launch | formatMoney }}</p>
                            </div>
                        <read-more v-if="capsule.details" more-str="read more" :text="capsule.details" link="#" less-str="read less" :max-chars="150"></read-more>
                    </div>
                </b-card-body>
                    <b-card-footer>
                        <span>
                            This capsule has been reused <strong> {{ capsule.reuse_count }} </strong> times
                        </span>
                    </b-card-footer>
          </b-card>
<!--- CARDS END -->

        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios';
const corsURL = "https://cors-anywhere.herokuapp.com/"; // Unblock Cross-Origin request
const apiURL = "https://api.spacexdata.com/v2/parts/caps/"; // API 

export default {
  name: 'capsules',
  data() {
    return {
        capsules: [],
        errors: [],
        loading: true,
        isActive: ''
    }
  },

  methods: {
    getCapsules: function() {
      this.loading = true;
      this.apiCall();
    },

    apiCall: function() {
      axios.get(corsURL + apiURL)
        .then(response => { this.capsules = response.data; })
        .catch(e => { this.errors.push(e) })
        .finally(() => this.loading = false )
    }
  },

  created() {
    this.apiCall();
  }
}
</script>