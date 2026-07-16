import { chromium } from 'playwright-core'
const b = await chromium.launch({ channel: 'msedge', headless: true })
const p = await b.newPage({ viewport: { width: 1366, height: 1024 } })
const errs = []
p.on('pageerror', e => errs.push(String(e)))
p.on('console', m => { if (m.type()==='error') errs.push('con: '+m.text()) })
await p.goto('http://localhost:3003/', { waitUntil:'networkidle' })
await p.waitForTimeout(1200)
const fonts = await p.evaluate(async () => {
  await document.fonts.ready
  return { pangaia: document.fonts.check('16px "PP Pangaia"'), lipi: document.fonts.check('16px "Morii Lipi"') }
})
const rootHtml = await p.evaluate(() => document.getElementById('root').innerHTML.length)
console.log('rootHtmlLen', rootHtml, 'fonts', JSON.stringify(fonts), 'errors', errs.length ? errs.slice(0,3).join(' | ') : 'none')
await b.close()
