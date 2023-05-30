import { test, expect, Page, BrowserContext } from "@playwright/test"
import { chromium } from "playwright"
require('dotenv').config()

// Long timeout in case we've just deployed
test.beforeAll(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await goHome(page)
  await waitForSignup(page)
  await page.close()
  await browser.close()
})

test.beforeEach(async ({ page }) => {
  page.on('dialog', (dialog) => dialog.accept())
})

async function goToMySwinks(page: Page) {
  await goHome(page)
  await page.click('text="My Swinks"')
  await page.waitForResponse(/firestore\/listen/i)
}

async function deleteMostRecentQrCode(page: Page) {
  await goToMySwinks(page)
  await page.click(':text("Delete"):right-of(:text("Duplicate"))')
  await page.waitForResponse(res => res.request().method() === "DELETE")
}

async function waitForSignup(page: Page) {
  await page.waitForResponse((res) => {
    const correctUrl = res.url().match(/^.*signupNewUser.*$/)?.length != 0
    const correctMethod = res.request().method() === "POST"
    return correctUrl && correctMethod && res.ok()
  })
  await waitForToken(page)
}

async function waitForToken(page: Page) {
  return page.waitForResponse(/^.*securetoken\.googleapis.*$/)
}

async function expectSwinkToBeCreated(page: Page) {
  const creationResponse = await page.waitForResponse((res) =>
    res.request().method() === "POST" && !!res.url().match(/swink(\/$|$)/)
  )
  expect(creationResponse.ok()).toBe(true)
  const json = await creationResponse.json()
  const qrId = (json as unknown as any).swinkId as string
  return qrId
}

function baseUrl(): string {
  return process.env.SITE_PATH!
}

async function goHome(page: Page, timeout?: number) {
  const options = {
    waitUntil: 'domcontentloaded' as 'domcontentloaded'
  } as { [k: string]: any }
  if (timeout) {
    options.timeout = timeout
  }
  await page.goto(baseUrl(), options)
}

async function goToCreate(page: Page, timeout?: number) {
  await goHome(page, timeout)
  await wait(page)
  await page.click('text="Make a swink"')
}

async function expectGotQrImage(page: Page) {
  const response = await page.waitForResponse(/swink\/\w{10,11}\/qr/)
  expect(response.ok()).toBe(true)
}

async function expectQrToBeUpdated(page: Page) {
  await page.waitForResponse(/firestore\/write/i)
}

async function clickEverythingSwink(page: Page) {
  await page.click('text="Data Swink"')
}

async function makeEverythingSwink(page: Page) {
  await goToCreate(page)
  await waitForToken(page)
  await clickEverythingSwink(page)
}

async function makeLinkSwink(page: Page, address: string = "www.google.com") {
  await goToCreate(page)
  await waitForToken(page)
  await page.fill("#linkUrl", address)
}

async function openQr(page: Page, context: BrowserContext): Promise<Page> {
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('#qrImage')
  ])
  await newPage.waitForLoadState('domcontentloaded')
  return newPage
}

async function verifyLinkQr(page: Page, context: BrowserContext, url: string) {
  const newPage = await openQr(page, context)
  const isCorrectPage = newPage.url().indexOf(url) >= 0
  expect(isCorrectPage).toBeTruthy()
  return newPage
}

async function verifyEverythingQr(page: Page, context: BrowserContext, id: string) {
  const newPage = await openQr(page, context)
  const isCorrectPage = newPage.url().indexOf(id) >= 0
  expect(isCorrectPage).toBeTruthy()
  return newPage
}

async function updatedViaSearchTerm(page: Page) {
  const response = await page.waitForResponse(r => !!r.url().match(/searchTerm/) && r.status() === 200)
  expect(response.ok()).toBe(true)
}

async function clickSwinkLink(page: Page, context: BrowserContext) {
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('text="/sw\\.ink.*":below("My Swinks")')
  ])
  await newPage.waitForLoadState('domcontentloaded')
  return newPage
}

async function createApp(page: Page, context: BrowserContext) {
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('"Create App"')
  ])

  // Wait for shared secret
  while (true) {
    const sharedSecret = await newPage.inputValue("#sharedSecret")
    if (sharedSecret) {
      break
    }
    await wait(newPage)
  }
  return { newPage, appId: newPage.url().substring(newPage.url().lastIndexOf("/")) }
}

/**
 * 
 * @param apps Display name of apps to be added
 */
