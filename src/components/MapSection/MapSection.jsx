import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Webpack/Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapSection = () => {
    // Book Courier Location (Placeholder: London for a generic "global" feel, or adjust to local if needed)
    // Using a central Dhaka location as it's common for these projects
    const position = [23.8103, 90.4125]; 

    return (
        <section className="py-16 bg-bg-body overflow-hidden">
            <div className="w-11/12 sm:w-10/12 max-w-6xl mx-auto">
                <div className="section-head mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-main mb-3">
                            Visit Our Library
                        </h2>
                        <p className="text-text-muted max-w-2xl">
                            Find us in the heart of the city. We're open every day to help you find your next great read.
                        </p>
                    </div>
                    <div className="hidden sm:block">
                        <div className="flex items-center gap-2 text-accent-gold font-medium">
                            <span className="w-8 h-[2px] bg-accent-gold"></span>
                            Location
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    {/* Decorative elements */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-gold/10 rounded-full blur-3xl group-hover:bg-accent-gold/20 transition-colors duration-500"></div>
                    <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-accent-green/10 rounded-full blur-3xl group-hover:bg-accent-green/20 transition-colors duration-500"></div>

                    <div className="h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl border border-card-border relative z-10 transition-transform duration-500 group-hover:scale-[1.01]">
                        <MapContainer 
                            center={position} 
                            zoom={13} 
                            scrollWheelZoom={false}
                            className="h-full w-full"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                <Popup>
                                    <div className="p-1">
                                        <h3 className="font-serif font-bold text-accent-gold m-0">Book Courier</h3>
                                        <p className="m-0 text-xs text-text-muted mt-1">123 Book Street, Reading City</p>
                                    </div>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-bg-card p-6 rounded-xl border border-card-border shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-3">📍</div>
                        <h4 className="font-bold text-text-main mb-2">Our Address</h4>
                        <p className="text-text-muted text-sm">123 Book Street, Reading City, RC 12345</p>
                    </div>
                    <div className="bg-bg-card p-6 rounded-xl border border-card-border shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-3">🕒</div>
                        <h4 className="font-bold text-text-main mb-2">Working Hours</h4>
                        <p className="text-text-muted text-sm">Mon - Fri: 9am - 6pm<br/>Sat - Sun: 10am - 4pm</p>
                    </div>
                    <div className="bg-bg-card p-6 rounded-xl border border-card-border shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-3">📞</div>
                        <h4 className="font-bold text-text-main mb-2">Contact Us</h4>
                        <p className="text-text-muted text-sm">support@bookcourier.com<br/>+1 (555) 123-4567</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
