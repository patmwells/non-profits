/**
 *
 */
enum ResponseFields {
    censusBlocks = 'Census Blocks'
}

/**
 *
 */
interface GeocoderCensusBlockResponse {
    TRACT: string;
}

/**
 *
 */
interface GeocoderAddressResponse {
    matchedAddress: string;
    coordinates: {
        x: string;
        y: string;
    };
    addressComponents: {
        fromAddress: string;
        toAddress: string;
        streetName: string;
        suffixType: string;
        city: string;
        state: string;
        zip: string;
    };
    geographies?: {
        [ResponseFields.censusBlocks]: Array<GeocoderCensusBlockResponse>;
    };
}

/**
 *
 */
export interface GeocoderResponse {
    result: {
        addressMatches: Array<GeocoderAddressResponse>;
    };
}

/**
 *
 */
class CensusBlock {
    tract: string;

    /**
     *
     * @param TRACT
     */
    constructor({ TRACT }: GeocoderCensusBlockResponse) {
        /**
         *
         */
        this.tract = TRACT;
    }
}

/**
 *
 */
class Address {
    matched: string;
    coordinates: {
        x: string;
        y: string;
    };
    address: {
        from: string;
        to: string;
        street: string;
        streetType: string;
        city: string;
        state: string;
        zip: string;
    };
    censusBlocks: CensusBlock[];

    /**
     *
     * @param address
     */
    constructor({ matchedAddress, coordinates, addressComponents, geographies }: GeocoderAddressResponse) {
        /**
         *
         */
        this.matched = matchedAddress;

        /**
         *
         */
        const { x, y } = coordinates;
        this.coordinates = { x,  y };

        /**
         *
         */
        const { fromAddress, toAddress, streetName, suffixType, city, state, zip } = addressComponents;
        this.address = {
            from: fromAddress,
            to: toAddress,
            street: streetName,
            streetType: suffixType,
            city,
            state,
            zip
        };

        /**
         *
         */
        this.censusBlocks = geographies?.[ResponseFields.censusBlocks]?.map(block => new CensusBlock(block)) ?? [];
    }
}

/**
 *
 */
export class GeocoderData {
    addresses: Address[];

    /**
     *
     * @param response
     */
    constructor(response: GeocoderResponse) {
        this.addresses = response?.result?.addressMatches?.map(address => new Address(address)) ?? [];
    }
}