async function makeSwinkWithAppsAndOpen(page: Page, context: BrowserContext, apps: string[] = ["Direct Message"]): Promise<Page> {
  await makeEverythingSwink(page)
  const swinkId = await expectSwinkToBeCreated(page)
  for (let appName of apps) {
    await page.click(`text=${appName} Add to Swink >> button`)
    await page.waitForResponse(resp => resp.status() === 200 && resp.url().includes(`swink/${swinkId}/apps/`))
  }
  const newPage = await openQr(page, context)
  const selector = await newPage.waitForSelector(`"${apps[0]}"`)
  expect(selector).toBeTruthy()
  await waitForAuth(newPage)
  return newPage
}

async function waitForAuth(p: Page) {
  const response = await p.waitForResponse(/getAccountInfo/)
  expect(response.status()).toEqual(200)
}

async function wait(page: Page) {
  return page.evaluate(() => {
    return new Promise((resolve) => setTimeout(resolve, 1000))
  })
}

async function removeAppFromSwink(page: Page, app: string = "Direct Message") {
  await page.click(`.removeAppButton:right-of(:text("${app}"))`)
  await page.waitForResponse(res =>
    res.url().includes("swink")
    && res.url().includes("apps")
    && res.ok()
  )
}

async function makeEverythingSwinkAndAddApp(page: Page, appId: string, appName: string) {
  await makeEverythingSwink(page)
  const swinkId = await expectSwinkToBeCreated(page)
  await page.fill('[placeholder="Add by id..."]', appId)
  await page.press('[placeholder="Add by id..."]', "Enter")
  await page.waitForSelector(`"${appName}"`)
  return swinkId
}

test('Editting url makes new swink', async ({ page }) => {
  test.skip()
  await makeLinkSwink(page)
  await expectSwinkToBeCreated(page)
  await deleteMostRecentQrCode(page)
})

test('Clicking "Everything Swink" makes new Swink"', async ({ page }) => {
  test.skip()
  await makeEverythingSwink(page)
  await expectSwinkToBeCreated(page)
  await deleteMostRecentQrCode(page)
})

test('Creating new Swink updates image', async ({ page }) => {
  test.skip()
  await makeEverythingSwink(page)
  await Promise.all([expectSwinkToBeCreated(page), expectGotQrImage(page)])
  await deleteMostRecentQrCode(page)
})

test('Clicking QR image opens new tab to Swink', async ({ page, context }) => {
  test.skip()
  await makeEverythingSwink(page)
  const qrId = await expectSwinkToBeCreated(page)
  await wait(page)
  const newPage = await openQr(page, context)
  expect(newPage.url()).toBe(`${baseUrl()}/${qrId}`)
  await newPage.close()
  await deleteMostRecentQrCode(page)
})

test('Clicking QR image for link swink goes to link', async ({ page, context }) => {
  test.skip()
  const url = "https://robko.ch"
  await makeLinkSwink(page, url)
  await expectSwinkToBeCreated(page)
  await updatedViaSearchTerm(page)
  await page.waitForSelector(`.displayUrl :text('${url}/')`)
  await wait(page)
  const newPage = await verifyLinkQr(page, context, url)
  await newPage.close()
  await deleteMostRecentQrCode(page)
})

test('Adding app adds app', async ({ page, context }) => {
  test.skip()
  const newPage = await makeSwinkWithAppsAndOpen(page, context)
  await newPage.close()
  await deleteMostRecentQrCode(page)
})

test('Removing app removes app', async ({ page, context }) => {
  test.skip()
  const newPage = await makeSwinkWithAppsAndOpen(page, context)
  await removeAppFromSwink(page)
  await newPage.reload()
  expect(await newPage.waitForSelector('"Direct Message"', { state: "detached" })).toBeNull()
})

test('QR code created, url changed', async ({ page }) => {
  test.skip()
  await makeEverythingSwink(page)
  const qrId = await expectSwinkToBeCreated(page)
  expect(page.url()).toContain(qrId)
  await deleteMostRecentQrCode(page)
})

test('Duplicating QR code duplicates', async ({ page }) => {
  test.skip()
  const linkAddress = "www.example.com"
  await makeLinkSwink(page, linkAddress)
  const qrId = await expectSwinkToBeCreated(page)
  await updatedViaSearchTerm(page)
  await goToMySwinks(page)
  await page.click(`"Duplicate"`)
  // We're going to wait for the duplicated link
  await page.waitForResponse(/fromQrId/)
  await page.waitForNavigation()
  await goToMySwinks(page)
  await page.click('"Delete all Swinks"')
  await page.waitForSelector('"You don\'t have any swinks."')
})

