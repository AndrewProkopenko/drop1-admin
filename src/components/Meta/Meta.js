import React from "react";
import axios from "../../libs/axios"
import { useParams, useLocation } from 'react-router-dom'

import { Typography} from "@material-ui/core";
import MetaForm from "./MetaForm";
import {Alert} from "@material-ui/lab";

function Meta(props) {

    let [heading, setHeading] = React.useState('')
    let [newTitle, setNewTitle] = React.useState('')
    let [newDesc, setNewDesc] = React.useState('')

    let [meta, setMeta] = React.useState([])

    let [isSuccessSave, setIsSuccessSave] = React.useState(false)

    const {page} = useParams() 

    function usePageViews() {
        let location = useLocation(); 
        React.useEffect(() => {

            setIsSuccessSave(false)
            axios.get('/meta')
                .then(
                    response => { 
                        setMeta(response) 
                        setHeading(response[page].name)
                        setNewTitle(response[page].title)
                        setNewDesc(response[page].description)
                    }
                )
        }, [location]);
    }


    function hendleSubmit(e) {
        e.preventDefault()
        let newMeta = Object.assign({}, meta)
        newMeta[page] = {
            "title" : newTitle,
            "description": newDesc,
            "name": heading
        }
        console.log(newMeta, meta)
        axios.put('/meta', newMeta)
            .then(()=>{
                setIsSuccessSave(true)
            })

    }

    function hendleTitle(e) {
        setNewTitle(e.target.value)
        setIsSuccessSave(false)
    }
    function hendleDesc(e) {
        setNewDesc(e.target.value)
        setIsSuccessSave(false)
    }


    return (
        <div>
            { usePageViews() }
            <Typography variant="h6" gutterBottom={true}>
                { heading }
            </Typography>
            {
                isSuccessSave &&
                <Alert severity="success">Успешно сохранено!</Alert>
            }
            <MetaForm
                title={newTitle}
                desc={newDesc}
                hendleTitle={hendleTitle}
                hendleDesc={hendleDesc}
                hendleSubmit={hendleSubmit}
            />
        </div>
    )
}

export default Meta