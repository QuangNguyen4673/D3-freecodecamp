const { select, range, scaleOrdinal } = window.d3
import { fruitBowl } from "./fruitBowl.js"
const svg = select("svg")
const makeFruit = (type) => ({
  type,
  id: Math.random(),
})
let fruits = range(5).map(() => makeFruit("apple"))

fruitBowl(svg, { fruits })
setTimeout(() => {
  fruits.pop()
  fruitBowl(svg, { fruits })
}, 1000)
setTimeout(() => {
  fruits[2].type = "lemon"
  fruitBowl(svg, { fruits })
}, 2000)
setTimeout(() => {
  fruits = fruits.filter((fruit, index) => index !== 1)
  fruitBowl(svg, { fruits })
}, 3000)
