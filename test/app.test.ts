/* import { LoadInfo } from '../src/robotMethods';
const request = require('supertest');

const baseUrl = 'http://localhost:5000';
// src: https://www.makeuseof.com/express-apis-jest-test/ ?
// src: https://attacomsian.com/blog/node-make-http-requests ?
describe("POST /api/robots/closest", () => {
    const validRequest : LoadInfo = {loadId: "validLoad", x: 100, y: 100};
    const requestString = JSON.stringify(validRequest);

    it("Should return 200", async () => {
        const response = await request(baseUrl).post("/api/robots/closest").send(validRequest);
        expect(response.status).toBe(200);
    });

}) */

/* test('Can POST to specs URL', () => {
    fail();
});

test('Gracefully handles invalid request', () => {
    fail();
});

test('Gracefully handles not being able to retrieve list of robots', () => {
    fail();
}); */