test('Changing swink type changes type', async ({ page, context }) => {
  test.skip()
  const url = "www.example.com"
  await makeLinkSwink(page, url)
  const id = await expectSwinkToBeCreated(page)
  await updatedViaSearchTerm(page)
  await wait(page)
  let newPage = await verifyLinkQr(page, context, url)
  await newPage.close()
  await clickEverythingSwink(page)
  await expectQrToBeUpdated(page)
  await wait(page)
  newPage = await verifyEverythingQr(page, context, id)
  await newPage.close()
  await deleteMostRecentQrCode(page)
})

test("Create app creates app", async ({ page, context }) => {
  test.skip()
  await makeEverythingSwink(page)
  await expectSwinkToBeCreated(page)
  const { newPage } = await createApp(page, context)
  await newPage.close()
  await page.goto(baseUrl() + "/apps")
  await page.waitForSelector('"My app"')
  await page.click('"Delete"')
  await deleteMostRecentQrCode(page)
})

test("Apps load", async ({ page, context }) => {
  test.skip()
  const apps = ["Chat", "Direct Message"]
  const newPage = await makeSwinkWithAppsAndOpen(page, context, apps)
  await newPage.waitForResponse(res => !!res.url().match(/JTwMyq4S4F2E9b54UIFC/) && res.ok())
  await newPage.waitForResponse(res => !!res.url().match(/Yx4wfILE71ru6nyGV3ia/) && res.ok())
  await newPage.close()
  await deleteMostRecentQrCode(page)
})

test("Our apps log in", async ({ page, context }) => {
  test.skip()
  const apps = ["Chat", "Direct Message"]
  const newPage = await makeSwinkWithAppsAndOpen(page, context, apps)
  await wait(page)
  for (let app of apps) {
    const response = await newPage.waitForResponse(/webapp\/\w+\/login/)
    expect(response.status()).toEqual(200)
  }
  await deleteMostRecentQrCode(page)
})

test("Can preview app", async ({ page, context }) => {
  test.skip()
  await makeEverythingSwink(page)
  const { newPage } = await createApp(page, context)
  newPage.waitForSelector('"Preview"')
  await newPage.waitForSelector("iframe")
  await newPage.close()
  await page.goto(baseUrl() + "/apps")
  await page.waitForSelector('"My app"')
  await page.click('"Delete"')
  await deleteMostRecentQrCode(page)
})

test("Template app works", async ({ page, context }) => {
  test.skip()
  const templateAppId = 'O19RFFoc4UDONXEAKtnT'
  await makeEverythingSwinkAndAddApp(page, templateAppId, "Test App")
  const newPage = await openQr(page, context)

  await newPage.waitForResponse(res => res.url().includes(templateAppId) && res.ok())
  await wait(newPage)
  await newPage.waitForSelector('#appFrame')
  const iframe = newPage.frame({ url: /O19RFFoc4UDONXEAKtnT/ })
  expect(iframe).toBeTruthy()

  // "We're in a swink" message
  await iframe?.waitForSelector('.text-blue-600')
  await deleteMostRecentQrCode(page)
})

test("App kin works", async ({ page, context }) => {
  // Add app kin app to two swinks and make sure they show up
  test.skip()
  const kinAppId = 'DwbHKgdbwqsj9kXYMqB0'
  const firstSwinkId = await makeEverythingSwinkAndAddApp(page, kinAppId, "Kin test app")
  const secondSwinkId = await makeEverythingSwinkAndAddApp(page, kinAppId, "Kin test app")

  const newPage = await openQr(page, context)
  await newPage.waitForResponse(res => res.url().includes(kinAppId) && res.ok())
  await wait(newPage)
  await newPage.waitForSelector('#appFrame')
  const iframe = newPage.frame({ url: /DwbHKgdbwqsj9kXYMqB0/ })
  expect(iframe).toBeTruthy()

  // "We're in a swink" message
  await Promise.all([
    iframe?.waitForSelector('.text-blue-600'), 
    iframe?.waitForSelector('"Kin"'),
    iframe?.waitForSelector(`"${firstSwinkId}"`)])
  await deleteMostRecentQrCode(page)
  await deleteMostRecentQrCode(page)
})