// Screenshot the layers panel with a group (visual check)
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
await page.waitForTimeout(800)
for (const [name, wait] of [[/New artwork/i, 300], [/3.?bead/i, 300], [/Create artwork/i, 700]]) {
  const b = page.getByRole('button', { name })
  if (await b.count()) { await b.first().click(); await page.waitForTimeout(wait) }
}
await page.locator('button[title="Layers"]').click()
await page.waitForTimeout(300)
await page.locator('button[title="New layer"]').click()
await page.waitForTimeout(200)
await page.getByRole('button', { name: 'Group', exact: true }).click()
await page.waitForTimeout(400)
await page.screenshot({ path: 'scripts/groupshot.png', clip: { x: 940, y: 60, width: 500, height: 560 } })
await browser.close()
