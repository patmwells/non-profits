import assert from 'assert';
import type { ServerConfig } from '@server/server';
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
 * @param server
 * @param options
 */
export async function submitGeocoderRequest(server: ServerConfig, options: GeocoderOptions): Promise<GeocoderData> {
    assert(options, 'Missing Geocoder Request Options');

    const { configType, returnType, searchType } = options;
    const params = configType
        .concat(baseParameters)
        .map(buildParam)
        .join('&');
    const url = template
        .replace('{returnType}', returnType)
        .replace('{searchType}', searchType)
        .replace('{params}', params);
    const response = await server.request.get(url);

    return new GeocoderData(response.data);
}
