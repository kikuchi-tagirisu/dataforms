/**
 * メニューフォーム.
 */



/**
 * メニューフォーム.
 */

createSubclass("SiteMapForm", {}, "MenuForm");
/**
 * ページの各エレメントとの対応付け.
 */
SiteMapForm.prototype.attach = function() {
	Form.prototype.attach.call(this);
	this.menu = this.newInstance(this.menu);
	this.menu.init();
	this.menu.attach();
// 【for Bulma】メニューグループを2つずつ括る start
	var menu = this.find("#menu");
	var remainCnt = menu.children("div[class='column']").length;
	while (remainCnt > 0) {
		menu.children("div[class='column']:lt(2)").wrapAll('<div class="columns">');
		remainCnt = menu.children("div[class='column']").length;
		// グループが1つの場合は、ダミーを追加.
		if (remainCnt == 1) {
			menu.append("<div class='column'></div>");
		}
	}
// 【for Bulma】メニューグループを2つずつ括る end
};
