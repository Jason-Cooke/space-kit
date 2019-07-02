import React from "react";

interface Props<RowShape> {
  data: RowShape[];
  columns: Array<{
    name?: string;
    render: (
      input: Readonly<RowShape>,
      index: number,
      list: ReadonlyArray<RowShape>
    ) => React.ReactNode;
  }>;
}

export function Table<RowShape>({
  data,
  columns
}: Props<RowShape>): ReturnType<React.FC> {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ name }) => (
            <th>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr>
            {columns.map((column, index) => (
              <td>{column.render(item, index, data)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
