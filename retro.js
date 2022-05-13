const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d')
const d = canvas.getContext('2d')
const e = canvas.getContext('2d')
const f = canvas.getContext('2d')

canvas.width = innerWidth * 0.36
canvas.height = innerHeight * 0.9


c.fillRect(canvas.width / 20, canvas.height / 20, canvas.width * 0.9, canvas.height * 0.52)
c.fillRect(canvas.width / 8, canvas.height * 0.63, canvas.width * 0.22, canvas.height * 0.297)
c.fillRect(canvas.width / 20, canvas.height * 0.69, canvas.width * 0.365, canvas.height * 0.18)

d.fillStyle = '#656d78'
d.fillRect(canvas.width / 8, canvas.height * 0.75, canvas.width * 0.22, canvas.height * 0.05)
d.fillRect(canvas.width / 5.1, canvas.height * 0.69, canvas.width * 0.08, canvas.height * 0.18)

e.beginPath()
e.arc(canvas.width * 0.65, canvas.height * 0.85, 65, 0, Math.PI *2)
e.fillStyle = 'black'
e.fill()
e.closePath()

e.beginPath()
e.arc(canvas.width * 0.85, canvas.height * 0.71, 65, 0, Math.PI *2)
e.fillStyle = 'black'
e.fill()
e.closePath()

f.beginPath()
f.arc(canvas.width * 0.65, canvas.height * 0.85, 30, 0, Math.PI *2)
f.fillStyle = '#ed5564'
f.fill()
f.closePath()

f.beginPath()
f.arc(canvas.width * 0.85, canvas.height * 0.71, 30, 0, Math.PI *2)
f.fillStyle = '#ed5564'
f.fill()
f.closePath()