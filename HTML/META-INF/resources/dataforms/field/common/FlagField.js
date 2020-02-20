/**
 * @fileOverview {@link FlagField}クラスを記述したファイルです。
 */
/**
 * @class FlagField
 * フラグフィールドクラス。
 * <pre>
 * 通常checkboxに割り当て、'0' or '1'を指定します。
 * </pre>
 * @extends CharField
 */
FlagField = createSubclass("FlagField", {}, "CharField");


/**
 * HTMLの要素との対応付けを行います。
 */
FlagField.prototype.attach = function() {
	Field.prototype.attach.call(this);
};

/**
 * checkboxへの値設定を行います。
 * @param {jQuery} comp 値を設定するコンポーネント。
 * @param {String} value 値。
 */
FlagField.prototype.setInputValue = function(comp, value) {
	var tag = comp.prop("tagName");
	var type = comp.prop("type");
	if (tag == "INPUT" && type.toLowerCase() == "checkbox") {
		if (value == "1") {
			comp.prop("checked", true);
		} else {
			comp.prop("checked", false);
		}
	} else {
		comp.val(value);
	}
};

/**
 * フィールドのロック/ロック解除を行ないます。
 * @param {Boolean} lk ロックする場合true。
 */
FlagField.prototype.lock = function(lk) {
	var comp = this.get();
	var tag = comp.prop("tagName");
	var type = comp.prop("type");
	if ("INPUT" == tag && type.toLowerCase() == "checkbox") {
		var span = this.addSpan(comp);
// 【for Bulma】チェックボックスの見た目をbulmaの動作に合わせる start
//		span.html("<input type='checkbox' id='" + this.id + "_ck' onclick='return false;'>");
		if (comp.hasClass("is-checkradio")) {
			span.html("<input class='is-checkradio' type='checkbox' id='" + this.id + "_ck' onclick='return false;'>");
		} else {
			span.html("<input type='checkbox' id='" + this.id + "_ck' onclick='return false;'>");
		}
		// for属性が存在する場合は、初回又は非ロック状態と見なす.
		var label = this.parent.find("label[for=" + this.id + "]");
		if (label.length > 0) {
			label.insertAfter(span);
		}
//【for Bulma】チェックボックスの見た目をbulmaの動作に合わせる end
		this.parent.find("#" + this.selectorEscape(this.id + "_ck")).prop("checked", comp.prop("checked"));
		if (lk) {
			span.show()
			comp.hide();
// 【for Bulma】チェックボックスの見た目をbulmaの動作に合わせる start
			label.attr("for", "");	// 非表示にした場合、for="id"を削除する.(ラベルをクリックすると非表示のチェックボックスがON/OFFされていることが判明！)
			if (comp.hasClass("is-checkradio")) {
				label.hide();
				span.find("input").after("<label for='" + this.id + "_ck'>" + label.html() + "</label>");
			}
			label.insertAfter(span);
// 【for Bulma】チェックボックスの見た目をbulmaの動作に合わせる end
		} else {
			span.hide();
			comp.show();
// 【for Bulma】チェックボックスの見た目をbulmaの動作に合わせる start
			label = span.next();
			label.attr("for", this.id);	// 表示した場合、for="id"を設定する.
			if (comp.hasClass("is-checkradio")) {
				label.show();
			}
			label.insertAfter(comp);
// 【for Bulma】チェックボックスの見た目をbulmaの動作に合わせる end
		}

	}
};
