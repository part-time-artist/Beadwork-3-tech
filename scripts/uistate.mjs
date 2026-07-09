// Debug: screenshot the fresh-start state + dump clickable texts
import { chromium } from 'playwright-core'
const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' })
await page.evaluate(async () => {
  localStorage.clear()
  const dbs = (await indexedDB.databases?.()) || []
  await Promise.all(dbs.map((d) => new Promise((res) => { const r = indexedDB.deleteDatabase(d.name); r.onsuccess = r.onerror = () => res() })))
})
await page.reload({ waitUntil: 'domcontentloaded' })
await page.waitForTimeout(1000)
await page.screenshot({ path: 'scripts/uistate-1.png' })
const btns = await page.evaluate(() => [...document.querySelectorAll('button')].map((b) => b.textContent.trim().slice(0, 40)).filter(Boolean))
console.log('buttons:', JSON.stringify(btns))
const newBtn = page.getByRole('button', { name: /New artwork/i })
if (await newBtn.count()) { await newBtn.first().click(); await page.waitForTimeout(300) }
const threeBead = page.getByRole('button', { name: /3.?bead/i })
if (await threeBead.count()) { await threeBead.first().click(); await page.waitForTimeout(600) }
await page.screenshot({ path: 'scripts/uistate-2.png' })
const btns2 = await page.evaluate(() => [...document.querySelectorAll('button')].map((b) => b.textContent.trim().slice(0, 40)).filter(Boolean))
console.log('buttons2:', JSON.stringify(btns2))
console.log('cards:', await page.evaluate(() => [...document.querySelectorAll('.card')].map((c) => c.textContent.trim().slice(0, 30))))
console.log('zval:', await page.locator('.zval').innerText().catch(() => 'none'))
console.log('boards:', await page.evaluate(() => [...document.querySelectorAll('canvas')].map((c) => `${c.className} ${c.width}x${c.height} z=${getComputedStyle(c).zIndex} pe=${getComputedStyle(c).pointerEvents}`)))
await browser.close()
