//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';

import unwrapIfFragment from './unwrap-if-fragment';
import pconsole from './pconsole';

// helper functions for component props

/**
 * Prepare a set of props, or prop types or default props, merging values
 * from one or more sets and optionally blocking keys which should not be
 * passed. Returns the prepared set of props. Does not modify any of the
 * objects passed.
 *
 * @param {{} | '' | ['']} values One or more sets of keys and values to be
 * merged, or names of keys to be blocked. Each parameter that is an object is
 * treated as keys and values to be merged, and each parameter that is a string
 * or an array of strings is treated as keys to be blocked.
 *
 * Examples:
 *   const props = { a: 3, c: 4, d: 5 };
 *
 *   * prepareProps(props) -> { a: 3, c: 4, d: 5 }
 *   * prepareProps(props, 'c') -> { a: 3, d: 5 }
 *   * prepareProps(props, ['a', 'c', 'e']) -> { d: 5 }
 *
 *   * prepareProps({ a: 1, b: 2 }, props) -> { a: 3, b: 2, c: 4, d: 5 }
 *   * prepareProps({ a: 1, b: 2 }, props, ['a', 'c']) -> { b: 2, d: 5 }
 *
 *   * prepareProps(props, { c: 6 }) -> { a: 3, c: 6, d: 5 }
 *   * prepareProps(props, 'a', { c: 6 }) -> { c: 6, d: 5 }
 */
export const prepareProps = (...values) => {
  // Convert any string or array arg into an object with nulls as values
  const toNulls = (arg) =>
    typeof arg === 'string'
      ? { [arg]: null }
      : Array.isArray(arg)
      ? Object.fromEntries(arg.map((key) => [key, null]))
      : arg;

  // Merge all the args from left to right
  const merged = Object.assign({}, ...values.map(toNulls));

  // Now strip any keys whose final value is null
  return Object.entries(merged).reduce((result, [key, value]) => {
    if (value !== null) {
      result[key] = value;
    }
    return result;
  }, {});
};

// A simple wrapper for a prop-types checker that calls pConsoleFunction if
// the value being validated is not null/undefined. See definition of pConsole for
// message types e.g. log, warn, error.
const deprecatePropInner = (pConsoleFunction, message, validator, info) => {
  return (...args) => {
    // args = [props, propName, componentName, location, propFullName, ...]
    args[0][args[1]] &&
      pConsoleFunction(message(args[3], args[4] || args[1], args[2], info));
    return validator(...args);
  };
};

/**
 * A prop-types type checker that marks a particular usage of a prop as
 * deprecated. This can be used to deprecate an option in a oneOfType checker,
 * and the deprecated option(s) should be listed last so that the deprecation
 * message is only reported if none of the other type options is matched.
 * @param {} validator The prop-types validator for the prop usage as it should
 * be if it weren't deprecated. If this validator produces type checking
 * errors they will be reported as usual.
 * @param {*} additionalInfo One or more sentences to be appended to the
 * deprecation message to explain why the prop usage is deprecated and/or what
 * should be used instead.
 * @returns Any type checking error reported by the validator, or null.
 */
export const deprecatePropUsage = deprecatePropInner.bind(
  undefined,
  pconsole.warn,
  (location, propName, componentName, info) =>
    `The usage of the ${location} \`${propName}\` of \`${componentName}\` has been changed and support for the old usage will soon be removed. ${info}`
);

/**
 * A prop-types type checker that marks a prop as deprecated.
 * @param {} validator The prop-types validator for the prop as it should be
 * used if it weren't deprecated. If this validator produces type checking
 * errors they will be reported as usual.
 * @param {*} additionalInfo One or more sentences to be appended to the
 * deprecation message to explain why the prop is deprecated and/or what should
 * be used instead.
 * @returns Any type checking error reported by the validator, or null.
 */
export const deprecateProp = deprecatePropInner.bind(
  undefined,
  pconsole.warn,
  (location, propName, componentName, info) =>
    `The ${location} \`${propName}\` of \`${componentName}\` has been deprecated and will soon be removed. ${info}`
);

/**
 * A prop-types type checker that marks a prop as deprecated.
 * @param {} validator The prop-types validator for the prop as it should be
 * used if it weren't deprecated. If this validator produces type checking
 * errors they will be reported as usual.
 * @param {*} additionalInfo One or more sentences to be appended to the
 * deprecation message to explain why the prop is deprecated and/or what should
 * be used instead.
 * @returns Any type checking error reported by the validator, or null.
 */
export const deprecatedProp = deprecatePropInner.bind(
  undefined,
  pconsole.error,
  (location, propName, componentName, info) =>
    `The ${location} \`${propName}\` of \`${componentName}\` has been deprecated and will soon be removed. ${info}`
);

/**
 * Takes items as fragment, node or array
 * @param {node || array} items - which may have shape to extract
 * @returns Array of items
 */
export const extractShapesArray = (items) => {
  // unwrap if items or the first index looks like a React element or fragment
  if (
    items &&
    (items?.[0]?.props ||
      items?.[0]?.type === React.Fragment ||
      items.type === React.Fragment)
  ) {
    return unwrapIfFragment(items).map((item) => ({ ...item.props }));
  }

  return Array.isArray(items) ? items : [];
};

/**
 * A prop-types validation function that takes an array of type checkers and
 * requires prop values to satisfy all of the type checkers. This can be useful
 * to combine custom validation functions with regular prop types, or for
 * combining inherited prop-types from another component with tighter
 * requirements.
 *
 * Examples:
 *
 * MyComponent.propTypes = {
 *
 *   foo: allPropTypes([
 *     customValidationFunction,
 *     PropTypes.arrayOf(
 *       PropTypes.shape({
 *         text: PropType.string
 *       })
 *     )
 *   ]),
 *
 *   kind: allPropTypes([
 *     Button.propTypes.kind,
 *     PropTypes.oneOf('primary', 'secondary')
 *   ]),
 *
 * }
 */
export const allPropTypes = pconsole.shimIfProduction((arrayOfTypeCheckers) => {
  if (!Array.isArray(arrayOfTypeCheckers)) {
    pconsole.error(
      'Warning: Invalid argument supplied to allPropTypes, expected an instance of array.'
    );
    return pconsole.noop;
  }

  for (let i = 0; i < arrayOfTypeCheckers.length; i++) {
    if (typeof arrayOfTypeCheckers[i] !== 'function') {
      pconsole.error(
        `Invalid argument supplied to allPropTypes. Expected an array of check functions, but received ${arrayOfTypeCheckers[i]} at index ${i}.`
      );
      return pconsole.noop;
    }
  }

  const checkType = (...args) => {
    let error = null;
    arrayOfTypeCheckers.some((checker) => (error = checker(...args)));
    return error;
  };

  checkType.isRequired = (props, propName, comp, loc, propFullName, secret) => {
    const prop = propFullName || propName;
    return props[prop] == null
      ? new Error(
          `The ${loc} \`${prop}\` is marked as required in \`${
            comp || '<<anonymous>>'
          }\`, but its value is \`${
            props[prop] === null ? 'null' : 'undefined'
          }\`.`
        )
      : checkType(props, prop, comp, loc, propFullName, secret);
  };

  return checkType;
});
