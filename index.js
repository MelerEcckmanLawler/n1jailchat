const data = require('./phrases.json')
const colors = require('colors')
/*
Jester & Serial Killer are considered distinct from Neutral
*/
TOTAL = 0
for (let k in data) {
  TOTAL += data[k].Town + data[k].Mafia + data[k].Neutral + data[k].Jester + data[k].SerialKiller
}
console.log(TOTAL)


let phrases = []
for (let phrase in data) {
  let entry = data[phrase]
  let Town = entry.Town
  let Mafia = entry.Mafia 
  let Neutral = entry.Neutral
  let Jester = entry.Jester
  let SerialKiller = entry.SerialKiller
  let Total = Town + Mafia + Neutral + Jester + SerialKiller
  if (Total < 100 || phrase == '') { continue }
  let percTown = parseFloat(((Town / Total) * 100).toFixed(0))
  let percMafia = parseFloat(((Mafia / Total) * 100).toFixed(0))
  let percNeutral = parseFloat(((Neutral / Total) * 100).toFixed(0))
  let percJester = parseFloat(((Jester / Total) * 100).toFixed(0))
  let percSerialKiller = parseFloat(((SerialKiller / Total) * 100).toFixed(0))
  let obj = {
    phrase: phrase,
    Total: Total,
    Town: Town,
    Mafia: Mafia,
    Neutral: Neutral,
    Jester: Jester,
    SerialKiller: SerialKiller,
    NotTown: Mafia + Neutral + Jester + SerialKiller,
    percTown: percTown,
    percMafia: percMafia,
    percNeutral: percNeutral,
    percSerialKiller: percSerialKiller,
    percJester: percJester,
    percNotTown: percMafia + percNeutral + percJester + percSerialKiller
  }
  phrases.push(obj)
}

function print(obj) {
  console.log(`${obj.phrase}`.yellow, `${obj.percTown}`.cyan, `${obj.percNotTown}`.magenta)
  console.log(`(${obj.Total})`.white, `${obj.percTown}`.green, `${obj.percMafia}`.red, `${obj.percNeutral}`.white, `${obj.percJester}`.magenta, `${obj.percSerialKiller}`.blue)
}

function maxes(prop) {
  return phrases.sort((a, b) => (a[prop] < b[prop]) ? 1 : -1)
}

let arr = maxes('percNotTown') // sorted by likelihood of coming from Town
for (let i = 0; i < arr.length; i++) {
  print(arr[i])
}