/**
 * @fileOverview {@link ImageField}クラスを記述したファイルです。
 */

/**
 * @class ImageField
 * 画像ファイルアップロードフィールドクラス。
 * @extends FileField
 */
ImageField = createSubclass("ImageField", {}, "FileField");


/**
 * HTMLエレメントとの対応付けを行います。
 * <pre>
 * 削除チェックボックス、ダウンロードリンクなどの設定を行います。
 * </pre>
 */
ImageField.prototype.attach = function() {
	FileField.prototype.attach.call(this);
	var thisField = this;
	var linkid = this.id + "_link";
	var link = this.parent.find("#" + this.selectorEscape(linkid));
	var thumbid = this.id + "_thm"; // サムネイルID.
	var thumb = this.parent.find("#" + this.selectorEscape(thumbid));
	thumb.click(function(e) {
//		var url = thumb.attr("src");
//		url = url.replace(/\.downloadThumbnail/, ".downloadFullImage");
		var val = {};
		val.fileName = link.attr("data-value");
		val.size = link.attr("data-size");
		val.downloadParam = link.attr("data-dlparam");
		thisField.showImage(val);
	});

};

/**
 * 指定されたURLの画像を表示します。
 * @param img イメージ。
 */
ImageField.prototype.showImage = function(img) {
	logger.log("img=" + JSON.stringify(img));
	var dlg = currentPage.getComponent("imageDialog");
	if (dlg == null) {
		var url = location.pathname + "?dfMethod=" + this.getUniqId() + ".downloadThumbnail"  + "&" + img.downloadParam;
		window.location.href = url;
	} else {
		var imgfrm = dlg.getComponent("imageForm");
		var imgfld = imgfrm.getComponent("image");
		logger.dir(imgfld);
		imgfld.setValue(img);
		dlg.showModal();
	}
};

/**
 * ファイルフィールドに付随する各種コンポーネントを配置します。
 * @param comp ファイルフィールド。
 */
ImageField.prototype.addElements = function(comp) {
	var getParts = new SyncServerMethod("getParts");
	var htmlstr = getParts.execute("parts=" + escape(currentPage.framePath + "/ImageField.html"));
	if (htmlstr.status == ServerMethod.SUCCESS) {
		var html = htmlstr.result.replace(/\$\{fieldId\}/g, this.id);
		var html = html.replace(/\$\{width\}/g, this.thumbnailWidth);
		var html = html.replace(/\$\{height\}/g, this.thumbnailHeight);
		logger.log("htmlstr=" + html);
		var tag = comp.prop("tagName");
		var type = comp.prop("type");
		if ("INPUT" == tag && type == "file") {
			comp.after(html);
		} else if (tag == "DIV") {
			comp.html(html);
			this.parent.find("#" + this.selectorEscape(this.id + "_ck")).hide();
			this.parent.find("label[for='" + this.selectorEscape(this.id + "_ck") + "']").hide();
		}
	}
};

/**
 * 値を設定します。
 *
 * @param {String} value 値。
 */
ImageField.prototype.setValue = function(value) {
	FileField.prototype.setValue.call(this, value);
	var thumbid = this.id + "_thm"; // サムネイルID.
	var thumb = this.parent.find("#" + this.selectorEscape(thumbid));
	if (value != null) {
		var url = location.pathname + "?dfMethod=" + this.getUniqId() + ".downloadThumbnail"  + "&" + value.downloadParam;
		thumb.attr("src", url);
	} else {
		thumb.attr("src", null);
	}

};