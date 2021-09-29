import styled from 'styled-components'
import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import AssetField from 'components/floatingActionButtonAdd/streamFormFields/assetField'
import AssetClassField from 'components/floatingActionButtonAdd/streamFormFields/assetClassField'
import TradesField from 'components/floatingActionButtonAdd/streamFormFields/tradesField'
import SwapsRadioButton from 'components/floatingActionButtonAdd/streamFormFields/swapsRadioButton'
import SwapsField from 'components/floatingActionButtonAdd/streamFormFields/swapsField'
import CancelButton from 'components/floatingActionButtonAdd/streamFormFields/cancelButton'
import CreateButton from 'components/floatingActionButtonAdd/streamFormFields/createButton'
const HeaderText = styled.p`
    font-family: Calibri, sans-serif;
    font-size: 1.3em;
    font-weight: lighter;
    color: #5E5E5E;
`
const ModalBody = styled.div`
    /* border: 0.5px solid green; */
    height: 87%;
    display: flex;
    padding-left: 2em;
    padding-right: 2em;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;
`

const ModalFooter = styled.div`
    /* border: 0.5px solid maroon; */
    background-color: #F8F8F8;
    position: relative;
    height: 12.5%;
    padding-left: 30%;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const StreamModalForm = () => {

    return (
        <>
            <ModalBody>
                <HeaderText>Create a Stream</HeaderText>
                <AssetField />
                <AssetClassField />
                <TradesField />
                <SwapsRadioButton />
                <SwapsField />
            </ModalBody>
            <ModalFooter>
                <CancelButton></CancelButton>
                <CreateButton></CreateButton>
            </ModalFooter>
        </>
    )
}

export default StreamModalForm
