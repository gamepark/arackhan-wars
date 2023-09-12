import { MaterialGame, MaterialMove } from '@gamepark/rules-api'

const worker = new Worker(new URL('./TutorialAI.worker.ts', import.meta.url))

export async function tutorialAI(game: MaterialGame, bot: number): Promise<MaterialMove[]> {
  const promise = new Promise<MaterialMove[]>((resolve, reject) => {
    worker.onmessage = (e: MessageEvent<string>) => {
      resolve(JSON.parse(e.data))
    }
    worker.onerror = (e: ErrorEvent) => {
      reject(e)
    }
  })
  worker.postMessage(JSON.stringify([game, bot]))
  return promise
}