import { chromium } from 'playwright-core'
import fs from 'fs'
const b = await chromium.launch({ channel:'msedge', headless:true })
const p = await b.newPage({ viewport:{ width:1366, height:1024 }, acceptDownloads:true })
p.on('pageerror',e=>console.log('ERR',String(e)))
await p.goto('http://localhost:3003/',{waitUntil:'domcontentloaded'})
await p.evaluate(async()=>{localStorage.clear();const d=(await indexedDB.databases?.())||[];await Promise.all(d.map(x=>new Promise(r=>{const q=indexedDB.deleteDatabase(x.name);q.onsuccess=q.onerror=()=>r()})))})
await p.reload({waitUntil:'domcontentloaded'}); await p.waitForTimeout(900)
await p.getByRole('button',{name:/New artwork/i}).first().click(); await p.waitForTimeout(200)
await p.getByRole('button',{name:/3.?bead/i}).first().click(); await p.waitForTimeout(250)
// small canvas so beads are bigger in the chart
await p.locator('.unitBtn',{hasText:'cm'}).click().catch(()=>{})
await p.getByRole('button',{name:/Create artwork/i}).click(); await p.waitForTimeout(500)
// draw a few strokes
const bb=await p.locator('canvas.board').boundingBox(); const cx=bb.x+bb.width/2, cy=bb.y+bb.height/2
await p.getByTitle('Draw').click()
await p.mouse.move(cx-140,cy-60); await p.mouse.down(); await p.mouse.move(cx+140,cy-60,{steps:8}); await p.mouse.up(); await p.waitForTimeout(200)
await p.mouse.move(cx-140,cy+40); await p.mouse.down(); await p.mouse.move(cx+140,cy+40,{steps:8}); await p.mouse.up(); await p.waitForTimeout(400)
// export PNG via menu
await p.getByTitle(/Menu/i).click(); await p.waitForTimeout(200)
const dl = p.waitForEvent('download',{timeout:15000})
await p.locator('.menuItem',{hasText:'Export PNG'}).click()
const d = await dl
const path='scripts/export-out.png'
await d.saveAs(path)
console.log('saved', d.suggestedFilename(), fs.statSync(path).size,'bytes')
await b.close()
