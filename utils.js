/**
 * Получить псевдо рандомное число от 0 до max.
 * max в результат не входит
 * @param max 
 * @returns 
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = {
  getRandomInt
}