<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from './layouts/Empty'
import MainLayout from './layouts/Main'
import LoadingLayout from './layouts/Main'

export default {
  computed: {
    layout() {
      if (!this.$store.dispatch('getUid')) {
        return 'empty-layout'
      }
      return (this.$route.meta.layout || 'loading') + '-layout'
    }
  },
  components: {
    EmptyLayout,
    MainLayout,
    LoadingLayout
  }
}
</script>

<style lang="scss">
  @import '~materialize-css/dist/css/materialize.min.css';
  @import "assets/theme";
</style>
