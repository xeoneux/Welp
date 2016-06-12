import React, {PropTypes as T} from 'react'

import {getDetails} from 'utils/googleApiHelpers'

import styles from './styles.module.css'

export class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);


        this.state = {
            loading: true,
            place: {},
            location: {}
        }
    }

    getDetails(map) {
        const {google, params} = this.props;
        const {placeId} = params;

        this.setState({loading: true}, () => {
            getDetails(google, map, placeId)
                .then(place => {
                    const {location} = place.geometry;
                    const loc = {
                        lat: location.lat(),
                        lng: location.lng()
                    };

                    this.setState({
                        place,
                        location: loc,
                        loading: false
                    });
                });
        });
    }

    render() {
        return (
            <div className={styles.details}></div>
        );
    }
}

export default Detail;
