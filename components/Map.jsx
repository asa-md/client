import { useRef, useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function Map(props) {
    const [position, setPosition] = useState(props.position)

    const mapRef = useRef()

    useEffect(() => {
        const map = mapRef.current ? mapRef.current._map : null
        if (map) {
            map.flyTo(props.position)
        }
        setPosition(props.position)
    }, [props.position])

    return (
        <div
            id="mapid"
            style={{ height: 350, overflow: 'hidden', borderRadius: '10px' }}
        >
            <MapContainer
                center={position}
                zoom={17}
                scrollWheelZoom={true}
                style={{ height: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} ref={mapRef}>
                    <Popup>{props.address}</Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
