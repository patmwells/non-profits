/**
 *
 */
export interface ClientApi {
    getGeocoderConfigs: () => Promise<GeocoderConfigs>;
}

/**
 *
 */
export type GeocoderConfigs = {
    returnTypes: string[];
    returnTypeConfigs: Record<string, {
        searchTypes: string[];
        searchTypeConfigs: {
            onelineaddress: { type: string }[];
            address: { type: string }[];
            coordinates?: { type: string }[];
        };
    }>;
};
