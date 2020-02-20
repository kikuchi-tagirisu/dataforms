/**
 * @fileOverview {@link Dialog}クラスを記述したファイルです。
 */


/**
 * @class Dialog
 *
 * ダイアログクラス。
 * <pre>
 * DataFormsのサブクラスのDialogクラスです。
 * ダイアログはjquery-uiのdialogで実装しています。
 * </pre>
 * @extends DataForms
 */
Dialog = createSubclass("Dialog", {width: "auto", height: "auto", resizable : true}, "DataForms");

/**
 * 初期化処理を行います。
 * <pre>
 * </pre>
 */
Dialog.prototype.init = function() {
	DataForms.prototype.init.call(this);
	var dlgdiv = $('body').find('#' + this.selectorEscape(this.id));
	if (dlgdiv.length == 0) {
		var htmlstr = this.additionalHtmlText;
// 【for Bulma】BulmaのModalを使用 start
//		dlgdiv = $('body').append("<div id='" + this.id + "' style='display:none;'>" + htmlstr + "</div>");
		dlgdiv = $('body').append("<div id='" + this.id + "' class='modal'>" + htmlstr + "</div>");
// closeボタンや背景クリックで閉じる必要がある場合は、継承先クラスで実装する
//		Exp.
//			$("#close, div.modal-background").on("click", function() {
//				dlgdiv.removeClass("is-active");
//			})
// 【for Bulma】BulmaのModalを使用 end
	}
	// ダイアログ中のFormの初期化.
	this.initForm(this.formMap);
};

/**
 * HTMLエレメントとの対応付けを行います。
 * <pre>
 * #closeButtonのイベント処理を登録します。
 * </pre>
 */
Dialog.prototype.attach = function() {
	DataForms.prototype.attach.call(this);
	var thisDialog = this;
	this.find("#closeButton").click(function() {
		thisDialog.close();
		return false;
	});
}

/**
 * ダイアログを表示します。
 * @param {Boolean} modal モーダル表示の場合true。
 * @param {Object} p 追加プロパティ。
 *
 */
Dialog.prototype.show = function(modal, p) {
	this.toQueryMode();
	var dlgdiv = $('body').find('#' + this.selectorEscape(this.id));
// 【for Bulma】BulmaのModalを使用 start
//	var m = {
//		modal: modal
//		,title: this.title
//		,height: this.width
//		,width: this.height
//		,resizable: this.resizable
//	};
//	if (p != null) {
//		for (var k in p) {
//			m[k] = p[k];
//		}
//	}
//	dlgdiv.dialog(m);
	dlgdiv.find(".modal-card-title").text(this.title);
	// Enterキー押下時の動作を無効化.
	$('body').keypress((e)=>{
		if(e.which == 13){
			return false;
		}
	});
	dlgdiv.addClass('is-active');
// 【for Bulma】BulmaのModalを使用 end
};



/**
 * モーダルダイアログ表示を行います。
 * @param {Object} p 追加プロパティ。
 */
Dialog.prototype.showModal = function(p) {
	this.show(true, p);
};

/**
 * モードレスダイアログ表示を行います。
 * @param {Object} p 追加プロパティ。
 */
Dialog.prototype.showModeless = function(p) {
	this.show(false, p);
};


/**
 * ダイアログを閉じます。
 */
Dialog.prototype.close = function() {
	this.resetErrorStatus();
	var dlgdiv = $('body').find('#' + this.selectorEscape(this.id));
// 【for Bulma】BulmaのModalを使用 start
//	dlgdiv.dialog('close');
	// Enterキー無効化の削除.
	$('body').off("keypress");
	dlgdiv.removeClass('is-active');
// 【for Bulma】BulmaのModalを使用 end
};
