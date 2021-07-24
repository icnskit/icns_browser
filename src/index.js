import { Icns } from '@fiahfy/icns'

const Buffer = require('buffer/').Buffer

export const createImage = (buffer)=> {
  const b64 = buffer.toString("base64")
  return `data:image/png;base64, ${ b64 }`
}

export const read = (buf) => {
  const icns = Icns.from(buf)
  return icns.images.map(item=> {
    return {
      type: item.osType,
      image: createImage(item.image)
    }
  })
}

export const setBodyBackground = ()=> {
  document.body.style.background = `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAD1BMVEXl5eXp6enu7u7g4ODm5uY5xL5yAAAAcElEQVR42u3TQQrAIBAEwTX6/zcHXfKCMBcpYaFvc5CqGs95NYI1V+dcuaq91Jer2kt9qToj326seqR3c3XPn9zjhHjiiSeeeOKJJ5544oknnnjiiSeeeOKJJ5544oknnnjiiSeeeOKJJ5544on/Uy94A04hgY0X2QAAAABJRU5ErkJggg==)`
}

setBodyBackground()

async function readFile(file) {
  const arrayBuffer = await new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsArrayBuffer(file);
  });
  return arrayBuffer;
}

const select = document.getElementById('select')

const imgBox = document.getElementById('img_box')

const showPreview = (flag)=> {
  select.style.display = flag ? `block` : `none`
  imgBox.style.display = flag ? `block` : `none`
}

showPreview(false)

document.getElementById('input').addEventListener('change', async event => {
  const fileList = event.target.files;
  if (fileList.length <= 0) return
  const file = fileList[0]
  const arrayBuffer = await readFile(file)
  const buffer = Buffer.from(arrayBuffer)
  const images = read(buffer)
  let html = ``
  images.map(item=> {
    html += `
      <option value="${ item.image }">${ item.type }</option>
    `
  })
  showPreview(true)
  renderImage(images[0].image)
  select.innerHTML = html
})

const renderImage = (img)=> {
  const e = document.getElementById('img')
  e.setAttribute("src", img)
}

select.addEventListener('change', function (event) {
  try {
    const value = this.value
    renderImage(value)
  } catch (error) {
    console.error(error)
  }
})