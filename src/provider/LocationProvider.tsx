import { createContext, useEffect, useState } from 'react';
import { Location } from '../model/Domain';
import axios from 'axios';

interface LocationContextInterface {
    locationPage: Location[];
    getAllLocations: () => Promise<Location[]>;
    getPageLocations: (
        page: number,
        size: number,
        sort: string,
    ) => Promise<void>;
    newLocation: (location: Location) => Promise<void>;
    updateLocation: (location: Location) => Promise<void>;
    deleteLocation: (id: number) => Promise<void>;
}

export const LocationContext = createContext<
    LocationContextInterface | undefined
>(undefined);

export const LocationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [locationPage, setLocationPage] = useState<Location[]>([]);

    const getAllLocations = async () => {
        const response = await axios.get('/location/all');
        return response.data;
    };

    const getPageLocations = async (
        page: number,
        size: number,
        sort: string,
    ) => {
        await axios
            .get(`/location/paged?page=${page}&pageSize=${size}&sort=${sort}`)
            .then((response) => {
                setLocationPage(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const newLocation = async (location: Location) => {
        axios.post('/location/new', location).then((response) => {
            return response.data;
        });
    };

    const updateLocation = async (location: Location) => {
        axios.put('/location/update', location).then((response) => {
            return response.data;
        });
    };

    const deleteLocation = async (id: number) => {
        axios.delete(`/location/delete?id=${id}`).then(() => {});
    };

    useEffect(() => {
        (async () => {
            await getPageLocations(0, 5, 'id,asc');
        })();
    }, []);

    return (
        <LocationContext.Provider
            value={{
                locationPage,
                getAllLocations,
                getPageLocations,
                newLocation,
                updateLocation,
                deleteLocation,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};
