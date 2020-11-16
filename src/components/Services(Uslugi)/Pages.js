import React from 'react'
import axios from '../../libs/axios'
import { useParams, useLocation } from 'react-router-dom'

import { 
    Typography,
    FormGroup,  
    TextField , 
    Button,
    Divider,
    Grid,
    List,
    ListItem, 
    ListItemText,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

import SaveIcon from '@material-ui/icons/Save'

import { Alert } from '@material-ui/lab';
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'; 
 
 
// функция для редактирования текста в компонентах  
function Pages() {

    const useStyles = makeStyles((theme) => ({
        list: {
            border: `2px solid ${theme.palette.info.main}`, 
            marginTop: 15,  
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 20,
            
        }, 
        heading: {
            display: 'block', 
            padding: '16px', 
            fontWeight: 700
        },
        unsave: {
            display:'block',
            color: theme.palette.error.main, 
            marginLeft: 16,
            marginTop: 15
        }, 
       
        meta: { 
            marginTop: 15,  
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 20,
            border: `2px solid ${theme.palette.success.light}`, 
        },
        input: {
            display: 'none',
        },
        label: { 
            display: 'flex',
            alignItems: 'center' ,
            margin: "0 1em 0 0"
        }
      }));
    const classes = useStyles();

    const {category} = useParams()
 
    let [metaTitle, setMetaTitle] = React.useState('')
    let [metaDesc, setMetaDesc] = React.useState('')

    let [heading, setHeading] = React.useState('') 
    let [title, setTitle] = React.useState('') 
    let [content, setContent] = React.useState('')   
    let [slug, setSlug] = React.useState('')    
    let [file, setFile] = React.useState('')
    let [listServices, setListServices] = React.useState('')   
    let [newServiceTitle, setNewServiceTitle] = React.useState('')   
    let [newServiceSlug, setNewServiceSlug] = React.useState('')   

    let [listBrands, setListBrands] = React.useState('')   
    let [newBrandsTitle, setNewBrandsTitle] = React.useState('')   
    let [newBrandsSlug, setNewBrandsSlug] = React.useState('')   

    let [isSuccessSave, setIsSuccessSave] = React.useState(false)
    let [isUnsavedService, setIsUnsavedService] = React.useState(false)
    let [isUnsavedBrand, setIsUnsavedBrand] = React.useState(false)
    let [isUnsavedMeta, setIsUnsavedMeta] = React.useState(false)
    let [isUnSaveFile, setIsUnSaveFile] = React.useState(false)
     
    
    document.title = metaTitle
 
    function usePageViews() {
        let location = useLocation(); 
        React.useEffect(() => {
             

            setIsSuccessSave(false)
            axios.get(`${category}`)
                .then(
                    response => { 
                        console.log(response) 
                        setMetaTitle(response.meta.title)
                        setMetaDesc(response.meta.description)
                        setContent(response.content)
                        setTitle(response.title)
                        setHeading(response.title)  
                        setSlug(response.slug)
                        setFile(response.img)
                        setListServices(response['list-service-menu'])
                        if(response['list-brands-menu']) {
                            setListBrands(response['list-brands-menu'])
                        }
                        else setListBrands([])
                    }
                ) 
        }, [location]);
    }
   
    function handleInputContent(e) {
        setContent(e.target.value) 
        setIsSuccessSave(false)
    }  
    function handleInputTitle(e) {
        setTitle(e.target.value) 
        setIsSuccessSave(false)
    }  
    function handleInputSlug(e) {
        setTitle(e.target.value) 
        setIsSuccessSave(false)
    }  

    function removeBrand(id) {  
        let filtered = listBrands.filter( item => item.id !== id)
 
        setListBrands(filtered)
        
        setIsUnsavedBrand(true)
    }
    function addBrand(e) { 
        e.preventDefault()
        let newId = 0
        let newList = listBrands.slice()

        newList.forEach(item => {
            if (item.id > newId) newId = item.id
        });
        newId++

        const newItem = { 
            "title": newBrandsTitle,
            "slug": newBrandsSlug, 
            "id": newId, 
            "content": "",
            "meta": {
                "title": newBrandsTitle,
                "description": ""
            }
        }
        newList.push(newItem)

        setListBrands(newList)
        setIsUnsavedBrand(true)

        setNewBrandsSlug('')
        setNewBrandsTitle('')
    }

    function removeService(id) {  
        let filtered = listServices.filter( item => item.id !== id)
 
        setListServices(filtered)
        
        setIsUnsavedService(true)
    }
    function addService(e) { 
        e.preventDefault()
        let newId = 0
        let newList = listServices.slice()

        newList.forEach(item => {
            if (item.id > newId) newId = item.id
        });
        newId++

        const newItem = { 
            "title": newServiceTitle,
            "slug": newServiceSlug, 
            "id": newId, 
            "content": "", 
            "meta": {
                "title": newServiceTitle,
                "description": ""
            }
        }
        newList.push(newItem)

        setListServices(newList)
        setIsUnsavedService(true)

        setNewServiceSlug('')
        setNewServiceTitle('')
    } 
     
    function hendleButtonSave() {  
        const newData = {
            "title": title,
            "slug": slug, 
            "img": file,
            "meta": {
                "title": metaTitle,
                "description" : metaDesc
            },
            "content": content, 
            "list-service-menu":  listServices,
            "list-brands-menu":  listBrands
        }
        // console.log(newData)
        axios.put(`/${category}`, newData)
            .then( () => {
                setIsSuccessSave(true)
                setIsUnsavedService(false)
                setIsUnsavedBrand(false)
                setIsUnsavedMeta(false)
                setIsUnSaveFile(false)
            })
            .then(()=>{
                window.scrollTo({
                    top: 0, 
                    behavior: "smooth"
                });
            })
    }



    function renderServices() { 
        if(listServices) return (
            <List className={classes.list}>
                <Typography variant='div' className={classes.heading}>
                    Список страниц (используется в шапке и на главной )
                </Typography>
                {
                    listServices.map( (item) => (
                
                        <ListItem key={item.id}>
                            <ListItemText
                                primary={item.title}
                                secondary={`slug: ${item.slug} `}
                            > 
                            </ListItemText>
                            <ListItemSecondaryAction
                                    onClick={ () => removeService(item.id) }
                            >
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction> 
                        </ListItem>
                    )) 
                }
                
                <form onSubmit={addService}>
                <FormGroup row>
                    <TextField  type='text'
                                required
                                variant="outlined"
                                label='Добавьте название страницы'
                                value={newServiceTitle}
                                name='title'
                                onChange={(e) => { setNewServiceTitle(e.target.value)  }}  
                                className={'mt-2 mr-2 ml-1 flex-grow-1'}
                    /> 
                </FormGroup>
                <FormGroup row>
                   
                    <TextField  type='text'
                                required
                                variant="outlined"
                                label='Добавьте slug страницы'
                                value={newServiceSlug}
                                name='title'
                                onChange={(e) => { setNewServiceSlug(e.target.value)  }}  
                                className={'mt-2 ml-1 mr-2'}
                    /> 
                    <Button
                        type={'submit'}
                        className={"mt-2 mr-2"}
                        variant="contained"
                        color="primary" 
                        size={'small'}
                        startIcon={<AddCircleOutlineIcon/>} 
                    >
                        Добавить
                    </Button> 
                    
                </FormGroup>
                
                </form>

                
                {
                    isUnsavedService && <h5 className={classes.unsave}>Не забудьте сохранить</h5>
                }
            </List>
        ) 
    }

    function renderBrands() {
        if(listBrands.length > 0) return (
            <List className={classes.list}>
                <Typography variant='div' className={classes.heading}>
                    Список Брендов (используется в шапке и на главной )
                </Typography>
                {
                    listBrands.map( (item) => (
                
                        <ListItem key={item.id}>
                            <ListItemText
                                primary={item.title}
                                secondary={`slug: ${item.slug} `}
                            > 
                            </ListItemText>
                            <ListItemSecondaryAction
                                    onClick={ () => removeBrand(item.id) }
                            >
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction> 
                        </ListItem>
                    )) 
                }
                <form onSubmit={addBrand}>
                <FormGroup row>
                    <TextField  type='text'
                                required
                                variant="outlined"
                                label='Добавьте название страницы'
                                value={newBrandsTitle}
                                name='title'
                                onChange={(e) => { setNewBrandsTitle(e.target.value)  }}  
                                className={'mt-2 mr-2 ml-1 flex-grow-1'}
                    />
                    <TextField  type='text'
                                required
                                variant="outlined"
                                label='Добавьте slug страницы'
                                value={newBrandsSlug}
                                name='title'
                                onChange={(e) => { setNewBrandsSlug(e.target.value)  }}  
                                className={'mt-2 mr-2'}
                    /> 
                    <Button
                        type={'submit'}
                        className={"mt-2 mr-2"}
                        variant="contained"
                        color="primary" 
                        size={'small'}
                        startIcon={<AddCircleOutlineIcon/>} 
                    >
                        Добавить
                    </Button> 
                    
                </FormGroup>
                </form>
                {
                    isUnsavedBrand && <h5 className={classes.unsave}>Не забудьте сохранить</h5>
                }
            </List>
        )
    }

    function renderMeta() {
        return <div className={classes.meta}>
             <Typography variant='div' className={classes.heading}>
                Мета-данные для страницы "{heading}"
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
            {usePageViews()}
            <Grid container>
                <Grid item lg={6}>
                    <Typography variant={'h6'}>
                        Введите текст для страницы "{title}"
                    </Typography>
                    {
                        isSuccessSave &&
                        <Alert severity="success">Успешно сохранено!</Alert>
                    }
                    <FormGroup row>
                        <TextField  type='text'
                                    required
                                    variant="outlined"
                                    label='Введите название страницы'
                                    value={title}
                                    name='title'
                                    onChange={handleInputTitle}  
                                    className={'mt-2 mr-2 flex-grow-1'}
                        />
                        <TextField  type='text'
                                    required
                                    variant="outlined"
                                    label='Введите slug страницы'
                                    value={slug}
                                    name='title'
                                    onChange={handleInputSlug}  
                                    className={'mt-2'}
                        /> 
                        
                    </FormGroup>
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
                      {/* images */}
                      <FormGroup row className='mt-2'>   
                            <input
                                accept="image/svg+xml"
                                className={classes.input}
                                id="contained-button-file" 
                                type="file"
                                onChange={(e) => { setIsUnSaveFile(true); setFile(e.target.files[0].name) }} 
                            />
                            <label htmlFor="contained-button-file" className={classes.label}>
                                <Button variant="outlined"  color='info' component="div">
                                    Выбрать картинку
                                </Button>
                            </label>
                            {
                                file !== '' ?
                                (<h6 className={classes.label}>Выбрано: {file} </h6>) :
                                <span>Примечание: для выбора картинки <br/> доступен только формат svg</span>
                            }
                            {
                                file.length > 0 &&
                                <Button 
                                    variant="outlined"  
                                    color='secondary' 
                                    component="div"
                                    onClick={() => { setFile('') }}
                                >
                                    Удалить картинку
                                </Button>
                            }
                             
                    </FormGroup>
                    {isUnSaveFile && <div className={classes.unsave}>Картинку после добавления нужно сохранить кнопкой внизу</div>}
                    
                    
                    {
                        renderServices()
                    }

                    {
                        renderBrands()
                    }

                  

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
                        <div dangerouslySetInnerHTML={{__html: content}}></div> 
                    </div> 
                </Grid>
            </Grid>
            
            
        </div>
    )
}

export default Pages
