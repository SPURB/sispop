export default function ({ $axios }, inject) {
  const vistoria = $axios.create({ baseURL: process.env.apiBaseUrl })

  inject('vistoria', vistoria)
}
