package dataforms.field.common;

import dataforms.dao.sqldatatype.SqlVarchar;

/**
 * フォルダ保存ファイルフィールドクラス。
 */
public class FolderStoreImageField extends ImageField implements SqlVarchar {
	/**
	 * フィールド長。
	 */
	private static final int LENGTH = 1024;

	/**
	 * コンストラクタ。
	 */
	public FolderStoreImageField() {
		super(null);
		this.setLength(LENGTH);
	}
	/**
	 * コンストラクタ。
	 * @param id フィールドID。
	 */
	public FolderStoreImageField(final String id) {
		super(id);
		this.setLength(LENGTH);
	}

}
