/**
 *
 */
export interface ClientApi {
    getGeocoderConfigs: () => Promise<GeocoderConfigs>;
}

/**
 *
 */
export type GeocoderConfigs = Array<{
    returntype: string;
    searchtype: string[];
    configs: {
        onelineaddress: { type: string }[];
        address: { type: string }[];
        coordinates?: { type: string }[];
    };
}>
