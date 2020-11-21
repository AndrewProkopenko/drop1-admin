import React from 'react'


function DumbComponent(props) {

    const renderText = () => {
        return props.textChildren.map((item) => { 
            return item
        })
    }
    return (
        <div>
            {props.data.className} 
            {  
                    React.createElement(`${props.data.variant}`, { class: `${props.className} ` }, renderText()  ) 
            }
        </div>
    )
}

export default DumbComponent
