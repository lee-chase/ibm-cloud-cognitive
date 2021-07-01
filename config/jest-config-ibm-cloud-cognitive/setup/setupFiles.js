/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { pkg } from '../../../packages/cloud-cognitive/src/settings';

pkg._silenceWarnings(true);
pkg.setAllComponents(true);

global.__DEV__ = true;

global.requestAnimationFrame = function requestAnimationFrame(callback) {
  // TODO: replace with async version
  // setTimeout(callback);
  callback();
};

const enzyme = jest.requireActual('enzyme');
const Adapter = jest.requireActual('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

if (global.HTMLElement) {
  // This is a quirk that we need to bring in due to how our `tabbable` dependency
  // determines what nodes are focusable. Without this override, it's unable to
  // determine whether or not things are visible in JSDOM. With it, we get
  // expected tab order from the document.
  Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
    get() {
      return this.parentNode;
    },
  });

  // After carbon-react 7.20, the Tabs/Tab component added certain scrolling
  // behavior, which does not work in JSDOM for testing. It was suggested (by Josh Black) to mock this behavior
  // explicitly for `scrollIntoView` via our jest setup.
  Element.prototype.scrollIntoView = jest.fn();
}

// jsdom does not support the second argument to getComputedStyle, but some
// components use it, so mock it to just use the first arument and return the
// computed style for that regardless of a pseudoelement being supplied
const oldGetComputedStyle = global.getComputedStyle;
global.getComputedStyle = jest.fn((elt) => oldGetComputedStyle(elt));
