const escapeCsvValue = (value: string | number | Date): string => {
  const stringValue = value instanceof Date ? value.toISOString() : String(value);
  const escaped = stringValue.replace(/"/g, '""');

  return `"${escaped}"`;
};

export const buildCsv = (headers: string[], rows: Array<Array<string | number | Date>>): string => {
  const headerLine = headers.map(escapeCsvValue).join(",");
  const rowLines = rows.map((row) => row.map(escapeCsvValue).join(","));

  return [headerLine, ...rowLines].join("\n");
};
