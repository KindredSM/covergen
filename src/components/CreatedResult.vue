<template>
  <div>
    <img v-if="parsedResult.imageUrl" :src="parsedResult.imageUrl" alt="Generated Image" />
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: () => ({})
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
  width: 200px;
}
</style>
