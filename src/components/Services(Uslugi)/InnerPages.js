import React from 'react'
import axios from '../../libs/axios'
import {useParams, useLocation} from 'react-router-dom'


import { 
    Typography,
    FormGroup,  
    TextField , 
    Button,
    Divider,
    Grid, 
} from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import SaveIcon from '@material-ui/icons/Save'

import { makeStyles } from '@material-ui/core/styles';



function InnerPages() {
    const useStyles = makeStyles((theme) => ({
        
        heading: {
            display: 'block', 
            padding: '16px', 
            fontWeight: 700
        },
       
        meta: { 
            marginTop: 15,  
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 20,
            border: `2px solid ${theme.palette.success.light}`, 
        }
      }));
    const classes = useStyles();



    const {category, page} = useParams()
    
    let [metaTitle, setMetaTitle] = React.useState('')
    let [metaDesc, setMetaDesc] = React.useState('')

    let [data, setData] = React.useState({})
    let [basicData, setBasicData] = React.useState({})
    
    let [content, setContent] = React.useState('')   
    let [listServices, setListServices] = React.useState([]) 
    let [listBrands, setListBrands] = React.useState('')   

    let [newTitle, setNewTitle] = React.useState('')   
    let [newSlug, setNewSlug] = React.useState('')   

    let [isSuccessSave, setIsSuccessSave] = React.useState(false)
    let [isUnsavedMeta, setIsUnsavedMeta] = React.useState(false)

    function usePageViews() {
        let location = useLocation(); 
        React.useEffect( async () => {
              
            setIsSuccessSave(false)
            await axios.get(`${category}`)
                .then(
                    response => {  
                        setBasicData(response) 
                         
                        if(response['list-brands-menu']) {
                            setListBrands(response['list-brands-menu'])
                        }
                        else setListBrands([])
                        if(response['list-service-menu']) {
                            setListServices(response['list-service-menu'])
                            console.log(response['list-service-menu'])
                        }
                         
                        SetActive(response)
                    }
                )
                  
        }, [location]);
    }

    function SetActive(response) {
   
        if(response['list-service-menu'] && response['list-service-menu'].length > 0) {
            response['list-service-menu'].forEach( (item) => {
                if(item.slug == page) {
                    setContent(item.content)
                    setData(item) 
                    setNewTitle(item.title)
                    setNewSlug(item.slug)
                    setMetaTitle(item.meta.title)
                    setMetaDesc(item.meta.description)
                }
            })    
        } 
        if(response['list-brands-menu'] && response['list-brands-menu'].length > 0) {  
            response['list-brands-menu'].forEach( (item) => {
                if(item.slug === page) {
                    setContent(item.content)
                    setData(item)  
                    setNewTitle(item.title)
                    setNewSlug(item.slug)
                    setMetaTitle(item.meta.title)
                    setMetaDesc(item.meta.description)
                } 
            })
        } 

    } 
    
    
    function handleInputContent(e) {
        setContent(e.target.value) 
        setIsSuccessSave(false)
    }  

    function hendleButtonSave() {  
        let newBasic = {
            "title": basicData.title,
            "slug": basicData.slug,
            "content": basicData.content,
            "meta": basicData.meta
        }
        // newData новый элемент, тот который только что правили
        let newData = {
            "id": data.id,
            "title": newTitle,
            "slug": newSlug, 
            "content": content,
            "meta": {
                "title": metaTitle,
                "description" : metaDesc
            }
        }
        if(listServices.length > 0) {
            newBasic["list-service-menu"] =  listServices 
        }
        if(listBrands.length > 0) {
            newBasic["list-brands-menu"] =  listBrands  
        }
 
        for( let i = 0; i < basicData['list-brands-menu'].length; i++) { 
            if(basicData['list-brands-menu'][i].slug == page) {  
                newBasic['list-brands-menu'][i] = newData
            }
        }

        for( let i = 0; i < basicData['list-service-menu'].length; i++) { 
            if(basicData['list-service-menu'][i].slug == page) {  
                newBasic['list-service-menu'][i] = newData
            }
        }
        
        console.log(category)
        // console.log(newBasic)
        axios.put(`/${category}`, newBasic)
            .then( () => {
                setIsSuccessSave(true) 
            })
    }

    
    function renderMeta() {
        return <div className={classes.meta}>
             <Typography variant='div' className={classes.heading}>
                Мета-данные для страницы "{data.title}"
            </Typography> 
            <FormGroup>
                <TextField  type='text'
                            required
                            variant="outlined"
                            label='Title'
                            value={metaTitle} 
                            onChange={(e) => { setMetaTitle(e.target.value); setIsUnsavedMeta(true)  }}  
                            className={'mt-2 mr-2  flex-grow-1'}
                />
                <TextField  type='text'
                            required
                            variant="outlined"
                            label='Description'
                            value={metaDesc} 
                            onChange={(e) => { setMetaDesc(e.target.value); setIsUnsavedMeta(true)    }}  
                            className={'mt-2 mr-2'}
                /> 
                
                
            </FormGroup> 
            {
                isUnsavedMeta && <h5 className={classes.unsave}>Не забудьте сохранить</h5>
            }
        </div>
    }

    return (
        <div>
            { usePageViews() }  
            <Grid container>
                <Grid item lg={6}>
                    <Typography variant={'h6'}>
                        Введите текст для страницы "{data.title}"
                    </Typography>
                    {
                        isSuccessSave &&
                        <Alert severity="success">Успешно сохранено!</Alert>
                    }
                    <FormGroup>
                        <TextField  type='text'
                                    required
                                    variant="outlined"
                                    label='Введите контент'
                                    value={content}
                                    name='content'
                                    onChange={handleInputContent} 
                                    multiline
                                    rows={18} 
                                    className={'mt-2'}
                        /> 
                    </FormGroup>
                    <FormGroup row>
                    <TextField  type='text'
                                required
                                variant="outlined"
                                label='Добавьте название страницы'
                                value={newTitle} 
                                onChange={(e) => { setNewTitle(e.target.value)  }}  
                                className={'mt-2 mr-2 flex-grow-1'}
                    />
                    <TextField  type='text'
                                required
                                variant="outlined"
                                label='Добавьте slug страницы'
                                value={newSlug} 
                                onChange={(e) => { setNewSlug(e.target.value)  }}  
                                className={'mt-2 '}
                    /> 
                    
                    
                    </FormGroup>
                    
                    {
                        renderMeta()
                    }
                     
                    <Button
                        type={'submit'}
                        className={"mt-2"}
                        variant="contained"
                        color="primary" 
                        size={'medium'}
                        startIcon={<SaveIcon/>}
                        onClick={hendleButtonSave}
                    >
                        Сохранить
                    </Button>
                     
                </Grid>      

                <Grid item lg={6}> 
                    <div className='preview-container ml-1'>
                        <h3 className='preview-head'>Превью :</h3>
                        <Divider/>
                        <div dangerouslySetInnerHTML={{__html: data.content}}></div> 
                    </div> 
                </Grid>
            </Grid>
        </div>
    )
}

export default InnerPages 