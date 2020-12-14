<template>
  <button type="button" @click="createPDF">
    Salvar como .pdf
  </button>
</template>

<script>
import { pdfSem } from '@/libs/pdf'
export default {
  name: 'CreatePDF',
  props: {
    header: {
      type: Object,
      required: true
    },
    ficha: {
      type: Object,
      required: true
    },
    caracterizacao: {
      type: Object,
      required: true
    },
    diagnostico: {
      type: Object,
      required: true
    },
    imagens: {
      type: Object,
      required: true
    },
    paginaDois: {
      type: Object,
      required: true
    }
  },
  methods: {
    loadExternalLib (url) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.onload = () => {
          resolve(`${url} está pronta`)
        }
        script.async = true
        script.src = url
        document.head.appendChild(script)
      })
    },
    async createPDF () {
      try {
        await this.loadExternalLib(
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/pdfmake.min.js'
        )
        await this.loadExternalLib(
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/vfs_fonts.js'
        )

        const content = pdfSem(
          this.header,
          this.caracterizacao,
          this.diagnostico,
          this.paginaDois.ambiencia,
          this.paginaDois.historicos,
          this.paginaDois.arquitetonicos,
          this.ficha,
          this.imagens
        )
        const now = new Date()
        const fileName = this.header.codigoLote + '_' + now.getUTCDate() + '_' + now.getMonth() + '_' + now.getFullYear() + '_' + now.getTime()

        window.pdfMake.createPdf(content).download(fileName)
      } catch (error) {
        console.log(error)
      } finally {
        // this.pdf.loading = false
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~/assets/variables';
button {
  color: #fff;
  background-color: $brand-2;
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 5px;
  width: 100%;

  &:hover {
    cursor: pointer;
    border: 1px solid #fff;
  }
}
</style>
