module.exports = (string) => {
  if (string === undefined) {
    return ''
  } else {
    return string.replace('/badges/', '')
  }
}