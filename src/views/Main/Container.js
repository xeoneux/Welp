import React from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'

import styles from './styles.module.css'
import Header from 'components/Header/Header'
import Sidebar from 'components/Sidebar/Sidebar'
import {searchNearby} from 'utils/googleApiHelpers'

export class Container extends React.Component {
    constructor(props) {
        super(props);

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
        const {google} = this.props;
        const opts = {
            location: map.center,
            radius: '500',
            types: ['cafe']
        };

        searchNearby(google, map, opts)
            .then((results, pagination) => {
                this.setState({
                    places: results,
                    pagination
                });
            })
            .catch((status, result) => {

            });
    }

    render() {
        let children = null;
        if (this.props.children) {
            children = React.cloneElement(
                this.props.children,
                {
                    google: this.props.google,
                    places: this.state.places,
                    loaded: this.props.loaded,
                    onMarkerClick: this.onMarkerClick.bind(this)
                });
        }
        return (
            <div>
                Hello from the container
                <Map
                    onReady={this.onReady.bind(this)}
                    google={this.props.google}
                    className={styles.wrapper}
                    visible={false}>

                    <Header />
                    <Sidebar
                        title={'Restaurants'}
                        places={this.state.places}
                    />

                    <div className={styles.content}>
                        {children}
                    </div>

                </Map>
            </div>
        );
    }
}

Container.contextTypes = {
    router: React.PropTypes.object
};

export default GoogleApiWrapper({
    apiKey: __GAPI_KEY__
})(Container);
