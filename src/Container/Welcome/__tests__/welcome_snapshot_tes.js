import React from 'react';
import Welcome from '../Welcome';

import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const tree = renderer.create(<Welcome />).toJSON();
    expect(tree).toMatchSnapshot();
});
