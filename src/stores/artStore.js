import { defineStore } from 'pinia'

export const useArtStore = defineStore({
  id: 'artStore',
  state: () => ({
    favorites: []
  }),
  actions: {
    addfavorite(artId) {
      if (!this.favorites.includes(artId)) {
        this.favorites.push(artId)
      }
    }
  },
  removefavorite(artId) {
    this.favorites = this.favorites.filter((id) => id !== artId)
  },
  isfavorite(artId) {
    return this.favorites.includes(artId)
  }
})
