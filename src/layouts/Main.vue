<template>
  <div>
    <loader v-if="loading" />
    <div  class="app-main-layout" v-else>
      <navbar @click="isOpen = !isOpen" />

      <sidebar v-model="isOpen" />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn" v-tooltip="'Новая запись'">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/app/Navbar'
import Sidebar from '../components/app/Sidebar'
import messages from '../messages'

export default {
  data: () => ({
    isOpen: true,
    loading: true
  }),
  components: {Navbar, Sidebar},
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что то пошло не так')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
