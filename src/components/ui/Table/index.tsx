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
  /** columns of table */
  columns: IColumn[];
  /** data record array to be displayed */
  dataSource: IDataSource[];
  /** text to be displayed with empty data */
  emptyText?: string;
  /** text to be displayed in last table footer cell */
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

  const thead = (
    <thead className={`${Table.displayName}__thead`}>
      <tr className={`${Table.displayName}__tr`}>
        {columns.map(column => (
          <th
            key={column.key}
            className={`${Table.displayName}__th`}
          >
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
  const tbody = (
    <tbody className={`${Table.displayName}__tbody`}>
      {dataSource.length ? (
        dataSource.map(data => (
          <tr
            key={data.key}
            className={`${Table.displayName}__tr`}
          >
            {columns.map(column => (
              <td
                key={`${column.key}_${data.key}`}
                className={`${Table.displayName}__td`}
              >
                {column && data[column.key]}
              </td>
            ))}
          </tr>
        ))
      ) : null}
    </tbody>
  );
  const tfooter = (total && dataSource.length
    ? (
      <tfoot>
        <tr>
          {columns.map((column, index) => (
            <td
              key={`tfoot_${column.key}`}
              className={`${Table.displayName}__td`}
            >
              {columns.length - 1 === index && total}
            </td>
          ))}
        </tr>
      </tfoot>
    )
    : null
  );
  const emptySource = !dataSource.length
    ? (
      <div className={`${Table.displayName}__table-placeholder`}>
        <div className={`${Table.displayName}__table-empty`}>
          {emptyText}
        </div>
      </div>
    )
    : null
  ;

  return (
    <div className={baseClassName}>
      <table className={`${Table.displayName}__table`} {...restProps}>
        {thead}

        {tbody}

        {tfooter}
      </table>

      {emptySource}
    </div>
  );
};

Table.displayName = 'Table';

export default Table;
