<template>
    <b-container class="[ container ][ bg-nav ]">
        <b-row align-h="center" class="[ m-2 mb-5 ]">
            <h1 class="[ text-white ]"> Articles - SpaceX</h1>
        </b-row>
        <b-row class="[ m-2 mb-5 ]">
            <b-input-group class="[ justify-content-center ]">
                <b-input-group-text slot="prepend">
                    <font-awesome-icon icon="search" size="1x" class="[ text-navigation-icon ]" /> 
                </b-input-group-text>
                <b-form-input
                    id="searchArticles"
                    v-model="articleSearch"
                    type="text"
                    placeholder="Search in Articles"
                />
            </b-input-group>

        </b-row>
        <b-row align-h="center">

<!--- CARDS --->
    <h2 v-if="loading">Loading....</h2>
        <b-card v-else v-for="(article, i) in getFilteredArticles" :key="i"
                no-body
                sub-title="Tue, 07 Aug 2018"
                tag="article"
                text-variant="dark"
                class="[ m-3 ][ text-dark ][ card-20 ]">
                <b-card-body> 
                    <b-card-title><a :href='String( article.links["article"] )' v-if='article.links["article"]'> {{article.title}} </a> <span v-else>{{article.title}}</span></b-card-title>
                    <b-card-sub-title>{{ article.event_date_utc | formatDate }}</b-card-sub-title>
                    <b-card-text class="[ mt-3 ]">
                        <read-more more-str="read more" :text="article.details" link="#" less-str="read less" :max-chars="150"></read-more>
                    </b-card-text>
                </b-card-body>
                    <b-card-footer>
                        <span v-for="(links, i) in article.links" :key="i">
                            <span  v-if="links !== null" class="[ ml-3 ]">
                                <a :href='String( links )' :alt="{ i }"><b> {{ i | upperFirst }} </b></a></span>
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
const corsURL = "https://cors-anywhere.herokuapp.com/"; // Needed for Unblocking Cross-Origin request
const apiURL = "https://api.spacexdata.com/v2/info/history/?sort=event_date_utc&order=desc"; // API to fetch from

export default {
  name: 'articles',
  components: {
      FontAwesomeIcon
  },
  data() {
    return {
      articles: [],
      errors: [],
      articleSearch: '',
      loading: true
    }
  },

  computed: {
    getFilteredArticles() {
      return this.articles.filter((article) => {
        return article.title.toLowerCase()
        .indexOf(this.articleSearch.toLowerCase()) > -1;
      });
    }
  },

  methods: {
    getArticle: function() {
      this.loading = true;
      this.apiCall();
    },
    apiCall: function() {
      axios.get(corsURL + apiURL)
        .then(response => { this.articles = response.data; this.loading = false; })
        .catch(e => { this.errors.push(e) })
    }
  },

  created() {
    this.apiCall();
  }
}
</script>