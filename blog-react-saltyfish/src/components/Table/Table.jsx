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
            {
              columns.map((column, index) => {
                let content = ''
                if(column.render){
                  content = column.render(data[column.dataIndex], data, dataSourceIndex)
                }
                else{
                  content = (data[column.dataIndex] || '').toString()
                }
                return <td key={`tbody-${dataSourceIndex}-${index}`}>
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