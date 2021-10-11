import React from 'react'
import styled from 'styled-components'
import ProgressBar from './progressBar'
import StreamMenuBar from 'components/streamBar/streamMenuBar'


let assetColors = {
    'BTC': 'orange',
    'ETH': 'green',
    'Alibaba': 'orange',
    'Xiaomi': 'grey',
    'JD.com': 'tomato',
    'HST': 'red',
    'Tencent': 'blue'
}

const StreamBarStyled = styled.div`
  width: 90%;
  outline: 2px solid grey;
  /* outline: 12px solid red; */
  border-radius: 10px;
  display: flex;
  font-size: 70%;
  /* padding: 2px; */
  /* align-items: center; */
  margin-bottom: 3px;
  margin-top: 7px;
  margin-right: 10px;
  align-content: flex-start;
  justify-content: space-around;
  min-height: 42px;
  max-height: 50px;
`

const StreamNumberContainer = styled.div`
    width: 17%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #EDEDF7;
  color: #285054;
  font-family: Calibri, sans-serif;
  z-index: 3;
  display:flex;
  justify-content:center;
  :hover {
    background-color: #F1F4FF;
    cursor: pointer;
  }
`

const StreamNumber = styled.div`
/* border: 1px solid green; */
  font-size: 1.2em;
  font-weight: bold;
  color: #285054;
  font-family: Calibri, sans-serif;
  z-index: 3;
  text-align:center;
  display:flex;
  flex-direction: column;
  justify-content:center;
  p {
    font-size: 0.8em;
    font-weight: normal;
    position:relative;
    margin:0;
    color: #FF8849;
  }
  :hover {
    background-color: #F1F4FF;
    cursor: pointer;
  }
`
const Asset = styled.div`
  width: 11%;
  text-align: center;
  font-size: 1.2em;
  font-family: "American Typewriter", serif;
  border-right: 0.6px dotted grey;
  color: ${props => props.color}
`
const AvgPurchasePrice = styled.div`
  width: 15%;
  text-align: center;
  font-size: 1.3em;
  border-right: 0.6px dotted grey;
`
const CurPrice = styled.div`
  font-size: 1.2em;
  width: 15%;
  text-align: center;
  border-right: 0.6px dotted grey;
`
const PurchaseValue = styled.div`
  font-size: 1.2em;
  width: 15%;
  text-align: center;
  border-right: 0.6px dotted grey;
`
const CurrentValue = styled.div`
  font-size: 1.2em;
  width: 15%;
  text-align: center;
  border-right: 0.6px dotted grey;
`
const Returns = styled.div`
  font-size: 1.3em;
  width: 12%;
  text-align: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  color: ${props=> props.returns > 0 ? '#40a829' : 'crimson'};
`
const GlobalNominalDenom = styled.span`
font-size: 0.6em;
margin-top: 4px;
margin-left: 2px;
`

const StreamBar = (props) => {
    // console.log("this is within streambar",props)
    const streamId = props.id
    return (
        <StreamBarStyled>
            <StreamNumberContainer >
                <StreamNumber>
                    Stream #{props.streamID}
                    <p>{props.weights.open}% open</p>
                </StreamNumber>
                <StreamMenuBar id={streamId}/>
            </StreamNumberContainer>

            <Asset style={props.columnStyle} color={assetColors[props.asset]}>{props.asset}</Asset>
            <AvgPurchasePrice style={props.columnStyle}>
        ${props.avgPurchasePrice} <GlobalNominalDenom>{props.globalDenom}</GlobalNominalDenom>
            </AvgPurchasePrice>
            <CurPrice style={props.columnStyle}>${props.curPrice}<GlobalNominalDenom>{props.globalDenom}</GlobalNominalDenom></CurPrice>
            <PurchaseValue style={props.columnStyle}>${props.purchaseValue}<GlobalNominalDenom>{props.globalDenom}</GlobalNominalDenom></PurchaseValue>
            <CurrentValue style={props.columnStyle}>${props.currentValue}<GlobalNominalDenom>{props.globalDenom}</GlobalNominalDenom></CurrentValue>
            <Returns style={props.columnStyle} returns={props.returns}>{props.returns}%</Returns>
            <ProgressBar weights={props.weights}
                avgClosePrice={props.avgClosePrice}
                realizedReturns={props.realizedReturns}
            />
        </StreamBarStyled>
    )
}

export default StreamBar
