import { Task, TaskType } from "./translate"


type TaskDictionary = {
  [key in TaskType]: {
    status: keyof Task,
    effort: number
  }
}

export const taskDictionary: TaskDictionary = {
  d: { status: "dev", effort: 0.5 },
  D: { status: "dev", effort: 1 },
  q: { status: "qa", effort: 0.5 },
  Q: { status: "qa", effort: 1 }
}
