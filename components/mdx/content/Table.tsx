type TableProps = React.HTMLAttributes<HTMLTableElement>
type ThProps = React.ThHTMLAttributes<HTMLTableCellElement>
type TdProps = React.TdHTMLAttributes<HTMLTableCellElement>

export const Table = ({ children, ...props }: TableProps) => (
  <div className="overflow-x-auto my-6">
    <table
      className="min-w-full border-collapse border border-gray-200"
      {...props}
    >
      {children}
    </table>
  </div>
)

export const Th = ({ children, ...props }: ThProps) => (
  <th
    className="border border-gray-200 px-4 py-2 text-left font-semibold bg-gray-50"
    {...props}
  >
    {children}
  </th>
)

export const Td = ({ children, ...props }: TdProps) => (
  <td
    className="border border-gray-200 px-4 py-2"
    {...props}
  >
    {children}
  </td>
)