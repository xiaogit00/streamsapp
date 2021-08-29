import React from 'react'
import '../App.css'

const TableHeadItems = () => {
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

  const spanID = [
    "TH1",
    "TH2",
    "TH3",
    "TH4",
    "TH5",
    "TH6",
    "TH7",
    "TH8"
  ]

  return (
    <>
      {columns.map((column, i) => {
        return (
          <div style={{width:`${colWidth[i]}`, textAlign:"center", fontFamily:"Arial"}} key={i}>
            <span id={spanID[i]}>
              {column}
            </span>
          </div>
        )
      })}
    </>
  )
}

export default TableHeadItems

// <span className="col1">Date</span>
// <span className="col2">Stream</span>
// <span className="col3">Asset</span>
// <span className="col4">Avg Purchase <br/>Price</span>
// <span className="col5">Cur Price</span>
// <span className="col6">Purchase Value <br/>(SGD)</span>
// <span className="col7">Current Value <br/>(SGD)</span>
// <span className="col8">Returns</span>
