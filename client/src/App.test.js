import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import { App } from "./App";
import LandingPage from './components/LandingPage/LandingPage'
import Home from "./components/Home/Home";
import CreateActivity from "./components/CreateActivity/CreateActivity";
import CountryDetail from "./components/CountryDetail/CountryDetail";


configure({adapter: new Adapter()})
describe('App', () => {
    let store;
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    beforeEach(() => {
        store = mockStore([]);
    });

    describe('Debe renderizar los componentes en las rutas correspondientes', () => {
        it('LandingPage deberia renderizarse en la ruta /', () => {
            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/']}>
                        <App/>
                    </MemoryRouter>
                </Provider>
            )
            expect(wrapper.find(LandingPage)).toHaveLength(1)
        })
        it('Home deberia renderizarse en la ruta /home', () => {
            const wrapper = shallow(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/home']}>
                        <Home/>
                    </MemoryRouter>
                </Provider>
            )
            expect(wrapper.find(Home)).toHaveLength(1)
        })
        it('CreateActivity deberia renderizarse en la ruta /activity', () => {
            const wrapper = shallow(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/activity']}>
                        <CreateActivity/>
                    </MemoryRouter>
                </Provider>
            )
            expect(wrapper.find(CreateActivity)).toHaveLength(1)
        })
        // it('CountryDetail deberia renderizarse en la ruta /countries/:id', () => {
        //     const wrapper = shallow(
        //         <Provider store={store}>
        //             <MemoryRouter initialEntries={['/countries/:id']}>
        //                 <CountryDetail/>
        //             </MemoryRouter>
        //         </Provider>
        //     )
        //     expect(wrapper.find(CreateActivity)).toHaveLength(1)
        // })
    })
})