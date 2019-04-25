<template>
    <b-container class="[ container ]">
        <b-jumbotron class="[ text-center ][ pt-0 ]">
            <div v-if="loading"> <h1 class="[ jumbotron-heading ][ mt-2 ]"> Loading... </h1> </div>
            <div v-else>
                <div class="[ mb-2 ]">
                    <a v-if="apod.hdurl" :href="apod.hdurl" :alt="apod.title">
                        <b-img :src="apod.url" :alt="apod.title" class="[ apod-img ]" />
                    </a>
                    <a v-else-if="apod.url" :href="apod.url" :alt="apod.title">
                        <b-img :src="apod.url" :alt="apod.title" class="[ apod-img ]" />
                    </a>
                </div>
                <h1 class="[ jumbotron-heading ]">{{ apod.title }}</h1>
                <b-collapse id="collapse-text" class="[ mt-2 ][ align-content-center ]">
                    <p v-if="apod.date"> {{ apod.date | formatDate }} </p>   
                    <p v-if="apod.explanation" class="[ apod-collapse ][ text-left ]">
                        {{ apod.explanation }}
                    </p>
                    <p>
                        <b>
                            <a v-if="apod.hdurl" :href="apod.hdurl" :alt="apod.title">
                            Click here for this image in HD</a>
                        </b>  
                    </p>
                    <p v-if="apod.copyright"> Copyright: {{ apod.copyright }}</p>
                </b-collapse>

                <b-button v-b-toggle.collapse-text variant="success" @click="btnText = !btnText">Read <span v-if="btnText">More</span><span v-else>Less</span></b-button>
            </div>
        </b-jumbotron>
    </b-container>
</template>

<script>
import axios from 'axios';
const corsURL = "https://cors-anywhere.herokuapp.com/"; // Unblock Cross-Origin request
const apodApiURL = "https://api.nasa.gov/planetary/apod?api_key=U4rRiFqibIG2QG7OAaDiLyQTeMkGOYrHjXEH31qo"; // API

export default {
    name: 'Jumbotron',

    data() {
        return {
            btnText: true,
            apod: [],
            errors: [],
            loading: true,
        }
    },

    methods: {
        getApod: function() {
        axios
            .get(corsURL + apodApiURL)
            .then(response => { this.apod = response.data; })
            .catch(e => { this.errors.push(e) })
            .finally(() => this.loading = false)
        }
    },

    created() {
        this.getApod();
    }
}
</script>