import React from 'react';

/**
  columns => [{
    dataIndex,
    title,
    render
  }]
**/

export default function Table(props) {
  const {
    columns,
    dataSource,
    className
  } = props

  return (
    <table className={`border-collapse border border-slate-400 ${className}`}>
      <thead className='bg-slate-50'>
        <tr>
          {columns.map((column, index) => {
            return <th className='border border-slate-300 p-4 text-slate-900 text-left' key={`thead-${index}`}>
              {column.title}
            </th>
          })}
        </tr>
      </thead>
      <tbody className='bg-white'>
        {dataSource.map((data, dataSourceIndex) => {

          return (<tr key={`tr-${dataSourceIndex}`}>
            {
              columns.map((column, index) => {
                let content = ''
                if(column.render){
                  content = column.render(data[column.dataIndex], data, dataSourceIndex)
                }
                else{
                  content = (data[column.dataIndex] || '').toString()
                }
                return <td className='border border-slate-300 p-2' key={`tbody-${dataSourceIndex}-${index}`}>
                  {content}
                </td>
              })
            }

          </tr>)

        })}
      </tbody>
    </table>
  );
}