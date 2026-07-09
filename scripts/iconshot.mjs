// Screenshot the F7-icon toolbar + widened layers panel for visual check
import { chromium } from 'playwright-core'
const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' })
await page.evaluate(async () => {
  localStorage.clear()
  const dbs = (await indexedDB.databases?.()) || []
  await Promise.all(dbs.map((d) => new Promise((res) => { const r = indexedDB.deleteDatabase(d.name); r.onsuccess = r.onerror = () => res() })))
})
await page.reload({ waitUntil: 'domcontentloaded' })
await page.waitForTimeout(800)
const newBtn = page.getByRole('button', { name: /New artwork/i })
if (await newBtn.count()) { await newBtn.first().click(); await page.waitForTimeout(300) }
const threeBead = page.getByRole('button', { name: /3.?bead/i })
if (await threeBead.count()) { await threeBead.first().click(); await page.waitForTimeout(300) }
const createBtn = page.getByRole('button', { name: /Create artwork/i })
if (await createBtn.count()) { await createBtn.first().click(); await page.waitForTimeout(700) }
await page.locator('button[title="Layers"]').click()
await page.waitForTimeout(400)
await page.screenshot({ path: 'scripts/iconshot.png' })
console.log('errors:', errors.length ? errors.join(' | ') : 'none')
await browser.close()
