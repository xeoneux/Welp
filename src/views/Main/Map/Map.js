import React, {PropTypes as T} from 'react'
import classnames from 'classnames'
import Map, {Marker} from 'google-maps-react'

import styles from './styles.module.css'

export class MapComponent extends React.Component {
    renderMarkers() {
        if (!this.props.places) {
            return null;
        }
        return this.props.places.map(place => {
            return <Marker
                key={place.id}
                name={place.id}
                place={place}
                label={place.name}
                onClick={this.props.onMarkerClick.bind(this)}
                map={this.props.map}
                position={place.geometry.location}/>
        });
    }

    renderChildren() {
        const {children} = this.props;

        if (React.Children.count(children) > 0) {
            return React.Children.map(children, c => {
                return React.cloneElement(c, this.props, {
                    map: this.props.map,
                    google: this.props.google
                })
            })
        } else {
            return this.renderMarkers();
        }
    }

    render() {
        const {children} = this.props;

        return (
            <Map map={this.props.map}
                 google={this.props.google}
                 className={styles.map}
                 zoom={this.props.zoom}
                 onRecenter={this.props.onMove}
                 onDragend={this.props.onMove}
                 onClick={this.props.onClick}
                 visible={!children || React.Children.count(children) == 0}>
                {this._renderChildren()}
            </Map>
        );
    }
}

MapComponent.propTypes = {
    onMarkerClick: T.func
};

const identity = (...a) => a;
MapComponent.defaultProps = {
    onMarkerClick: identity
};

export default MapComponent;
