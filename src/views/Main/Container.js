import React from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'

import styles from './styles.module.css'
import Header from 'components/Header/Header'
import Sidebar from 'components/Sidebar/Sidebar'
import {searchNearby} from 'utils/googleApiHelpers'

export class Container extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            places: [],
            pagination: null
        };
    }

    onMarkerClick(item) {
        const {place} = item;
        const {push} = this.context.router;
        push(`/map/detail/${place.place_id}`);
    }

    onReady(mapProps, map) {
        searchNearby(
            this.props.google,
            map,
            {
                location: map.center,
                radius: '500',
                types: ['cafe']
            }
        ).then((results, pagination) => {
            this.setState({
                places: results,
                pagination
            })
        }).catch((status) => {
            console.log('error fetching nearby', status)
        });
    }

    render() {
        let children = null;
        if (this.props.children) {
            children = React.cloneElement(
                this.props.children,
                {
                    zoom: this.props.zoom,
                    google: this.props.google,
                    places: this.state.places,
                    loaded: this.props.loaded,
                    router: this.context.router,
                    onMarkerClick: this.onMarkerClick.bind(this)
                });
        }
        return (
            <Map
                google={this.props.google}
                onReady={this.onReady.bind(this)}
                visible={false}
                className={styles.wrapper}>
                <Header />

                <Sidebar
                    title={'Restaurants'}
                    onListItemClick={this.onMarkerClick.bind(this)}
                    places={this.state.places}/>

                <div className={styles.content}>
                    {children}
                </div>

            </Map>
        );
    }
}

Container.contextTypes = {
    router: React.PropTypes.object
};

export default GoogleApiWrapper({
    apiKey: __GAPI_KEY__
})(Container);
