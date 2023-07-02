export default function playSound(isPlayerTurn) {
  let src = isPlayerTurn ? 
      'https://res.cloudinary.com/dyuo7wfyi/video/upload/v1687216259/cadaver-exquisito/bones-2_f0ekrj.wav' :
      'https://res.cloudinary.com/dyuo7wfyi/video/upload/v1687216260/cadaver-exquisito/skeleton-bones_eyilf4.wav'

  let soundEffect = document.createElement('audio')
  soundEffect.src = src
  soundEffect.volume = 0.5

  soundEffect.play()
}
