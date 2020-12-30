app.component('right-component', {
    template:
    /*html*/
    `
    <p>right component (main)</p>
    <h1>{{ product }}</h1>
  `,
  data: function() {
    return {
      product: 'Socks'
    }
},
})