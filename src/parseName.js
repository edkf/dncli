module.exports = (string) => {
  return string.replace('from ', '').split(',')[0]
}