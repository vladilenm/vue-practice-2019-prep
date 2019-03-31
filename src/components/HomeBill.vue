<template>
  <div class="card light-blue bill-card">
    <div class="card-content white-text">
      <span class="card-title">Счет в валюте</span>

      <p
        v-for="cur of currencies"
        :key="cur"
        class="currency-line"
      >
        <span>{{getCurrency(cur) | currency(cur)}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data: () => ({
    currencies: ['RUB', 'EUR', 'USD']
  }),
  computed: {
    base() {
      return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
    }
  },
  methods: {
    getCurrency(base) {
      return Math.floor(this.base * this.rates[base])
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
