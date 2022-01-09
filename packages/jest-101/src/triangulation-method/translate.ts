import { taskDictionary } from "./dictionary"


// step 1. for mark d
// export const translate = (token: string) => ({ dev: 0.5 })

// step 2. for mark D
// export const translate = (token: string) => ({ dev: token === "d" ? 0.5 : 1 })

// step 3. for mark dD
// export const translate = (token: string) => {
//   let dev = 0
//   token.split("").forEach(char => {
//     dev += char === "d" ? 0.5 : 1
//   })
//   return { dev }
// }

// step 4
export type TaskType = "d" | "D" | "q" | "Q"
export type Task = {
  dev: number
  qa: number
}

const parse = (char: TaskType) => taskDictionary[char]

export const translate = (token: string) => {
  const result: Task = {
    dev: 0,
    qa: 0
  }
  token.split("").forEach(char => {
    const { status, effort } = parse(char as TaskType)
    result[status] += effort
  })
  return result
}
