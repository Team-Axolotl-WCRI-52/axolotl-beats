import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import LoginPage from '../client/components/LoginPage.jsx';
import 'jsdom-global/register';

const render = ReactDOM.render;
const puppeteer = require('puppeteer');

describe("React Testing", () => {
    let browser;
    let page;

    beforeAll(async () =>{
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    it('should be titled "Axolotl Beats"', async () => {
        await page.goto("http://localhost:8080");
        await expect(page.title()).resolves.toMatch('Axolotl Beats');
    })

    it("Login Button should be clickable", () => {
        const mockFn = jest.fn();
        const wrapper = mount(<LoginPage onClick={mockFn}/>)
        const button = wrapper.find('#login-btn');
        button.simulate('click');
        expect(mockFn).toHaveBeenCalledTimes(1)
    });
});



