<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">

    <router-link
      to="/"
      tag="li"
      active-class="active"
      exact
    >
      <a href="#" class="waves-effect waves-orange pointer">Счет</a>
    </router-link>
    <router-link
      to="/history"
      tag="li"
      active-class="active"
    >
      <a href="#" class="waves-effect waves-orange pointer">История</a>
    </router-link>
    <router-link
      to="/planning"
      tag="li"
      active-class="active"
    >
      <a href="#" class="waves-effect waves-orange pointer">Планирование</a>
    </router-link>
    <router-link
      to="/record"
      tag="li"
      active-class="active"
    >
      <a href="#" class="waves-effect waves-orange pointer">Новая запись</a>
    </router-link>
    <router-link
      to="/categories"
      tag="li"
      active-class="active"
    >
      <a href="#" class="waves-effect waves-orange pointer">Категории</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['value']
}
</script>

<style lang="scss" scoped>

</style>
