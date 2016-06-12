import React from 'react'
import {Route} from 'react-router'

import Map from './Map/Map'
import Container from './Container'

export const makeMainRoutes = () => {
    return (
        <Route path="/" component={Container}>
            <Route path="map" component={Map}/>
        </Route>
    );
};

export default makeMainRoutes;
