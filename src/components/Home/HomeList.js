import React from "react"; 
import axios from '../../libs/axios'

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { 
    Grid, 
    FormGroup, 
    TextField, 
    Button , 
    IconButton,
    Typography,
    Divider
} from '@material-ui/core'


import { makeStyles } from '@material-ui/core/styles';

import { Alert } from '@material-ui/lab'; 


function HomeList () {

    let [content, setContent] = React.useState([])
    let [services, setServices] = React.useState([])

    
    let [newServTitle, setNewServTitle] = React.useState('')
    let [newServSlug, setNewServSlug] = React.useState('')
    let [newServPrice, setNewServPrice] = React.useState('')
    let [file, setFile] = React.useState('')

    let [newMetaTitle, setNewMetaTitle] = React.useState('')
    let [newMetaDesc, setNewMetaDesc] = React.useState('')

     
    let [isSuccessSave, setIsSuccessSave] = React.useState(false) 
    
    React.useEffect( () => {
        axios.get('/main-list')
            .then( (response) => {  
                setContent(response.content)
                setServices(response.items)
                setNewMetaTitle(response.meta.title)
                setNewMetaDesc(response.meta.description)
            })
    }, []) 

    const useStyles = makeStyles((theme) => ({
        flexDiv: {
          display: 'flex', 
          alignItems: 'center',
          marginTop: '1em', 
        },
        input: {
          display: 'none',
        },
        label: { 
            marginRight: '1em',  
        }
      }));
    const classes = useStyles();

    function handleInputContent(e) {
        setContent(e.target.value) 
        setIsSuccessSave(false)
    }  

    function fileHendler(event) {  
        setFile(event.target.files[0])
    }

     

    function hendleServiceAdd(e) {
        e.preventDefault()

        // генерируем новое уникальноe id
        let newId = 0
        services.forEach(item => {
            if (item.id > newId) newId = item.id
        });
        newId++

        let newService  = { 
            "title": newServTitle,
            "slug": newServSlug,
            "price": newServPrice,
            "img": file.name || '', 
            "id": newId
        }

        let newServiceList = services.slice()
        newServiceList.push(newService)
        setServices(newServiceList)

        let sentData = { 
            "content": content,
            "items" : newServiceList, 
            "meta": {
                "title": newMetaTitle,
                "description": newMetaDesc
            }
        } 
         
        axios.put('/main-list', sentData)
        .then( () => {
            setIsSuccessSave(true) 
            setNewServTitle('')
            setNewServSlug('')
            setNewServPrice('')
            setFile('')
        }) 
    }

    function deleteService(id) { 
        let filtered = services.filter( item => item.id !== id)

        let sentData = {
            "content": content,
            "items" : filtered, 
            "meta": {
                "title": newMetaTitle,
                "description": newMetaDesc
            }
        } 
        setServices(filtered)
        axios.put('/main-list', sentData)
    }
 
    function renderPreview() {  
        return services.map( item => {  
            return ( 
                <li  key={item.id} >

                <div className='btn-absolute right'>
                    <IconButton 
                        variant="contained"
                        color="secondary"   
                        size={'medium'}
                        onClick={()=>{deleteService(item.id)}}
                    ><DeleteIcon /></IconButton>
                </div>
                
                   
                    <div> 
                            {
                                item.img 
                            }
                        <div className="img-cont ">

                            <div className='img' style={{ 
                                ['-webkitMask']: `url(./images/${item.img}) no-repeat center`,
                                mask: `url(./images/${item.img}) no-repeat center`
                            }}></div>
 
                            {/* <img src='./images/3.svg' fill="#fff" alt='hi'/>  */}
                            
                            {/* <svg><use xlinkHref="./images/3.svg"></use></svg> */}
                        </div>
                    </div> 
                    <h4>{item.title}</h4>
                 
            </li> 
            )
        })
    }
    
    function hendleButtonSave() { 
        const newData = { 
            "content": content, 
            "items" : services,
            "meta": {
                "title": newMetaTitle,
                "description": newMetaDesc
            }
        }
        axios.put("/main-list", newData)
            .then( () => {
                setIsSuccessSave(true) 
            })
    }
    return (
        <div> 
             {
                isSuccessSave &&
                <Alert severity="success">Успешно сохранено!</Alert>
            }
            <Typography variant={"h6"}>Мета-данные для главной страницы</Typography> 
            <Grid container spacing={3}>
                <Grid item xs={12} lg={6} >
                        <FormGroup> 
                            <TextField type='text'
                                    required
                                    variant="outlined"
                                    label='Введите TITLE'
                                    value={newMetaTitle} 
                                    onChange={(e)=>{  setIsSuccessSave(false);  setNewMetaTitle(e.target.value)}}
                                    className={'mt-2'}
                            />
                            <TextField type='text'
                                    required
                                    variant="outlined"
                                    label='Введите DESCRIPTION'
                                    value={newMetaDesc} 
                                    onChange={(e)=>{ setIsSuccessSave(false);   setNewMetaDesc(e.target.value)}}
                                    className={'mt-2'}
                            /> 
                        </FormGroup>
                        <Button
                            type={'submit'}
                            className={"mt-2 mb-3"}
                            variant="contained"
                            color="primary"
                            size={'medium'}
                            startIcon={<SaveIcon/>}
                            onClick={hendleButtonSave}
                        >
                            Сохранить мета
                        </Button>
                </Grid>
            </Grid>
            <Divider/>
            <Grid container spacing={3}> 
                <Grid item xs={12} lg={6} className="mb-3"> 
                    <Typography variant={"h6"}>Наши преимущества</Typography> 
                     
                   
                    <form 
                        onSubmit={hendleServiceAdd} 
                    >
                        <FormGroup row> 
                            <TextField type='text'
                                    required
                                    variant="outlined"
                                    label='Введите название преимущества'
                                    value={newServTitle}
                                    
                                    onChange={(e)=>{ setIsSuccessSave(false); setNewServTitle(e.target.value)}}
                                    className={'mr-2 mt-2 flex-grow-1'}
                            />
                              
                        </FormGroup>
                        <FormGroup row>  
                           
                           <div className={classes.flexDiv}>
                                <input
                                    accept="image/svg+xml"
                                    className={classes.input}
                                    id="contained-button-file" 
                                    type="file"
                                    onChange={fileHendler}

                                />
                                <label htmlFor="contained-button-file" className={classes.label}>
                                    <Button variant="outlined"  color='info' component="div">
                                        Выбрать картинку
                                    </Button>
                                </label>
                                {
                                    file.name !== undefined ?
                                    <h6 className={classes.label}>Выбрано: {file.name}</h6> :
                                    <span>Примечание: для выбора картинки <br/> доступен только формат svg</span>
                                }
                                {
                                    file.name && file.name.length > 0 &&
                                    <Button 
                                        variant="outlined"  
                                        color='secondary' 
                                        component="div"
                                        onClick={() => { setFile('') }}
                                    >
                                        Удалить картинку
                                    </Button>
                                }
                           </div>
                        </FormGroup>
                        
                        <Button
                            type={'submit'}
                            className={"mt-2"}
                            variant="contained"
                            color="primary"
                            size={'medium'}
                            startIcon={<SaveIcon/>}
                        >
                            Добавить преимущество
                        </Button>
                    </form> 
                
                </Grid>
                <Grid item xs={12} lg={6}> 
                    <div className='preview-container'>
                        <h3 className='preview-head'>Превью :</h3>
                        <Divider/>
                        <ul className='main-page-row'>
                            {
                                renderPreview()
                            }
                        </ul> 
                    </div> 
                </Grid>
            </Grid>
            <Divider/>
            <Grid container spacing={3}> 
                <Grid item xs={12} lg={6} >
                    <Typography variant={'h6'}>
                        Введите текст для главной страницы  
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
                    <Button
                        type={'submit'}
                        className={"mt-2"}
                        variant="contained"
                        color="primary" 
                        size={'medium'}
                        startIcon={<SaveIcon/>}
                        onClick={hendleButtonSave}
                    >
                        Сохранить текст главной страницы
                    </Button> 
                </Grid>
                <Grid item xs={12} lg={6} >
                    <div className='preview-container  ml-1'>
                        <h3 className='preview-head'>Превью :</h3>
                        <Divider/>
                        <div dangerouslySetInnerHTML={{__html: content}}></div> 
                    </div> 
                </Grid>
            </Grid>             
        </div>
    )
}

export default HomeList