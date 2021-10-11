// import * as React from 'react'
// import { DataGrid } from '@mui/x-data-grid'
// import { useEffect } from 'react'
// import { initializeTrades } from 'reducers/tradeReducer'
// import { useSelector, useDispatch } from 'react-redux'
//
// const columns = [
//
//     { field: 'date', headerName: 'Date', width: 110, editable:true, headerAlign:'center' },
//     { field: 'asset', headerName: 'Asset', width: 115, headerAlign:'center' },
//     { field: 'platform', headerName: 'Platform', width: 130, headerAlign:'center' },
//     { field: 'orderType', headerName: 'Order Type', width: 130, headerAlign:'center' },
//     { field: 'position', headerName: 'Position', width: 100 },
//     { field: 'price', headerName: 'Price', width: 100 },
//     { field: 'amt', headerName: 'Amount', width: 100 },
//     { field: 'value', headerName: 'Value', width: 120 },
//     { field: 'fees', headerName: 'Fees', width: 110 },
//
// ]
//
//
//
// export default function TradesTable() {
//     const dispatch = useDispatch()
//
//     useEffect(() => {
//         dispatch(initializeTrades())
//     }, [dispatch])
//
//     const trades = useSelector(state => state.trades)
//
//     const tradesFormatted = trades.map(trade => {
//         return {
//             id: trade.id,
//             date: trade.date.slice(0,10),
//             asset: trade.asset,
//             platform: trade.platform,
//             orderType: trade.orderType,
//             position: trade.position,
//             price: '$' + trade.price + ' ' + trade.priceDenom,
//             amt: trade.amt,
//             value: '$' + trade.value + ' ' + trade.valueDenom,
//             fees: '$' + trade.fees + ' ' + trade.feesDenom,
//             comments: trade.comments
//
//         }
//     })

import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import { useEffect, useState } from 'react'
import { initializeTrades } from 'reducers/tradeReducer'
import { useSelector, useDispatch } from 'react-redux'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TradeMenuBar from 'components/tradesTable/tradeMenuBar'
import { makeStyles } from '@material-ui/core'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
        backgroundColor: '#DADEDF',
        transition: '0.2s'
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein }
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
]

// const useStyles = makeStyles({
//     tableRow: {
//         '&:hover': {
//             backgroundColor: 'blue'
//         }
//     }
// })

export default function CustomizedTables() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeTrades())
    }, [dispatch])

    const trades = useSelector(state => state.trades)
    const sortedTrades = trades.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })
    const [style, setStyle] = useState({display: 'none'})

    // const classes = useStyles()
    return (

        <TableContainer component={Paper}>

            <Table stickyHeader sx={{ minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow hover>

                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell align="right">Asset</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                        <StyledTableCell align="right">Amt</StyledTableCell>
                        <StyledTableCell align="right">Value</StyledTableCell>
                        <StyledTableCell align="right">Platform</StyledTableCell>
                        <StyledTableCell align="right">Order Type</StyledTableCell>
                        <StyledTableCell align="right">Position</StyledTableCell>
                        <StyledTableCell align="right">Fees</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedTrades.map((trade) => (

                        <StyledTableRow key={trade.id}>

                            <StyledTableCell component="th" scope="row" >
                                {trade.date.slice(0,10)}
                            </StyledTableCell>
                            <StyledTableCell align="right">{trade.asset}</StyledTableCell>
                            <StyledTableCell align="right">${trade.price}<span style={{fontSize:'0.6em'}}>{trade.priceDenom}</span></StyledTableCell>
                            <StyledTableCell align="right">{trade.amt}</StyledTableCell>
                            <StyledTableCell align="right">${trade.value}<span style={{fontSize:'0.6em'}}>{trade.valueDenom}</span></StyledTableCell>
                            <StyledTableCell align="right">{trade.platform}</StyledTableCell>
                            <StyledTableCell align="right">{trade.orderType}</StyledTableCell>
                            <StyledTableCell align="right">{trade.position}</StyledTableCell>
                            <StyledTableCell align="right">${trade.fees}<span style={{fontSize:'0.6em'}}>{trade.feesDenom}</span></StyledTableCell>
                            <StyledTableCell align="right">
                                <TradeMenuBar id={trade.id}/>
                            </StyledTableCell>

                        </StyledTableRow>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
