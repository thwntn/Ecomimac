const DIRNAME = "/asset/sound/"

export enum SoundNames {
  Success = "Livechat.mp3",
  Tap = "Tap.mp3",
}

export const useSound = (): ((sound: SoundNames) => void) => {
  const media = (sound: SoundNames) => new Audio(DIRNAME + sound).play()
  return media
}
