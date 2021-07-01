//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

// Import portions of React that are needed.
import React, { useRef } from 'react';

// Other standard imports.
import PropTypes from 'prop-types';

// Carbon and package components we use.
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import uuidv4 from '../../global/js/utils/uuidv4';

// The block part of our conventional BEM class names (blockClass__E--M).
import { pkg } from '../../settings';
const blockClass = `${pkg.prefix}--action-bar-overflow-items`;
const componentName = 'ActionBar';

export const ActionBarOverflowItems = ({
  overflowItems,
  overflowAriaLabel,
}) => {
  const internalId = useRef(uuidv4());

  return (
    <OverflowMenu
      ariaLabel={overflowAriaLabel}
      className={`${blockClass}`}
      direction="bottom"
      flipped
      menuOptionsClass={`${blockClass}__options`}>
      {React.Children.map(overflowItems, (item) => {
        // This uses a copy of a menu item option
        // NOTE: Cannot use a real Tooltip icon below as it uses a <button /> the
        // div equivalent below is based on Carbon 10.25.0
        return (
          <OverflowMenuItem
            className={`${blockClass}__item`}
            itemText={
              <div
                className={`${blockClass}__item-content`}
                aria-describedby={`${internalId}--item-label`}>
                <span
                  className={`${blockClass}__item-label`}
                  id={`${internalId}--item-label`}>
                  {item.props.iconDescription}
                </span>
                <item.props.renderIcon />
              </div>
            }
          />
        );
      })}
    </OverflowMenu>
  );
};

ActionBarOverflowItems.displayName = componentName;

ActionBarOverflowItems.propTypes = {
  /**
   * overflowAriaLabel label for open close button overflow used for action bar items that do nto fit.
   */
  overflowAriaLabel: PropTypes.string,
  /**
   * overflowItems: items to bre shown in the ActionBar overflow menu
   */
  overflowItems: PropTypes.arrayOf(PropTypes.element),
};
