const { default: fetch } = require('node-fetch')

/**
 * Получить псевдо рандомное число от 0 до max.
 * max в результат не входит
 * @param max
 * @returns
 */
export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

export const getImgFromFetch = async (url) => {
  const data = await fetch(url)
  return data.url
}
