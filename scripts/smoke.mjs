// Browser smoke test: drives the production build in headless Edge,
// captures console errors and section screenshots.  Run: node scripts/smoke.mjs
import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const URL = process.env.URL || 'http://localhost:4173/'
const OUT = 'test-shots'
mkdirSync(OUT, { recursive: true })

const errors = []
const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--no-sandbox', '--window-size=1366,900'],
  defaultViewport: { width: 1366, height: 900 },
})
const page = await browser.newPage()
page.on('console', m => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message))

await page.goto(URL, { waitUntil: 'networkidle2' })

// skip boot sequence
await page.keyboard.press('Escape')
await page.waitForSelector('#home h1', { visible: true, timeout: 10000 })
await new Promise(r => setTimeout(r, 1600))
await page.screenshot({ path: `${OUT}/01-hero.png` })

for (const id of ['about', 'skills', 'projects', 'experience', 'architecture', 'github', 'contact']) {
  await page.evaluate(i => document.getElementById(i)?.scrollIntoView(), id)
  await new Promise(r => setTimeout(r, 1400))
  await page.screenshot({ path: `${OUT}/${id}.png` })
}

// command palette
await page.keyboard.down('Control'); await page.keyboard.press('k'); await page.keyboard.up('Control')
await new Promise(r => setTimeout(r, 600))
await page.screenshot({ path: `${OUT}/palette.png` })
const paletteOpen = await page.$('input[aria-label="Search commands"]') !== null
await page.keyboard.press('Escape')

// expand a project card
await page.evaluate(() => document.getElementById('projects')?.scrollIntoView())
await new Promise(r => setTimeout(r, 1200))
const expandBtn = await page.$('#projects button[aria-expanded]')
if (expandBtn) { await expandBtn.click(); await new Promise(r => setTimeout(r, 700)) }
await page.screenshot({ path: `${OUT}/project-expanded.png` })

console.log('palette opened:', paletteOpen)
console.log('console errors:', errors.length ? errors : 'none')
await browser.close()
process.exit(errors.filter(e => !e.includes('api.github.com') && !e.includes('jogruber')).length ? 1 : 0)
