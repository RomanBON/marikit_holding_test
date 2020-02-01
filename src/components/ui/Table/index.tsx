import React, { TableHTMLAttributes } from 'react';
import cx from 'classnames';

import './style.css';


interface IColumn {
  title: string;
  dataIndex: string;
  key: string;
}

interface IDataSource {
  key: string | number;
  [key: string]: any;
}

type Props = {
  columns: IColumn[];
  dataSource: IDataSource[];
  emptyText?: string;
  total?: string;
} & TableHTMLAttributes<HTMLTableElement>;

const Table = (props: Props) => {
  const {
    className,
    columns,
    dataSource,
    emptyText = 'Нет данных',
    total,
    ...restProps
  } = props;
  const baseClassName = cx(className, Table.displayName);

  return (
    <div className={baseClassName}>
      <table className={`${Table.displayName}__table`} {...restProps}>
        <thead className={`${Table.displayName}__thead`}>
          <tr className={`${Table.displayName}__tr`}>
            {columns.map(column => (
              <th key={column.key}
                  className={`${Table.displayName}__th`}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={`${Table.displayName}__tbody`}>
          {dataSource.length ? (
            dataSource.map(data => (
              <tr key={data.key}
                  className={`${Table.displayName}__tr`}
              >
                {columns.map(column => (
                  <td key={`${column.key}_${data.key}`}
                      className={`${Table.displayName}__td`}
                  >
                    {column && data[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : null}
        </tbody>

        {total && dataSource.length ? (
          <tfoot>
            <tr>
              {columns.map((column, index) => (
                <td key={`tfoot_${column.key}`}
                    className={`${Table.displayName}__td`}
                >
                  {columns.length - 1 === index && total}
                </td>
              ))}
            </tr>
          </tfoot>
        ) : null}
      </table>

      {!dataSource.length ? (
        <div className={`${Table.displayName}__table-placeholder`}>
          <div className={`${Table.displayName}__table-empty`}>
            {emptyText}
          </div>
        </div>
      ) : null}
    </div>
  );
};

Table.displayName = 'Table';

export default Table;
