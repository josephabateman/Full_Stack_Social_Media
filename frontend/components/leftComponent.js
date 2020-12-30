app.component('left-component', {
    template:
    /*html*/
    `
    <p>Left component</p>
    <img :src="image" width="50" alt="">
  `,
  data: function() {
    return {
        image: './Groupomania_Logos/icon.png'
    }
},
})