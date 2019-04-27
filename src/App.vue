<template>
  <div id="app" class="[ navbar-bg ]">

    <Navigation :dropdown="this.dropdown" :navigation="this.navigation" :hideNavbar="hideNavbar" />
    <router-view />
    <router-view name="helper" />

    <footer class="[ text-muted text-center ][ mt-3 ]">
      <b-container class="[ container ]">
        <p>SpaceX Dashboard by <a href="http://doristef.me" title="doristef.me - Frontend Developer" class="[ text-secondary ]">doristef.me</a></p>
      </b-container>
    </footer>
    
  </div>
</template>

<script>
/* Import Vue Router and Components */
import VueRouter from 'vue-router';
import Navigation from './components/Navigation.vue';
import Apod from './components/Apod.vue';
import Articles from './components/Articles.vue';
import Latest from './components/Latest.vue';
import Upcoming from './components/Upcoming.vue';
import Rockets from './components/Rockets.vue';
import Capsules from './components/Capsules.vue';
import Astronauts from './components/Astronauts.vue';
import IssLocation from './components/IssLocation.vue';
import About from './components/About.vue';
import Contact from './components/Contact/Contact.vue';
import ThankYou from './components/Contact/ThankYou.vue';

/* Router Config */
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      components: {
        default: Apod,
        helper: Articles
      },
    },
    {
      path: '/articles',
      component: Articles,
    },
    {
      path: '/latestlaunch',
      component: Latest,
    },
    {
      path: '/upcominglaunch',
      component: Upcoming,
    },
    {
      path: '/rockets',
      component: Rockets,
    },
    {
      path: '/capsules',
      component: Capsules,
    },
    {
      path: '/apod',
      component: Apod,
    },
    {
      path: '/astronauts',
      component: Astronauts,
    },
    {
      path: '/isslocation',
      component: IssLocation,
    },
    {
      path: '/about',
      component: About,
    },
    {
      path: '/contact',
      component: Contact,
    },
    {
      path: '/thankyou',
      component: ThankYou
    }
  ],
    // eslint-disable-next-line
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
})

export default {
  name: 'app',
  router,
  components: {
    Navigation,    
  },
  data() {
    return {
      /* NAVIGATION */
        dropdown: { 'Find out more' : {
                                    articles : 'Articles', 
                                    latestlaunch : 'Latest Launch',
                                    upcominglaunch : 'Upcoming Launches',
                                    rockets : 'Rockets',
                                    capsules : 'Capsules'
                                },
                    'Fun stuff' : {
                                    apod : 'APOD', 
                                    isslocation : 'ISS Location Map',
                                    astronauts : 'Astronauts in Space'
                                },
                },
        navigation: { 
                        about: 'About SpaceX',
                        contact: 'Contact'
        },
      /* NAVIGATION END */
      hideNavbar: false,
      lastScrollPosition: 0,
    }
  },

  methods: {
    onScroll () {
        // For some reason it only works on body
        var sh = document.body.scrollHeight;
        var st = document.body.scrollTop;
        var oh = document.body.offsetHeight;

        var currentScrollPosition = (sh-st-oh+1)
            
            if (currentScrollPosition < 0) { return }
            if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 30) { return }

          this.hideNavbar = currentScrollPosition < this.lastScrollPosition
          this.lastScrollPosition = currentScrollPosition
    } // onScroll
  },
  mounted() {
    document.body.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    document.body.removeEventListener('scroll', this.onScroll);
  },
}
</script>
