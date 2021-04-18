/**
 *
 */
export interface ClientApi {
    getGeocoderConfigs: () => Promise<GeocoderConfigs>;
    submitGeocoderOptions: (options: GeocoderOptions) => Promise<void>;
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

/**
 *
 */
export type GeocoderOptions = {
    returnType: string;
    searchType: string;
    configType: { label: string; name: string; value: string }[];
}
