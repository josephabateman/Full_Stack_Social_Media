postIdFunc: function () {
    this.postIdToModify = event.target.id;
    this.modifyButtonClicked = true;
    this.createPostButtonClicked = false
    //run fetchOne method which prefills modify data values
    this.fetchOne()
    // console.log(this.postIdToModify)
}