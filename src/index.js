import './remark-latest.min.js'
import './main.css'
import charla from './charla.md'

// import all images
const importImages = (r) => r.keys().map(r)
importImages(require.context('./images', false, /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)/))
// parse presentation from markdown file and inject it to html
const textarea = document.createElement('textarea')
textarea.id = 'source'
textarea.innerHTML = charla
document.body.appendChild(textarea)
remark.highlighter.engine
remark.create({
  highlightStyle: 'monokai',
  highlightLanguage: 'remark',
  highlightLines: true,
  ratio: '16:9'
})
