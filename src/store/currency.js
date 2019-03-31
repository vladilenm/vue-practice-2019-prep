import axios from 'axios'

export default {
  actions: {
    async getCurrency({}) {
      const key = process.env.VUE_APP_FIXER
      const url = `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      const {data} = await axios.get(url)
      return data
    }
  }
}
