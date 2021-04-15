/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

import { name } from '../package.json';

addons.setConfig({
  theme: create({
    brandTitle: name,
    brandUrl: 'https://github.com/carbon-design-system/ibm-cloud-cognitive',
  }),
});
