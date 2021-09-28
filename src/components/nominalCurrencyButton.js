import React, { useState } from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { makeStyles } from '@material-ui/core'
import '../App.css'
import styled from 'styled-components'


const useStyles = makeStyles({
    root: {
        '&$selected': {
            color: 'white',
            backgroundColor: '#5B1844',
            '&:hover': {
                backgroundColor: '#8A2468'
            }
        },
        border: '3px solid #424343',
        color: '#424343'
    },
    selected: {},
    btnGrp: {
        height: '80%',
    },
    btn: {

    }
})

const CurrencyText = styled.span`
  margin-left: 4px;
  margin-right: 4px;
`

export default function ToggleButtons(props) {
    const [alignment, setAlignment] = React.useState('left')
    const [formats, setFormats] = React.useState(() => ['phone'])

    const handleFormat = (event, newFormats) => {
        if (newFormats.length) {
            setFormats(newFormats)
        }
    }

    const handleAlignment = (event, newAlignment) => {
        console.log(event.target.innerText)
        props.onChange(event.target.innerText)
        if (newAlignment !== null) {
            setAlignment(newAlignment)
        }
    }
    const classes = useStyles()

    const handleDenomChange = (event) => {

    }

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            className={classes.btnGrp}
            size='small'
        >
            <ToggleButton onClick={handleDenomChange} value="left" aria-label="left aligned"
                classes={{
                    root:classes.root,
                    selected: classes.selected

                }}
            >
                <CurrencyText value={props.value}>SGD</CurrencyText>
            </ToggleButton>
            <ToggleButton onClick={handleDenomChange} value="right" aria-label="right aligned"
                classes={{
                    root:classes.root,
                    selected: classes.selected
                }}>
                <CurrencyText>USD</CurrencyText>
            </ToggleButton>
        </ToggleButtonGroup>
    )
}
