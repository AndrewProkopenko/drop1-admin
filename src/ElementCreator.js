import React from 'react'

import StylesComponent from "./StylesComponent"
import DumbComponent from "./DumbComponent"

// функция принимает data и в зависимости от режима разработчика (modeDev) рендерит: 
// modeDev = true : Умный компонент с настройками data 
// modeDev = false^ Тупой компонент с data
function ElementCreator() {

    const modeDev = true

    const data = {
        variant: 'h3', 
        classes: 'class-top',
        prop: {}, 
        children: [
            "First heading",  
        ]
    }


    
    return (
        <React.Fragment>
            {
                modeDev && 
                <StylesComponent data={data} />
            }

            {/* Если режим разработчика выключен, то показываем  */}
            {
                !modeDev && 
                <DumbComponent 
                    data={data} 
                    className={data.classes} 
                    prop={data.prop} 
                    textChildren={data.children}
                />
            } 
        </React.Fragment>
    )
}

export default ElementCreator
