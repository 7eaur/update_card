import { test, expect } from '@playwright/test';

for (const width of [320,360,390,768,1280]) {
  test('catalog and layout at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({width, height:width < 500 ? 740 : 900});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const missing = [];
    page.on('response', response => { if (response.status() >= 400 && new URL(response.url()).origin === 'http://127.0.0.1:4173') missing.push(response.url()); });
    await page.goto('/');
    await expect(page.getByRole('heading', {level:1})).toBeVisible();
    await page.getByRole('button', {name:'عالم البطاقات',exact:false}).click();
    await expect(page.locator('.main-card')).toHaveAttribute('aria-label','استكشف عالم البطاقات');
    await page.locator('#catalog').scrollIntoViewIfNeeded();
    await expect(page.locator('.product-card')).toHaveCount(8);
    const search = page.getByRole('searchbox', {name:'ابحث باسم الخدمة أو المنصة'});
    await search.fill('ببجي');
    await expect(page.locator('.product-card')).toHaveCount(2);
    await page.locator('.product-open').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.locator('.product-open').first()).toBeFocused();
    await search.fill('لايوجدمطابقةهنا');
    await expect(page.getByRole('heading', {name:'عالمك مش ظاهر هنا؟'})).toBeVisible();
    await page.getByRole('button', {name:'عرض كل الخدمات',exact:true}).click();
    await expect(page.locator('.product-card')).toHaveCount(8);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({path:'test-results/storefront-' + width + '.png',fullPage:true});
    expect(errors).toEqual([]);
    expect(missing).toEqual([]);
  });
}
test('direct link, custom details and WhatsApp handoff', async ({page}) => {
  await page.goto('/#service/gift-cards/playstation');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByLabel('منطقة الحساب أو الدولة', {exact:false}).fill('السعودية');
  await page.getByLabel('تفاصيل طلبك', {exact:false}).fill('بطاقة 100 & 200');
  await page.getByRole('radio', {name:'جملة / توزيع'}).check();
  await page.route('https://wa.me/**', route => route.fulfill({status:200,contentType:'text/html',body:'<p>WhatsApp handoff intercepted in test</p>'}));
  await page.getByRole('button', {name:'جهّز الطلب على واتساب',exact:false}).click();
  await page.waitForURL('https://wa.me/**');
  const text = new URL(page.url()).searchParams.get('text');
  expect(text).toContain('السعودية');
  expect(text).toContain('بطاقة 100 & 200');
  expect(text).toContain('جملة / توزيع');
});
test('browser back and forward restore product details', async ({page}) => {
  await page.goto('/#catalog');
  await page.locator('.product-open').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.goBack();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.goForward();
  await expect(page.getByRole('dialog')).toBeVisible();
});
test('touch layout, reduced motion and short landscape', async ({browser}) => {
  const context = await browser.newContext({viewport:{width:390,height:680},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  expect(await page.locator('.card-scene').evaluate(node => getComputedStyle(node).animationName)).toBe('none');
  await page.getByRole('button',{name:'فتح القائمة'}).tap();
  await page.getByRole('link',{name:'كيف تطلب؟',exact:true}).tap();
  await expect(page.locator('#primary-navigation')).not.toHaveClass(/open/);
  await page.setViewportSize({width:740,height:360});
  await page.goto('http://127.0.0.1:4173/#service/games/pubg-mobile');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button',{name:'جهّز الطلب على واتساب',exact:false}).scrollIntoViewIfNeeded();
  await expect(page.getByRole('button',{name:'جهّز الطلب على واتساب',exact:false})).toBeVisible();
  await context.close();
});
test('no JavaScript still offers catalog and contact', async ({browser}) => {
  const context = await browser.newContext({javaScriptEnabled:false});
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.getByRole('heading',{name:'أبديت كارد',exact:true})).toBeVisible();
  await expect(page.getByRole('link',{name:'تصفح كتالوج الخدمات'})).toHaveAttribute('href','https://updatecard.net/services/');
  await context.close();
});
