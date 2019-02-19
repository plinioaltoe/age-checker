const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const appMiddleware = (req, res, next) => {
  console.log(req.query)
  const { age } = req.query
  if (!age) return res.redirect('/')
  return next()
}

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('age')
})

app.get('/major/', appMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor/', appMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

const isMajor = age => {
  const MAIOR_DE_IDADE_NO_BRASIL = 18
  return age >= MAIOR_DE_IDADE_NO_BRASIL
}
app.post('/check', (req, res) => {
  const { age } = req.body
  let route = ''
  route = isMajor(age) ? `/major/?age=${age}` : `/minor/?age=${age}`
  return res.redirect(route)
})

app.listen(3100)
