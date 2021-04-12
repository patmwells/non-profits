import React from 'react';

/**
 *
 */
export type IntroCard = typeof IntroCard;

/**
 *
 */
export interface Controller {
    onItemClick: (controller: Controller) => void;
}

/**
 *
 */
interface IntroCardProps {
    controller: Controller;
}

/**
 *
 */
export function IntroCard({ controller }: IntroCardProps): JSX.Element {

    /**
     *
     */
    function onClick(): void {
        controller.onItemClick(controller);
    }

    return <div onClick={onClick}>Hello IntroCard!</div>;
}
