package dataforms.field.sqltype;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.apache.log4j.Logger;

import dataforms.controller.ApplicationError;
import dataforms.dao.sqldatatype.SqlDate;
import dataforms.field.base.DateTimeField;
import dataforms.util.MessagesUtil;
import dataforms.util.StringUtil;
import dataforms.validator.DateValidator;

/**
 * 日付フィールドクラス。
 *
 */
public class DateField extends DateTimeField<Date> implements SqlDate {
    /**
     * Logger.
     */
    private static Logger log = Logger.getLogger(DateField.class.getName());


	/**
	 * コンストラクタ。
	 * @param id ID。
	 */
	public DateField(final String id) {
		super(id);
		this.addValidator(new DateValidator());
		this.setDateFormat("format.datefield");
	}


	/**
	 * {@inheritDoc}
	 * <pre>
	 * 日付フォーマットで入力された文字列をjava.sql.Dataに変換します。
	 * </pre>
	 */
	@Override
	public void setClientValue(final Object v) {
		if (StringUtil.isBlank(v)) {
			this.setValue(null);
			return;
		}
		String dfmt = MessagesUtil.getMessage(this.getPage(), this.getDateFormat());
		SimpleDateFormat fmt = new SimpleDateFormat(dfmt);
		try {
			Date d = new Date(fmt.parse((String) v).getTime());
			this.setValue(d);
		} catch (ParseException e) {
			log.error(e.getMessage(), e);
			throw new ApplicationError(e);
		}
	}

	/**
	 * {@inheritDoc}
	 * <pre>
	 * java.sql.Dataを日付フォーマットの文字列に変換します。
	 * </pre>
	 */
	@Override
	public Object getClientValue() {
		String dfmt = MessagesUtil.getMessage(this.getPage(), this.getDateFormat()); // , "format.datefield");
		SimpleDateFormat fmt = new SimpleDateFormat(dfmt);
		if (this.getValue() != null) {
			return fmt.format(this.getValue());
		} else {
			return null;
		}
	}


}
