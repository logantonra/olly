export type Direction = "Northbound" | "Southbound";

export interface Station {
  id: string;
  name: string;
  direction: Direction;
}

export interface Location {
  city: string;
  lat: string;
  long: string;
}

export interface UserSettings {
  userEmail: string;               // partition key
  location: Location;
  stations: readonly [Station, Station];
}