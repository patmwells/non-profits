/* eslint-disable @typescript-eslint/no-empty-function */

/**
 *
 */
export interface Utils {
    noop: typeof noop;
}

/**
 *
 */
function noop(): void {}

/**
 *
 */
export const Utils: Utils = {
    noop
};
