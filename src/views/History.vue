<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart" :hidden="!records.length">
      <canvas ref="canvas"></canvas>
    </div>

    <loader v-if="loading" />

    <section v-else-if="!records.length">
      <p class="center">CONTENTA NET</p>
    </section>

    <section v-else>
      <HistoryTable :records="items" />

      <div v-if="pageCount > 1">
        <paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
          :page-link-class="'active'"
        />
      </div>
    </section>
  </div>
</template>

<script>
import HistoryTable from '../components/HistoryTable'
import PaginationMixin from '../mixins/pagination.mixin'
import {Pie} from 'vue-chartjs'

export default {
  name: 'history',
  extends: Pie,
  mixins: [PaginationMixin],
  data() {
    return {
      records: [],
      categories: [],
      loading: true,
    }
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.setup(this.records, this.categories)
    this.loading = false
  },
  methods: {
    setup(records, categories) {
      this.setupPagination(records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        }
      }))
      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [{
          label: 'Расходы',
          data: categories.map(c => {
            return records.reduce((total, r) => {
              if (r.categoryId === c.id) {
                if (r.type === 'outcome') {
                  total += +r.amount
                }
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ]
        }]
      })
    }
  },
  components: {
    HistoryTable
  }
}
</script>

<style lang="scss" scoped>

</style>
