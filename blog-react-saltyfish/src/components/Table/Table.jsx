"use client"
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
    dataSource
  } = props

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => {
            return <td key={`thead-${index}`}>
              {column.title}
            </td>
          })}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((data, dataSourceIndex) => {

          return (<tr key={`tr-${dataSourceIndex}`}>
            <td>1111</td>
              
            {/* {
              columns.map((column, index) => {
                return (<td key={`tbody-${dataSourceIndex}-${index}`} >
                  {data[column.dataIndex] || ''}
                </td>)
              })
            } */}

          </tr>)

        })}
      </tbody>
    </table>
  );
}