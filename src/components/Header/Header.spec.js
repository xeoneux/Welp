import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'

import Header from './Header'
import styles from './styles.module.css'

describe('<Header />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Header />);
    });

    it('contains a title component with welp', () => {
        expect(wrapper.find('h1').first().text())
            .to.equal('Welp');
    });

    it('contains topbar styling', () => {
        expect(wrapper.find(`.${styles.topbar}`))
            .to.have.length(1);
    });

    it('contains a section menu with the title', () => {
        expect(wrapper.find('section').first().text())
            .to.equal('Places');
    });
});
