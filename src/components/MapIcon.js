import L from 'leaflet';
import mapPin from "../assets/images/location.svg"

const MapIcon = new L.Icon({
    iconUrl: mapPin,
    iconSize: [64, 64],
    iconAnchor: [20, 40],
});

export { MapIcon };