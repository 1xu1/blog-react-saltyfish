'use client'
import React from 'react';

export default function Table(props) {
  const {
    columns,
    dataSource,
    className,
    loading
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
        {loading ? (
          // 骨架屏
          Array.from({ length: 5 }).map((_, rowIndex) => (
            <tr key={`skeleton-row-${rowIndex}`}>
              {columns.map((_, colIndex) => (
                <td className='border border-slate-300 p-2' key={`skeleton-col-${rowIndex}-${colIndex}`}>
                  <div className='animate-pulse space-y-2'>
                    <div className='h-4 bg-slate-200 rounded w-3/4'></div>
                  </div>
                </td>
              ))}
            </tr>
          ))
        ) : (
          dataSource.map((data, dataSourceIndex) => {

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

          })
        )}
      </tbody>
    </table>
  );
}