import React from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'

export class Container extends React.Component {
    render() {
        return (
            <div>
                Hello from the container
                <Map
                    onReady={this.onReady.bind(this)}
                    google={this.props.google}/>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: __GAPI_KEY__
})(Container)