<template>
  <nav class="navbar">
    <img alt="logo" class="logo" src="@/assets/CoverGenLogo.svg" />
    <ul class="nav-links">
      <li>
        <router-link to="/"> <p>Art</p></router-link>
      </li>
      <li>
        <router-link to="/Lyrics"> <p>Lyrics</p></router-link>
      </li>
    </ul>
  </nav>
</template>

<style>
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

.logo {
  margin-left: 25px;
  width: 150px;
}

.nav-links {
  list-style: none;
  margin-right: 25px;
  display: flex;
  flex-direction: row;
  gap: 30px;
  font-size: 18px;
}
</style>
