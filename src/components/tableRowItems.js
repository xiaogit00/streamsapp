import React from 'react'
import '../App.css'

const TableRowItems = ({rowData}) => {
  // console.log("value of rowData within tableRowItems: ", rowData.date)
  // console.log(rowData.date.getFullYear().toString().substr(-2))
  const dateString = rowData.date.getDate()
                    + ' '
                    + rowData.date.toLocaleString('default', { month:'short'})
                    + ' '
                    + rowData.date.getFullYear().toString().substr(-2)
  

  const columns = [
    "Date",
    "Stream",
    "Asset",
    "Avg Purchase Price",
    "Cur Price",
    "Purchase Value",
    "Current Value",
    "Returns"
  ]

  const sampleData = [
    dateString,
    "Stream #" + rowData.id,
    rowData.asset,
    "$" + rowData.avgPurchasePrice,
    "$" + rowData.currentPrice,
    "$" + rowData.purchaseValue,
    "$" + rowData.currentValue,
    rowData.returns + "%",
  ]

  const colWidth = [
    "8.5%",
    "15%",
    "10%",
    "14%",
    "14%",
    "14%",
    "14%",
    "10.5%"
  ]

  const divID = [
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8"
  ]

  const spanID = [
    "TR1",
    "TR2",
    "TR3",
    "TR4",
    "TR5",
    "TR6",
    "TR7",
    "TR8"
  ]
  return (
    <>
      {columns.map((column, i) => {
        return(
          <div style={{width:`${colWidth[i]}`}} key={column}>
            <div id={divID[i]} key={column} className="table-row-cells">
              <span id={spanID[i]} key={column}>
              {sampleData[i]}
              </span>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TableRowItems
