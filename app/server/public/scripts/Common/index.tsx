import { Controller, BaseProps } from './Controller';
import { Components } from './Components';
import { Utils } from './Utils';

/**
 *
 */
interface Common {
    Components: Components;
    Utils: Utils;
}

const Common: Common = {
    Components,
    Utils
};

export {
    Controller,
    BaseProps,
    Common
};
