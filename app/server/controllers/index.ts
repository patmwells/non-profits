import type { Request, Response } from 'express';
import type { Config } from '../config';

/**
 *
 * @param req
 * @param res
 */
export function favicon(req: Request, res: Response): void {
    res.status(404);
    res.end();
}

/**
 *
 * @param config
 */
export function render(config: Config): (req: Request, res: Response) => void {

    /**
     *
     * @param req
     * @param res
     */
    function controller(req: Request, res: Response): void {
        const html = config.getPageHTML(config);

        res.status(200);
        res.write(html);
        res.end();
    }

    return controller;
}