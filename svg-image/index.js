const { select, range, scaleOrdinal } = window.d3
import { fruitBowl } from "./fruitBowl.js"
const svg = select("svg")
const makeFruit = (type) => ({
  type,
  id: Math.random(),
})
let fruits = range(5).map(() => makeFruit("apple"))

let selectedFruit = null

const onClick = (id) => {
  selectedFruit = id
  render()
}

const render = () => {
  fruitBowl(svg, { fruits, onClick, selectedFruit })
}

setTimeout(() => {
  fruits.pop()
  render()
}, 1000)
setTimeout(() => {
  fruits[2].type = "lemon"
  render()
}, 2000)
setTimeout(() => {
  fruits = fruits.filter((fruit, index) => index !== 1)
  render()
}, 3000)
