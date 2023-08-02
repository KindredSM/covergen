<template>
  <div class="create-container">
    <h1>Write your next song</h1>
    <div class="create">
      <input
        type="text"
        id="prompt"
        class="input"
        v-model="lyricsPrompt"
        v-bind:placeholder="defaultLyricsPrompt"
      />

      <button class="create-button" @click="generateLyrics">create</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      lyricsPrompt: '',
      negativeLyricsPrompt: '',
      defaultLyricsPrompt: 'A song about Brighton'
    }
  }
}
</script>
