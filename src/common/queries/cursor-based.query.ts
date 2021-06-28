export const firstPaginationQuery = (
  entity,
  column,
  joinTable,
  take,
  sorting,
) => {
  return (
    `SELECT ${entity.metadata.tableName}.id, ${entity.metadata.tableName}.name, ${entity.metadata.tableName}.price, ` +
    `CONCAT(LPAD(POW(10, 10)-${column}, 10, '0'), LPAD(POW(10, 10)-id, 10, '0')) as 'cursor' ` +
    `FROM ${entity.metadata.tableName} ` +
    `ORDER BY ${column} ${sorting}, id ASC LIMIT ${take};`
  );
};

export const nextPaginationQuery = (
  entity,
  column,
  joinTable,
  take,
  cursor,
  sorting,
) => {
  const symbol = sorting === 'ASC' ? '<' : '>';
  return (
    `SELECT ${entity.metadata.tableName}.id, ${entity.metadata.tableName}.name, ${entity.metadata.tableName}.price, ` +
    `CONCAT(LPAD(POW(10, 10)-${column}, 10, '0'), LPAD(POW(10, 10)-id, 10, '0')) as 'cursor' ` +
    `FROM ${entity.metadata.tableName} ` +
    `WHERE CONCAT(LPAD(POW(10, 10)-${column}, 10, '0'), LPAD(POW(10, 10)-id, 10, '0')) ${symbol} ${cursor} ` +
    `ORDER BY ${column} ${sorting}, id ASC LIMIT ${take};`
  );
};

export const prevPaginationQuery = (
  entity,
  column,
  joinTable,
  take,
  cursor,
  sorting,
) => {
  const symbol = sorting === 'ASC' ? '>' : '<';
  return (
    `SELECT ${entity.metadata.tableName}.id, ${entity.metadata.tableName}.name, ${entity.metadata.tableName}.price, ` +
    `CONCAT(LPAD(POW(10, 10)-${column}, 10, '0'), LPAD(POW(10, 10)-id, 10, '0')) as 'cursor' ` +
    `FROM ${entity.metadata.tableName} ` +
    `WHERE CONCAT(LPAD(POW(10, 10)-${column}, 10, '0'), LPAD(POW(10, 10)-id, 10, '0')) ${symbol} ${cursor} ` +
    `ORDER BY ${column} ${sorting}, id ASC LIMIT ${take};`
  );
};
