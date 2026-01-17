import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Webpack/Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapSection = () => {
    // Center position for Bangladesh
    const position = [24.8550, 90.3563];

    // Fetch warehouse data from public folder
    const { data: warehouses = [], isLoading } = useQuery({
        queryKey: ['warehouses'],
        queryFn: async () => {
            const res = await axios.get('/warehouses.json');
            return res.data;
        }
    });

    return (
        <section className="py-16 bg-bg-body overflow-hidden">
            <div className="w-11/12 sm:w-10/12 max-w-6xl mx-auto">
                <div className="section-head mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-main mb-3">
                            Our Warehouse Network
                        </h2>
                        <p className="text-text-muted max-w-2xl">
                            We have a wide network of warehouses across the country to ensure fast and reliable delivery of your favorite books.
                        </p>
                    </div>
                    <div className="hidden sm:block">
                        <div className="flex items-center gap-2 text-accent-gold font-medium">
                            <span className="w-8 h-[2px] bg-accent-gold"></span>
                            Locations
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    {/* Decorative elements */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-gold/10 rounded-full blur-3xl group-hover:bg-accent-gold/20 transition-colors duration-500"></div>
                    <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-accent-green/10 rounded-full blur-3xl group-hover:bg-accent-green/20 transition-colors duration-500"></div>

                    <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-card-border relative z-10 transition-transform duration-500 group-hover:scale-[1.005]">
                        {isLoading ? (
                            <div className="h-full w-full flex items-center justify-center bg-bg-card">
                                <span className="loading loading-spinner loading-lg text-accent-gold"></span>
                            </div>
                        ) : (
                            <MapContainer
                                center={position}
                                zoom={6.5}
                                scrollWheelZoom={true}
                                className="h-full w-full"
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {warehouses.map((warehouse, idx) => (
                                    <Marker
                                        key={idx}
                                        position={[warehouse.latitude, warehouse.longitude]}
                                        eventHandlers={{
                                            mouseover: (e) => {
                                                e.target.openPopup();
                                            },
                                            mouseout: (e) => {
                                                e.target.closePopup();
                                            }
                                        }}
                                    >
                                        <Popup>
                                            <div className="p-2 min-w-[200px]">
                                                <h3 className="font-serif font-bold text-lg text-accent-gold border-b border-card-border pb-1 mb-2">
                                                    {warehouse.city} Warehouse
                                                </h3>
                                                <div className="space-y-1">
                                                    <p className="m-0 text-xs font-semibold text-black flex items-center gap-1">
                                                        <span className="text-accent-gold">📍</span> {warehouse.district}, {warehouse.region}
                                                    </p>
                                                    <p className="m-0 text-[10px] text-text-muted mt-2 italic">
                                                        <strong>Covered Areas:</strong>
                                                    </p>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {warehouse.covered_area.map((area, areaIdx) => (
                                                            <span key={areaIdx} className="px-1.5 py-0.5 bg-bg-body rounded text-[9px] border border-card-border text-white">
                                                                {area}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="mt-2 pt-2 border-t border-card-border flex items-center justify-between">
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${warehouse.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                            {warehouse.status.toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        )}
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
                        <p className="text-text-muted text-sm">Mon - Fri: 9am - 6pm<br />Sat - Sun: 10am - 4pm</p>
                    </div>
                    <div className="bg-bg-card p-6 rounded-xl border border-card-border shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-3">📞</div>
                        <h4 className="font-bold text-text-main mb-2">Contact Us</h4>
                        <p className="text-text-muted text-sm">support@bookcourier.com<br />+1 (555) 123-4567</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
