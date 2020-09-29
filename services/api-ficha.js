import { http } from './http'

export default {
  info: (id) => {
    return http.get(`/info/${id}`)
  },
  imagens: (id) => {
    return http.get(`/imagem/${id}`)
  }
}
