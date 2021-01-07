module.exports = function timeElapsed(timeStamp) {
    let milliseconds = parseInt(timeStamp)
    let timeNow = Date.now()
    let difference = timeNow - milliseconds
    let timeElapsed = new Date(difference)

    const seconds = timeElapsed / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24
    const weeks = days / 30
    const years = days / 365

    //use a switch statement
    let measurement
    if (minutes <= 1) {
        measurement = `Less than a minute ago`
    } else if (minutes > 1 && minutes < 2) {
        measurement = `A minute ago`
    } else if (minutes > 2 && minutes < 60) {
        measurement = `${Math.round(minutes)} minutes ago`
    } else if (minutes >= 60 && minutes < 120) {
        measurement = `about an hour ago`
    } else if (minutes >= 120 && minutes < 24) {
        measurement = `${Math.trunc(hours)} hours ago`
    } else if (hours >= 24 && days < 2) {
        measurement = `yesterday`
    } else if (days >= 2 && days < 14) {
        measurement = `${Math.trunc(days)} days ago`
    } else if (weeks >= 2 && weeks < 52) {
        measurement = `${Math.trunc(weeks)} weeks ago`
    } else if (years >= 1) {
        measurement = `${Math.trunc(years)} years ago`
    }
    return measurement
} 