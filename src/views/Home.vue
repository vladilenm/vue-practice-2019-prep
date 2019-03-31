<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <loader v-if="loading" />

    <div class="row" v-else>
      <div class="col s12 m6 l4">
        <HomeBill
          :rates="currency.rates"
        />
      </div>

      <div class="col s12 m6 l8">
        <HomeCurrency
          :rates="currency.rates"
          :date="currency.date"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HomeBill from '../components/HomeBill'
import HomeCurrency from '../components/HomeCurrency'
export default {
  name: 'home',
  data: () => ({
    currency: null,
    loading: true
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('getCurrency')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('getCurrency')
      this.loading = false
    }
  },
  components: {HomeBill, HomeCurrency}
}
</script>
