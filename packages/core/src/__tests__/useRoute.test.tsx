import { render } from '@testing-library/react-native';
import * as React from 'react';

import BaseNavigationContainer from '../BaseNavigationContainer';
import Screen from '../Screen';
import type { RouteProp } from '../types';
import useNavigationBuilder from '../useNavigationBuilder';
import useRoute from '../useRoute';
import MockRouter, { MockRouterKey } from './__fixtures__/MockRouter';

beforeEach(() => {
  MockRouterKey.current = 0;
});

it('gets route prop from context', () => {
  expect.assertions(1);

  const TestNavigator = (props: any): any => {
    const { state, descriptors } = useNavigationBuilder(MockRouter, props);

    return state.routes.map((route) => descriptors[route.key].render());
  };

  const Test = () => {
    const route = useRoute<RouteProp<{ sample: { x: string } }, 'sample'>>();

    expect(route?.params?.x).toBe(1);

    return null;
  };

  render(
    <BaseNavigationContainer>
      <TestNavigator>
        <Screen name="foo" component={Test} initialParams={{ x: 1 }} />
      </TestNavigator>
    </BaseNavigationContainer>
  );
});
