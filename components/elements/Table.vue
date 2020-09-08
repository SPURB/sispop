<template>
  <div class="table-overflow">
    <table>
      <tr>
        <td class="td-header">
          Nome do edifício
        </td>
        <td class="td-valor" colspan="4">
          {{ ficha.nomeEdificio }}
        </td>
      </tr>
      <tr>
        <td class="td-header">
          Autor do projeto
        </td>
        <td class="td-valor">
          {{ ficha.autorProjeto }}
        </td>
        <td class="td-header">
          Construtora
        </td>
        <td class="td-valor">
          {{ ficha.construtora }}
        </td>
      </tr>
      <tr>
        <td class="td-header">
          Quantidade de pavimentos
        </td>
        <td class="td-valor">
          {{ ficha.qtdPavimentos }}
        </td>
        <td class="td-header">
          Acesso direto aos demais pavimentos direto da rua?
        </td>
        <td class="td-valor">
          {{ ficha.acessoDireto }}
        </td>
      </tr>
      <tr>
        <td class="td-header">
          Imóvel notificado (PEUC)
        </td>
        <td class="td-valor">
          {{ ficha.imovelNotificado }}
        </td>
        <td class="td-header">
          Data de construção
        </td>
        <td class="td-valor">
          {{ ficha.dataConstrucao }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Ficha',
  props: {
    ficha: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.table-overflow {
  overflow: auto;
}
table {
  border-collapse: collapse;
  width: 100%;
  tr {
    border-top: 0.5px solid rgba(0, 0, 0, 0.39);
    td { padding: 7px; font-size: 11pt; }
    .td-header {
      font-weight: bold;
    }
  }
}
</style>
