import React from 'react'
import 'App.css'
import TableHeadItems from 'components/streamsTable/tableHeadItems'

const TableHead = ({globalDenom}) => {

    return (
        <div className="table-head-flex-container">
            <TableHeadItems globalDenom={globalDenom}/>

        </div>
    )
}

export default TableHead
