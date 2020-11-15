import React from "react";
import { Route, Switch} from "react-router-dom";

import Home from "./components/Home/Home";
import Prefixes from "./components/Prefixes";
import Laptops from "./components/Laptops/Laptops";
import Meta from "./components/Meta/Meta"
import Services from "./components/Services(Uslugi)/Services";
import Pages from "./components/Services(Uslugi)/Pages";
import InnerPages from "./components/Services(Uslugi)/InnerPages";

import Login from "./Login";

function RouterComponent () { 
    return (
        <Switch>
            
            <Route exact path="/" component={Home} /> 

            <Route exact path="/content/pages/:category" component={Pages}  />

            <Route exact path="/content/inner-pages/:category/:page" component={InnerPages}  />

            <Route path="/meta/:page" component={Meta}   />
        </Switch>
    )
}

export default  RouterComponent