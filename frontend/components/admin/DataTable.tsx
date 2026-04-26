type Props = {
  columns: string[];
  rows: Array<string[]>;
};

export function DataTable({ columns, rows }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-neutral-900">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-neutral-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
