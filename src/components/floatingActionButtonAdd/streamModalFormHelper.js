import styled from 'styled-components'

//**********************************************************
//*                     Styled Component Definition
//**********************************************************
export const Form = styled.form`
    height: 69vh;
`

export const HeaderText = styled.p`
    font-family: Calibri, sans-serif;
    font-size: 1.3em;
    /* border: 1px solid grey; */
    margin-left: 0.2em;
    margin-bottom:0.5em;
    color: #5E5E5E;

`
export const ModalBody = styled.div`
    /* border: 0.5px solid green; */
    height: 87%;
    display: flex;
    padding-left: 2em;
    padding-right: 2em;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;
    overflow:auto;
`

export const ModalFooter = styled.div`
    /* border: 0.5px solid maroon; */
    background-color: #F8F8F8;
    position: relative;
    height: 55px;
    padding-left: 30%;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
//**********************************************************
//*                    Initialize Values
//**********************************************************
export const initialFValues = {
    asset:'',
    assetClass:'',
    coinId: '',
    ticker: '',
    trades: [],
    hasSwaps: false,
    swaps: []
}

export const streamAssetClassMenu = [
    'Crypto',
    'Stocks',
    'ETF'
]
