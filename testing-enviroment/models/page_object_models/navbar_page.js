export class NavbarPage {
  constructor(page) {
    const italianoFlagLink = ' Lingua Italiano flag';
    const ingleseFlagLink = 'flag Inglese';

    this.page = page;

    this.userIcon = page.locator('#kt_header_user_menu_toggle');
    this.languageMenu = page.locator('.menu-item:has(a.link_lang) > a.menu-link').first();
    this.englishLanguageSelection = page.locator('a.link_lang[href$="/language/en"]');
    this.italianLanguageSelection = page.locator('a.link_lang[href$="/language/it"]');
    this.logoutSelection = page.getByRole('link', { name: ' Logout' });
  }

  async waitForUserMenu() {
    await this.userIcon.waitFor({ state: 'visible', timeout: 20000 });
  }

  async clickUserIcon() {
    await this.userIcon.waitFor({ state: 'visible', timeout: 15000 });
    await this.userIcon.click();
  }

  async openLanguageMenu() {
    if (await this.italianLanguageSelection.isVisible()) {
      return;
    }
    if (!(await this.languageMenu.isVisible())) {
      await this.userIcon.waitFor({ state: 'visible', timeout: 15000 });
      await this.userIcon.click();
    }
    await this.languageMenu.hover();
  }

  async isItalianActive() {
    const cls = await this.italianLanguageSelection.getAttribute('class');
    return (cls || '').includes('active');
  }

  async selectItalianLanguage() {
    await this.openLanguageMenu();
    await this.italianLanguageSelection.click();
  }

  async selectEnglishLanguage() {
    await this.openLanguageMenu();
    await this.englishLanguageSelection.click();
  }

  async isEnglishLanguageSelected() {
    return await this.englishLanguageSelection.isVisible();
  }

  async clickLogout() {
    await this.logoutSelection.click();
  }
}