<template>
  <nav class="navbar">
    <div class="logo-container">
      <img alt="logo" class="logo" src="@/assets/CoverGenLogo.svg" />
      <p class="prodia">
        powered by <a href="https://prodia.com/" target="_blank" class="prodia">Prodia</a>
      </p>
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

export default {
  components: {
    LoginIcon,
    LyricsIcon,
    ArtIcon
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

.nav-links {
  list-style: none;
  margin-right: 25px;
  display: flex;
  flex-direction: row;
  gap: 30px;
  font-size: 18px;
}

@media screen and (max-width: 670px) {
  .prodia {
    display: none;
  }
}
</style>
