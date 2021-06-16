export const firstPaginationQuery = (column, take, sorting) => {
  return (
    `SELECT id, name, price, ` +
    `CONCAT(LPAD(POW(10, 10)-${column}, 10, '0'), LPAD(POW(10, 10)-id, 10, '0')) as 'cursor' ` +
    `FROM product ` +
    `ORDER BY ${column} ${sorting}, id ASC LIMIT ${take};`
  );
};

export const nextPaginationQuery = (column, take, cursor, sorting) => {
  const symbol = sorting === 'ASC' ? '<' : '>';
  return (
    `SELECT id, name, price, ` +
    `CONCAT(LPAD(POW(10, 10)-${column}, 10, '0'), LPAD(POW(10, 10)-id, 10, '0')) as 'cursor' ` +
    `FROM product ` +
    `WHERE CONCAT(LPAD(POW(10, 10)-${column}, 10, '0'), LPAD(POW(10, 10)-id, 10, '0')) ${symbol} ${cursor} ` +
    `ORDER BY ${column} ${sorting}, id ASC LIMIT ${take};`
  );
};
