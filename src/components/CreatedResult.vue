<template>
  <div>
    <div v-if="isLoading" class="loading-state">Loading...</div>
    <img
      v-else-if="parsedResult.imageUrl"
      :src="parsedResult.imageUrl"
      alt="Generated Image"
      class="result"
    />
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: () => ({})
    },
    isLoading: {
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
  background-color: #f0f0f0;
  font-weight: bold;
}
</style>
