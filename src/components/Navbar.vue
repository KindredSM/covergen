<template>
  <nav class="navbar">
    <div class="logo-container">
      <img alt="logo" class="logo" src="@/assets/CoverGenLogo.svg" />
      <p class="prodia">
        powered by <a href="https://prodia.com/" target="_blank" class="prodia">Prodia</a>
      </p>
    </div>
    <mobile-nav-vue class="mobile-icon" @click="navOpen = !navOpen" />

    <div class="mobile-nav" v-if="navOpen" :class="{ open: navOpen }">
      <ul class="mobile-nav-links">
        <li class="link" @click="navOpen = false">
          <router-link to="/" active-class="router-link-active" class="link">
            <art-icon />
            <p>Art</p>
          </router-link>
        </li>
        <li class="link" @click="navOpen = false">
          <router-link to="/Lyrics" class="link">
            <lyrics-icon />
            <p>Lyrics</p>
          </router-link>
        </li>
        <li class="link" @click="navOpen = false">
          <a href="https://github.com/KindredSM/covergen" target="_blank"> <p>GitHub</p></a>
        </li>
      </ul>
    </div>

    <ul class="nav-links">
      <li class="link">
        <router-link to="/" active-class="router-link-active" class="link">
          <art-icon />
          <p>Art</p>
        </router-link>
      </li>
      <li>
        <router-link to="/Lyrics" class="link">
          <lyrics-icon />
          <p>Lyrics</p>
        </router-link>
      </li>
      <li>
        <a href="https://github.com/KindredSM/covergen" target="_blank"> <p>GitHub</p></a>
      </li>
    </ul>
  </nav>
</template>

<script>
import LoginIcon from './icons/LoginIcon.vue'
import LyricsIcon from './icons/LyricsIcon.vue'
import ArtIcon from './icons/ArtIcon.vue'
import MobileNavVue from './icons/MobileNav.vue'

export default {
  components: {
    LoginIcon,
    LyricsIcon,
    ArtIcon,
    MobileNavVue
  },
  data() {
    return {
      navOpen: false
    }
  },
  methods: {
    toggleMobileNav() {
      this.navOpen = !this.navOpen
    }
  }
}
</script>

<style>
.router-link-active {
  border-bottom: 2px solid white;
}

.link {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.navbar {
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  top: 0;
  height: 80px;
  width: 100%;
  z-index: 99;

  background: var(--color-background);
}

.logo-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.logo {
  margin-left: 25px;
  width: 150px;
  cursor: pointer;
}

li {
  list-style: none;
}

.nav-links {
  list-style: none;
  margin-right: 25px;
  display: flex;
  flex-direction: row;
  gap: 30px;
  font-size: 18px;
}

.mobile-icon {
  position: absolute;
  right: 40px;
  display: none;
  z-index: 99;
}

.mobile-nav {
  position: absolute;
  right: 0;
  display: flex;
  width: 70vw;
  height: 200vh;
  background-color: var(--vt-c-black);
  z-index: 1;
  border-right: 1px solid #2e2e2e;

  flex-direction: column;
  justify-content: center;
  transform: translateX(100%);
  transition: transform 0.5s ease;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  margin-top: 300px;
  gap: 20px;
}

.mobile-nav.open {
  transform: translateX(0);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}

@media screen and (max-width: 670px) {
  .prodia,
  .nav-links {
    display: none;
  }

  .mobile-icon {
    display: block;
  }
  .link {
    flex-direction: row-reverse;
    justify-content: flex-end;
  }
  .mobile-nav {
    display: flex;
  }
}
</style>
