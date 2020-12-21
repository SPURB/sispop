import { http } from './http'

export default {
  info: (query) => {
    return http.get(`/info?${query}`)
  },
  imagens: (query) => {
    return http.get(`/imagem?${query}`)
  }
}
