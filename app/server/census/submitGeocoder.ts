/**
 *
 */
export type submitGeocoder = typeof submitGeocoder;

/**
 *
 */
interface GeocoderOptions {
    returnType: string;
    searchType: string;
    configType: { label: string; name: string; value: string }[];
}

/**
 *
 * @param options
 */
export function submitGeocoder(options: GeocoderOptions): void {
    console.log(options);
}
