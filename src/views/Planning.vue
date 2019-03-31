<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{bill | currency('RUB')}}</h4>
    </div>

    <loader v-if="loading" />

    <section v-else-if="!categories.length">
      <p class="center">CONTENTA NET</p>
    </section>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency}} из {{cat.limit | currency}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import currencyFilter from '../filters/currency.filter'

export default {
  data: () => ({
    categories: [],
    loading: true,
  }),
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(cat => {
      const spend = records
        .filter(record => record.categoryId === cat.id)
        .filter(record => record.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)
      const percent = (100 * spend / cat.limit)
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'
      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
      return {
        ...cat,
        progressPercent,
        spend,
        progressColor,
        tooltip
      }
    })
    this.loading = false
  },
  computed: {
    bill() {
      return this.$store.getters.info.bill
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
