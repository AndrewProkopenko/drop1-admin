import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import {FormGroup, Grid, TextField} from '@material-ui/core'

import DumbComponent from "./DumbComponent"

function StylesComponent(props) {

    let [padding, setPadding] = React.useState({
        top: 0, 
        left: 0,
        bottom: 0, 
        right: 0 
    })
    const [margin, setMargin] = React.useState({
        top: 0, 
        left: 0,
        bottom: 0, 
        right: 0 
    })
    const [color, setColor] = React.useState('inherit')
    const [backgroundColor, setBackgroundColor] = React.useState('none')
    const [textAlign, setTextAlign] = React.useState('left')
    const [fontSize, setFontSize] = React.useState(16)
    const [fontWeight, setFontWeight] = React.useState(400)
    const [lineHeight, setLineHeight] = React.useState(1.38)

    const useStyles = makeStyles((theme) => ({
        myClassName: { 
            paddingTop: padding.top,
            paddingBottom: padding.bottom,
            paddingLeft: padding.left,
            paddingRight: padding.right,
            marginTop: margin.top,
            marginBottom: margin.bottom,
            marginLeft: margin.left,
            marginRight: margin.right,
            color: color,
            backgroundColor: backgroundColor,
            textAlign: textAlign,
            fontSize: fontSize,
            fontWeight: fontWeight, 
            lineHeight: lineHeight
        },
        tryContainer: {
            border: '1px solid #f00',
            padding: 15
        },
        tryContainerHeading : {
            color: theme.palette.error.dark
        }, 
        inputNumber: {
            width: 140, 
            margin: '5px 5px 0 0 '
        }
      }));
    const classes = useStyles();

    const data = {...props.data, ...{
        classes: classes.myClassName
    }}

    const handlePadding = (e, direction) => { 
        console.log(e.target.value, direction )
        let newPadding = Object.assign({}, padding)
        newPadding[direction] = Number(e.target.value)
        setPadding(newPadding)  
    }

    return (
        <div className={classes.tryContainer}>
             <h2 className={classes.tryContainerHeading}>
                Эксперементальный режим разработки
            </h2>
            <Grid container> 
                <Grid item xs={6}>
                    <FormGroup row> 
                        <TextField 
                            className={classes.inputNumber}
                            type='number'
                            label="Padding Top" 
                            variant="filled" 
                            size='small'  
                            value={padding.top}
                            onChange={ (e) => { handlePadding(e, 'top') } }     
                        />
                        <TextField 
                            className={classes.inputNumber}
                            type='number'
                            label="Padding Bottom" 
                            variant="filled" 
                            size='small'  
                            value={padding.bottom}
                            onChange={ (e) => { handlePadding(e, 'bottom') } }     
                        />
                    </FormGroup>
                    <FormGroup row> 
                        <TextField 
                            className={classes.inputNumber}
                            type='number'
                            label="Padding Left" 
                            variant="filled" 
                            size='small'  
                            value={padding.left}
                            onChange={ (e) => { handlePadding(e, 'left') } }     
                        />
                        <TextField 
                            className={classes.inputNumber}
                            type='number'
                            label="Padding Right" 
                            variant="filled" 
                            size='small'  
                            value={padding.right}
                            onChange={ (e) => { handlePadding(e, 'right') } }     
                        />
                    </FormGroup>


                    <FormGroup row> 
                        <TextField 
                            className={classes.inputNumber}
                            type='color'
                            label="Color" 
                            variant="filled" 
                            size='small'  
                            value={color}
                            onChange={ (e) => { setColor(e.target.value)} }     
                        />
                        <TextField 
                            className={classes.inputNumber}
                            type='color'
                            label="Background Color" 
                            variant="filled" 
                            size='small'  
                            value={backgroundColor}
                            onChange={ (e) => { setBackgroundColor(e.target.value)} }     
                        />
                    </FormGroup>
                    <FormGroup row> 
                        <TextField 
                            className={classes.inputNumber}
                            type='number'
                            label="Font Size" 
                            variant="filled" 
                            size='small'  
                            value={fontSize}
                            onChange={ (e) => { setFontSize(Number(e.target.value))} }     
                        />
                        <TextField 
                            className={classes.inputNumber}
                            type='number'
                            label="Font Weight" 
                            variant="filled" 
                            size='small'  
                            value={fontWeight}
                            onChange={ (e) => { setFontWeight(Number(e.target.value))} }     
                        />
                        <TextField 
                            className={classes.inputNumber}
                            type='number'
                            label="Line Height" 
                            variant="filled" 
                            size='small'  
                            value={lineHeight}
                            onChange={ (e) => { setLineHeight(Number(e.target.value))} }     
                        />
                    </FormGroup>
                    
                </Grid>
                <Grid item xs={6}>
                    <h5>Превью</h5>
                    <DumbComponent 
                        data={data} 
                        className={data.classes} 
                        prop={data.prop} 
                        textChildren={data.children}
                    />
                </Grid>
            </Grid>
            


        </div>
    )
}

export default StylesComponent
