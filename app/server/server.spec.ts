import express from 'express';
import { request, expect } from '../test/chai';
import { create, configure } from './server';

describe('Server Specification', () => {
    const app = configure(express(), create());

    it('should return 404 for the /favicon.ico route', () => {
        return request(app)
            .get('/favicon.ico')
            .then((response) => {
                expect(response).to.have.status(404);
            });
    });

    it('should return 200 for the / route', () => {
        return request(app)
            .get('/')
            .then((response) => {
                expect(response).to.have.status(200);
            });
    });
});