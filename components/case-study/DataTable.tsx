interface DataTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  caption?: string;
}

export function DataTable({ headers, rows, caption }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-border bg-surface/60">
            {headers.map((h) => (
              <th
                key={h}
                scope="col"
                className="px-5 py-3 font-mono text-xs uppercase tracking-wider text-primary/50"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border/60 last:border-0 hover:bg-surface/30"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={
                    "px-5 py-4 align-top " +
                    (j === 0
                      ? "font-medium text-primary"
                      : "text-primary/65")
                  }
                >
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
