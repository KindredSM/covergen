<template>
  <div class="result-container">
    <div v-if="loading" class="loading-state"><div class="spinner"></div></div>
    <img
      v-else-if="parsedResult.imageUrl"
      :src="parsedResult.imageUrl"
      alt="Generated Image"
      class="result"
    />
    <a
      v-if="parsedResult.imageUrl"
      :href="parsedResult.imageUrl"
      class="download-btn"
      target="_blank"
      download
    >
      Download
    </a>
  </div>
</template>

<script>
export default {
  props: {
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
  }
}
</script>

<style>
.result {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  aspect-ratio: 1 /1;
  width: 300px;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  aspect-ratio: 1 /1;
  width: 300px;
  height: 300px;
  background-color: #282828;
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

.download-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #282828;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  display: none;
}

.result-container:hover .download-btn {
  display: block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
