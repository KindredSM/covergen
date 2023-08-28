<template>
  <div class="result-container">
    <div v-if="loading" class="loading-state"><div class="spinner"></div></div>

    <img
      v-else-if="parsedResult.imageUrl"
      :src="parsedResult.imageUrl"
      alt="Generated Image"
      class="result"
    />
    <div class="button-container">
      <button class="btn delete-button" @click="deleteResult"><delete-icon /></button>
      <button class="btn favorite-button" @click="$emit('toggleFavorite')">
        <favorite-icon class="favorite-icon" v-if="!isfavorite" /><favoriteSelectedIcon v-else />
      </button>
      <a
        v-if="parsedResult.imageUrl"
        :href="parsedResult.imageUrl"
        class="btn download-button"
        target="_blank"
        download
      >
        <download-icon />
      </a>
    </div>
  </div>
</template>

<script>
import DownloadIcon from './icons/DownloadIcon.vue'
import DeleteIcon from './icons/DeleteIcon.vue'
import favoriteIcon from './icons/favoriteIcon.vue'
import favoriteSelectedIcon from './icons/favoriteSelectedIcon.vue'

export default {
  data() {
    return {
      favorite: false
    }
  },

  components: {
    DownloadIcon,
    DeleteIcon,
    favoriteIcon,
    favoriteSelectedIcon
  },
  props: {
    isfavorite: Boolean,
    result: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    parsedResult() {
      return this.result
    }
  },
  methods: {
    deleteResult() {
      this.$emit('delete', this.result)
    },
    togglefavorite() {
      this.favorite = !this.favorite
    }
  }
}
</script>

<style>
.result {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  aspect-ratio: 1 /1;
  max-width: 300px;
  border: 1px solid rgb(87, 87, 87);
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  aspect-ratio: 1 /1;

  width: 300px;
  height: 300px;
  background: transparent;
  font-weight: bold;
}

.spinner {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #282828; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

.result-container {
  position: relative;
  display: inline-block;
}

.button-container {
  width: 100%;
  padding: 10px;
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  flex-direction: row;
}
.download-button {
  background-color: #282828;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  display: none;
  transition: ease all 0.2s;
  width: 60px;
  height: 35px;
  border-radius: 20px;

  justify-content: center;
  align-items: center;
}

.favorite-button {
  display: none;
  width: 60px;
  height: 35px;
  border-radius: 20px;

  justify-content: center;
  align-items: center;
}
.delete-button {
  background-color: #282828;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  display: none;
  outline: none;
  border: none;
  cursor: pointer;
  transition: ease all 0.2s;
  width: 60px;
  height: 35px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
}

.delete-button:hover,
.download-button:hover {
  background-color: #313131;
}
.result-container:hover .download-button {
  display: flex;
}
.result-container:hover .delete-button {
  display: flex;
}

.result-container:hover .favorite-button {
  display: flex;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 670px) {
  .result {
    width: 80vw;
  }
  .loading-state {
    width: 80vw;
  }
}
</style>
