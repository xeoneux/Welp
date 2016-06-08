import React from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'

import styles from './styles.module.css'
import Header from 'components/Header/Header'
import {searchNearby} from 'utils/googleApiHelpers'

export class Container extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            places: [],
            pagination: null
        };
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
        return (
            <div>
                Hello from the container
                <Map
                    onReady={this.onReady.bind(this)}
                    google={this.props.google}
                    className={styles.wrapper}
                    visible={false}>

                    <Header />

                    <div className={styles.content}>
                        {
                            this.state.places.map(place => {
                                return (<div key={place.id}>{place.name}</div>)
                            })
                        }
                    </div>

                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: __GAPI_KEY__
})(Container)
