//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import { TagSetOverflow } from './TagSetOverflow';
import { TagSetModal } from './TagSetModal';
import { Tag } from 'carbon-components-react';
import ReactResizeDetector from 'react-resize-detector';

import { pkg } from '../../settings';
import {
  deprecatedProp,
  prepareProps,
} from '../../global/js/utils/props-helper';
const componentName = 'TagSet';
const blockClass = `${pkg.prefix}--tag-set`;

const allTagsModalSearchThreshold = 10;

export let TagSet = React.forwardRef(
  (
    {
      className,
      maxVisible,
      rightAlign,
      overflowAlign,
      overflowClassName,
      overflowDirection,
      allTagsModalTile,
      allTagsModalSearchLabel,
      allTagsModalSearchPlaceholderText,
      showAllTagsLabel,
      tags,
      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    const [displayCount, setDisplayCount] = useState(3);
    const [displayedTags, setDisplayedTags] = useState([]);
    const [hiddenSizingTags, setHiddenSizingTags] = useState([]);
    const [showAllModalOpen, setShowAllModalOpen] = useState(false);
    const localTagSetRef = useRef(null);
    const tagSetRef = ref || localTagSetRef;
    const displayedArea = useRef(null);
    const [sizingTags, setSizingTags] = useState([]);
    const overflowTag = useRef(null);

    const handleShowAllClick = () => {
      setShowAllModalOpen(true);
    };

    useEffect(() => {
      const newSizingTags = [];
      // create sizing tags
      setHiddenSizingTags(
        tags && tags.length > 0
          ? tags.map(({ label, ...other }, index) => {
              return (
                <div
                  key={index}
                  className={`${blockClass}__sizing-tag`}
                  ref={(el) => (newSizingTags[index] = el)}>
                  <Tag {...other} filter={false}>
                    {label}
                  </Tag>
                </div>
              );
            })
          : []
      );
      setSizingTags(newSizingTags);
    }, [tags]);

    useEffect(() => {
      // create visible and overflow tags
      let newDisplayedTags =
        tags && tags.length > 0
          ? tags.map(({ label, ...other }, index) => (
              <Tag {...other} filter={false} key={`displayed-tag-${index}`}>
                {label}
              </Tag>
            ))
          : [];

      // separate out tags for the overflow
      const newOverflowTags = newDisplayedTags.splice(
        displayCount,
        newDisplayedTags.length - displayCount
      );

      // add wrapper around displayed tags
      newDisplayedTags = newDisplayedTags.map((tag, index) => (
        <div key={index} className={`${blockClass}__displayed-tag`}>
          {tag}
        </div>
      ));

      newDisplayedTags.push(
        <TagSetOverflow
          allTagsModalSearchThreshold={allTagsModalSearchThreshold}
          className={overflowClassName}
          onShowAllClick={handleShowAllClick}
          overflowTags={newOverflowTags}
          overflowAlign={overflowAlign}
          overflowDirection={overflowDirection}
          showAllTagsLabel={showAllTagsLabel}
          key="displayed-tag-overflow"
          ref={overflowTag}
        />
      );

      setDisplayedTags(newDisplayedTags);
    }, [
      displayCount,
      overflowAlign,
      overflowClassName,
      overflowDirection,
      showAllTagsLabel,
      tags,
    ]);

    const checkFullyVisibleTags = useCallback(() => {
      // how many will fit?
      let willFit = 0;

      if (sizingTags.length > 0) {
        let spaceAvailable = tagSetRef.current.offsetWidth;

        for (let i in sizingTags) {
          const tagWidth = sizingTags[i].offsetWidth;

          if (spaceAvailable >= tagWidth) {
            spaceAvailable -= tagWidth;
            willFit += 1;
          } else {
            break;
          }
        }

        if (willFit < sizingTags.length) {
          while (
            willFit > 0 &&
            spaceAvailable < overflowTag.current.offsetWidth
          ) {
            // Highly unlikely any useful tag is smaller
            willFit -= 1; // remove one tag
            spaceAvailable += sizingTags[willFit].offsetWidth;
          }
        }
      }

      if (willFit < 1) {
        setDisplayCount(0);
      } else {
        setDisplayCount(maxVisible ? Math.min(willFit, maxVisible) : willFit);
      }
    }, [maxVisible, sizingTags, tagSetRef]);

    useEffect(() => {
      checkFullyVisibleTags();
    }, [checkFullyVisibleTags, maxVisible, sizingTags]);

    /* don't know how to test resize */
    /* istanbul ignore next */
    const handleResize = () => {
      /* istanbul ignore next */ // not sure how to test resize
      checkFullyVisibleTags();
    };

    /* don't know how to test resize */
    /* istanbul ignore next */
    const handleSizerTagsResize = () => {
      /* istanbul ignore next */ // not sure how to test resize
      checkFullyVisibleTags();
    };

    const handleModalClose = () => {
      setShowAllModalOpen(false);
    };

    return (
      <ReactResizeDetector onResize={handleResize}>
        <div {...rest} className={cx([blockClass, className])} ref={tagSetRef}>
          <div
            className={cx([
              `${blockClass}__space`,
              { [`${blockClass}__space--right`]: rightAlign },
            ])}>
            <ReactResizeDetector onResize={handleSizerTagsResize}>
              <div
                className={`${blockClass}__tag-container ${blockClass}__tag-container--hidden`}
                aria-hidden={true}>
                {hiddenSizingTags}
              </div>
            </ReactResizeDetector>

            <div className={`${blockClass}__tag-container`} ref={displayedArea}>
              {displayedTags}
            </div>
          </div>

          {tags && displayCount < tags.length ? (
            <TagSetModal
              allTags={tags}
              open={showAllModalOpen}
              title={allTagsModalTile}
              onClose={handleModalClose}
              searchLabel={allTagsModalSearchLabel}
              searchPlaceholder={allTagsModalSearchPlaceholderText}
            />
          ) : null}
        </div>
      </ReactResizeDetector>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag
TagSet = pkg.checkComponentEnabled(TagSet, componentName);

/**
 * The strings shown in the showAllModal are only shown if we have more than allTagsModalSearchLThreshold
 * @returns null if no problems
 */
const string_required_if_more_than_10_tags = (
  props,
  propName,
  componentName,
  location,
  propFullName,
  secret
) => {
  const tags = props['tags'];

  if (tags && tags.length > allTagsModalSearchThreshold) {
    const error = PropTypes.string.isRequired(
      props,
      propName,
      componentName,
      location,
      propFullName,
      secret
    );

    if (error) {
      return error;
    }
  }

  return null;
};

TagSet.propTypes = {
  /**
   * label text for the show all search. **Note: Required if more than 10 tags**
   */
  allTagsModalSearchLabel: string_required_if_more_than_10_tags,
  /**
   * placeholder text for the show all search. **Note: Required if more than 10 tags**
   */
  allTagsModalSearchPlaceholderText: string_required_if_more_than_10_tags,
  /**
   * title for the show all modal. **Note: Required if more than 10 tags**
   */
  allTagsModalTile: string_required_if_more_than_10_tags,
  /**
   * children: **deprecated** use `tags`
   */
  children: deprecatedProp(
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
    'See documentation on the `tags` prop.'
  ),
  /**
   * className
   */
  className: PropTypes.string,
  /**
   * maximum visible tags
   */
  maxVisible: PropTypes.number,
  /**
   * overflowAlign from the standard tooltip
   */
  overflowAlign: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * overflowClassName for the tooltip popup
   */
  overflowClassName: PropTypes.string,
  /**
   * overflowDirection from the standard tooltip
   */
  overflowDirection: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /**
   * align tags to right of available space
   */
  rightAlign: PropTypes.bool,
  /**
   * label for the overflow show all tags link. **Note: Required if more than 10 tags**
   */
  showAllTagsLabel: string_required_if_more_than_10_tags,
  /**
   * An array of Carbon objects containing Carbon Tag properties plus 'label'. NOTE: 'filter' is not ignored.
   */
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      ...prepareProps(Tag.propTypes, 'filter'),
      label: PropTypes.string.isRequired,
    })
  ),
};

TagSet.defaultProps = {
  overflowAlign: 'center',
  overflowDirection: 'bottom',
};

TagSet.displayName = componentName;

export default TagSet;
