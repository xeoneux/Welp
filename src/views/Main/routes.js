import React from 'react'
import {IndexRoute, Route} from 'react-router'

import Map from './Map/Map'
import Container from './Container'
import Detail from "./Detail/Detail";

export const makeMainRoutes = () => {
    return (
        <Route path="/" component={Container}>
            <Route path="map" component={Map}/>
            <Route path="detail/:placeId"
                   component={Detail}/>
            <IndexRoute component={Map}/>
        </Route>
    );
};

export default makeMainRoutes;
