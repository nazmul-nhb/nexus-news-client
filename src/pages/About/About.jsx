import { Icon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import pinIcon from '../../assets/location-pin.png';
import "./About.css";
import { Helmet } from 'react-helmet-async';

const About = () => {
    const position = [23.8759, 90.3795];

    const markerIcon = new Icon({
        iconUrl: pinIcon,
        iconSize: [36, 40]
    })

    return (
        <section className="mx-6 md:mx-10 py-2 md:py-8 p-2 md:px-4">
            <Helmet>
                <title>About - Nexus News</title>
            </Helmet>

            {/* Map */}
            <MapContainer className='z-0' center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={markerIcon}>
                    <Popup>
                        <div className='flex flex-col gap-1 items-center'>
                            <h4 className="font-semibold text-base">Nexus News Tower</h4>
                            <h5 className="font-medium text-sm">Nexus Lane, Uttara, Dhaka - 1710</h5>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>

        </section>
    );
};

export default About;