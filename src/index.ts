/**
 * Filters the given object by removing properties with falsy values.
 * If the property value is an object, it also removes properties with falsy values within that object.
 * @param obj - The object to filter.
 * @returns The filtered object.
 */

export function filterSeqWhereObj(obj: any) {
	if (!obj) {
		return obj;
	}
	for (const k in obj) {
		if (obj[k] === 0) {
			continue;
		}
		if (!obj[k]) {
			delete obj[k];
		}
		if (typeof obj[k] === 'object') {
			const symbolKey = Object.getOwnPropertySymbols(obj[k]);
			for (let i = 0; i < symbolKey.length; i++) {
				const v = symbolKey[i];
				if (obj[k][v] === 0 || obj[k][v] === null) {
					continue;
				}
				if (!obj[k][v]) {
					delete obj[k];
				}
			}
		}
	}
	dealSymbolKeys(obj);
	return obj;
}

function dealSymbolKeys(obj: any) {
	const symbolKeys = Object.getOwnPropertySymbols(obj);
	for (let i = 0; i < symbolKeys.length; i++) {
		const v = symbolKeys[i];
		if (obj[v] === 0 || obj[v] === null) {
			continue;
		}
		if (!obj[v]) {
			delete obj[v];
		}
	}
}

/**
 * Renders the total SQL query by replacing the SELECT clause with a COUNT(*) clause.
 * @param sql - The original SQL query.
 * @returns The modified SQL query with the SELECT clause replaced by COUNT(*).
 */
export function renderTotalSql(sql: string) {
	const replaceRe = /^SELECT[\s\S]*FROM/gi;
	const totalSql = sql.replace(replaceRe, 'SELECT COUNT(*) AS COUNT FROM');
	return totalSql;
}

export type FieldConditionType =
	| 'fuzzy'
	| 'time'
	| 'section'
	| 'leftGreaterEqual'
	| 'leftLessEqual'
	| 'range'
	| '';

/**
 * Renders a field condition based on the provided parameters.
 * @param field - The field name.
 * @param value - The field value.
 * @param type - The type of field condition (optional). "fuzzy" | "time" | "section" | "leftGreaterEqual" | "leftLessEqual" | "range" | "";
 * @returns The rendered field condition as a string.
 */
export function renderField(
	field: string,
	value: any,
	type: FieldConditionType = '',
) {
	let result = '';
	switch (type) {
		case 'fuzzy':
			result = value ? `${field} LIKE '%${value.trim()}%' ` : '1=1';
			break;
		case 'time': {
			const [startTime, endTime] = value;
			result =
				startTime > 0 ? `${field} BETWEEN ${startTime} AND ${endTime}` : '1=1';
			break;
		}
		case 'section':
			if (Array.isArray(value)) {
				const [start, end] = value;
				result = start > 0 ? `${field} BETWEEN ${start} AND ${end}` : '1=1';
			} else {
				result = '1=1';
			}
			break;
		case 'leftGreaterEqual':
			if (!Number.isNaN(value)) {
				result = `${field} >= ${value}`;
			} else {
				result = '1=1';
			}
			break;
		case 'leftLessEqual':
			if (!Number.isNaN(value)) {
				result = `${field} <= ${value}`;
			} else {
				result = '1=1';
			}
			break;
		case 'range': {
			if (!value || value.length === 0) {
				return '1=1';
			}
			let data = [];
			data = Array.isArray(value) ? value : [value];
			result = `${field} in (${data.join(',')})`;
			break;
		}
		default:
			result = value ? `${field}='${value}'` : '1=1';
			break;
	}
	return result;
}
