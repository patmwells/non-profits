import axios from 'axios';
import { GeocoderData } from './models';

/**
 *
 */
interface ConfigType {
    name: string;
    value: string;
}

/**
 *
 */
export interface GeocoderOptions {
    returnType: string;
    searchType: string;
    configType: ConfigType[];
}

/**
 *
 */
const baseParameters = [
    { name: 'benchmark', value: 'Public_AR_Census2020' },
    { name: 'vintage', value: 'Census2020_Census2020' },
    { name: 'layers', value: '10' },
    { name: 'format', value: 'json' }
];

/**
 *
 * @param name
 * @param value
 */
function buildParam({ name, value }: ConfigType): string {
    return `${name}=${encodeURIComponent(value)}`;
}

/**
 *
 */
const template = 'https://geocoding.geo.census.gov/geocoder/{returnType}/{searchType}?{params}';

/**
 *
 * @param options
 */
export async function submitGeocoderRequest(options: GeocoderOptions): Promise<GeocoderData> {
    const { configType, returnType, searchType } = options;
    const params = configType
        .concat(baseParameters)
        .map(buildParam)
        .join('&');
    const url = template
        .replace('{returnType}', returnType)
        .replace('{searchType}', searchType)
        .replace('{params}', params);
    const response = await axios.get(url);

    return new GeocoderData(response.data);
}
