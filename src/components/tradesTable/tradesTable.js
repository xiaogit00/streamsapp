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
import { initializeTrades, updateTrade } from 'reducers/tradeReducer'
import { useSelector, useDispatch } from 'react-redux'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import InputField from 'components/floatingActionButtonAdd/streamFormFields/inputField'
import { initialFValues } from 'components/floatingActionButtonAdd/tradeModalFormHelper'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
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
    const [tradeEditId, setTradeEditId] = useState('')
    const [tradeEditData, setTradeEditData] = useState({})
    const sortedTrades = trades.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })

    const handleTradeEdit = (id) => {
        setTradeEditId(id)
        setTradeEditData(trades.find(trade => trade.id===id))
    }

    const handleInputChange = e => {
        const { name, value } = e.target

        if (name === 'price') {
            const valueField = value * tradeEditData.amt
            setTradeEditData({
                ...tradeEditData,
                [name]: value,
                value: valueField
            })
        } else if ( name === 'amt') {
            const valueField = tradeEditData.price * value
            setTradeEditData({
                ...tradeEditData,
                [name]: value,
                value: valueField
            })
        } else {
            setTradeEditData({
                ...tradeEditData,
                [name]: value
            })
        }
    }

    const saveHandler = e => {
        e.preventDefault()
        const id = tradeEditId
        dispatch(updateTrade(id, tradeEditData))
        setTradeEditId('')
    }

    const [style, setStyle] = useState({display: 'none'})

    // console.log(initialFValues)
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
                    {sortedTrades.map((trade) => {
                        if (trade.id===tradeEditId) {
                            return (
                                <StyledTableRow key={trade.id}>
                                    {/*Date*/}
                                    <StyledTableCell component="th" scope="row" >
                                        <input style={{width:65, fontSize:'0.8em'}}
                                            value={tradeEditData.date.slice(0,10)}
                                            name='date'
                                            onChange={handleInputChange}/>
                                    </StyledTableCell>

                                    {/*Asset*/}
                                    <StyledTableCell align="right" sx={{padding:0}}>
                                        <input style={{width:50}}
                                            value={tradeEditData.asset}
                                            name='asset'
                                            onChange={handleInputChange}/>
                                    </StyledTableCell>

                                    {/*Price*/}
                                    <StyledTableCell align="right" sx={{padding:0}}>
                                        $<input style={{width:55}}
                                            value={tradeEditData.price}
                                            name='price'
                                            onChange={handleInputChange}/>
                                        <input style={{marginLeft:1, width:25, fontSize:'0.7em'}}
                                            value={tradeEditData.priceDenom}
                                            name='priceDenom'
                                            onChange={handleInputChange}/>
                                    </StyledTableCell>

                                    {/*Amt*/}
                                    <StyledTableCell align="right" sx={{padding:0}}>
                                        <input style={{width:60}}
                                            value={tradeEditData.amt}
                                            name='amt'
                                            onChange={handleInputChange}/>
                                    </StyledTableCell>

                                    {/*Value*/}
                                    <StyledTableCell align="right" sx={{padding:0}}>
                                        ${Math.round(tradeEditData.value * 100)/100}<span style={{fontSize:'0.6em'}}>{tradeEditData.valueDenom}</span>
                                    </StyledTableCell>

                                    {/*Platform*/}
                                    <StyledTableCell align="right" sx={{padding:0}}>
                                        <input style={{width:60}}
                                            value={tradeEditData.platform}
                                            name='platform'
                                            onChange={handleInputChange}/>
                                    </StyledTableCell>

                                    {/*Order Type*/}
                                    <StyledTableCell align="right" sx={{padding:0}}>
                                        <select id="orderType" name="orderType"
                                            style={{width:80}}
                                            onChange={handleInputChange}>
                                            <option value="limitBuy">Limit Buy</option>
                                            <option value="limitSell">Limit Sell</option>
                                            <option value="marketBuy">Market Buy</option>
                                            <option value="marketSell">Market Sell</option>
                                            <option value="stopLoss">Stop Loss</option>
                                        </select>
                                    </StyledTableCell>

                                    {/*Position*/}
                                    <StyledTableCell align="right" sx={{padding:0}}>
                                        <select id="position"
                                            name="position"
                                            style={{width:60}}
                                            onChange={handleInputChange}>
                                            <option value="open">Open</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </StyledTableCell>

                                    {/*Fees*/}
                                    <StyledTableCell align="right">
                                        <input style={{width:55}}
                                            value={tradeEditData.fees}
                                            name='fees'
                                            onChange={handleInputChange}/>
                                        <input style={{marginLeft:1, width:25, fontSize:'0.7em'}}
                                            value={tradeEditData.feesDenom}
                                            name='feesDenom'
                                            onChange={handleInputChange}/>
                                    </StyledTableCell>

                                    {/*Buttons*/}
                                    <StyledTableCell align="right" sx={{padding:0}}>
                                        <Button onClick={saveHandler} variant="text" sx={{padding:0, mb:1, justifyContent: 'flex-start'}}>Save</Button>
                                        <Button onClick={() => {
                                            setTradeEditId('')
                                        }} variant="text" sx={{padding:0, justifyContent: 'flex-start', fontSize: '0.8em'}}>Cancel</Button>
                                    </StyledTableCell>

                                </StyledTableRow>
                            )
                        }
                        else {
                            return (
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
                                        <TradeMenuBar id={trade.id} handleTradeEdit={handleTradeEdit}/>
                                    </StyledTableCell>

                                </StyledTableRow>
                            )
                        }

                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
