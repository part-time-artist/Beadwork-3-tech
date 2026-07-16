import { chromium } from 'playwright-core'
const b = await chromium.launch({ channel:'msedge', headless:true })
const p = await b.newPage({ viewport:{ width:1366, height:1024 }, acceptDownloads:true })
const errs=[]; p.on('pageerror',e=>errs.push(String(e)))
p.on('console',m=>{ if(m.type()==='error'&&!/favicon/.test(m.text())) errs.push('con: '+m.text()) })
const png='iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAFklEQVR4nGP8z8Dwn4EIwDiqEL8CAJxcA/0H6tF1AAAAAElFTkSuQmCC'
let fcFired=false
p.on('filechooser', async fc => { fcFired=true; try{ await fc.setFiles({name:'r.png',mimeType:'image/png',buffer:Buffer.from(png,'base64')}) }catch(e){} })
await p.goto('http://localhost:3003/',{waitUntil:'domcontentloaded'})
await p.evaluate(async()=>{localStorage.clear();const d=(await indexedDB.databases?.())||[];await Promise.all(d.map(x=>new Promise(r=>{const q=indexedDB.deleteDatabase(x.name);q.onsuccess=q.onerror=()=>r()})))})
await p.reload({waitUntil:'domcontentloaded'}); await p.waitForTimeout(900)
await p.getByRole('button',{name:/New artwork/i}).first().click(); await p.waitForTimeout(200)
await p.getByRole('button',{name:/3.?bead/i}).first().click(); await p.waitForTimeout(250)
await p.getByRole('button',{name:/Create artwork/i}).click(); await p.waitForTimeout(500)
// long-press a bead layer row (Layer 1 = index 1 in the reversed list top area)
await p.getByTitle('Layers').click(); await p.waitForTimeout(200)
const row = await p.locator('.lpRow').first().boundingBox() // top row = a bead layer
await p.mouse.move(row.x+140, row.y+row.height/2); await p.mouse.down()
await p.waitForTimeout(650) // hold to arm (>450ms)
await p.mouse.up(); await p.waitForTimeout(500)
const names = await p.locator('.lpRow .lpName').allInnerTexts()
// export file flow: go to gallery
await p.getByTitle(/My artworks/i).click(); await p.waitForTimeout(400)
await p.getByRole('button',{name:/Export file/i}).click(); await p.waitForTimeout(200)
const pickRows = await p.locator('.pickRow').count()
await p.getByRole('button',{name:/Select all/i}).click(); await p.waitForTimeout(150)
const dl = p.waitForEvent('download', {timeout:5000}).catch(()=>null)
await p.locator('.modal .primary.half').click()
const d = await dl
console.log('longPress_fileChooserFired', fcFired)
console.log('layerNames', JSON.stringify(names))
console.log('pickRows', pickRows, 'download', d? d.suggestedFilename() : '(none)')
console.log('errors', errs.length?errs.slice(0,4).join(' | '):'none')
await b.close()
