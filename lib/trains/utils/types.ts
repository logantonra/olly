export interface Station {
    id: string;
    name: string;
    direction: 'Northbound' | 'Southbound';
}

export interface StationSelectorProps {
    selectedStations: Station[];
    setSelectedStations: (stations: Station[]) => void;
}