/**
 * src/components/Container.jsx
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 16.09.2016
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Container from '../containers/Container';

function Badge(props)
{
  if (!props.counter) return (null);

  let classBadge = 'metismenu-badge';
  let classModif = props.counter > 5 ? ' is-big' : ' is-small';
  return  (<span className={classBadge + classModif}>
    {props.counter}
  </span>);
}



const Item = ({
  id,
  icon,
  label,
  to,
  counter,
  externalLink,
  hasSubMenu,
  active,
  hasActiveChild,
  subMenuVisibility,
  toggleSubMenu,
  activateMe,
  reduxStoreName,
  reduxUid,
}, {
  classStore,
  LinkComponent,
}) => (
  <li
    className={classnames(
      classStore.classItem,
      active && classStore.classItemActive,
      hasActiveChild && classStore.classItemHasActiveChild,
      (hasSubMenu && subMenuVisibility) && classStore.classItemHasVisibleChild,
    )}
  >
    <LinkComponent
      className={classStore.classLink}
      classNameActive={classStore.classLinkActive}
      classNameHasActiveChild={classStore.classLinkHasActiveChild}
      active={active}
      hasActiveChild={hasActiveChild}
      id={id}
      to={to}
      label={label}
      counter={counter}
      externalLink={externalLink}
      hasSubMenu={hasSubMenu}
      toggleSubMenu={toggleSubMenu}
      activateMe={activateMe}
    >
      <i className={classnames(classStore.classIcon, classStore.iconNamePrefix + icon)} />
      {label}
      <Badge counter={counter}/>
      {hasSubMenu && <i
        className={classnames(
          classStore.classStateIcon,
          classStore.iconNamePrefix + (
            subMenuVisibility
              ? classStore.iconNameStateVisible
              : classStore.iconNameStateHidden
          ),
        )}
      />}
    </LinkComponent>
    {hasSubMenu && <Container
      itemId={id}
      visible={subMenuVisibility}
      reduxStoreName={reduxStoreName}
      reduxUid={reduxUid}
    />}
  </li>
);

Item.defaultProps = {
  icon: '',
  label: '',
  to: null,
  externalLink: false,
  toggleSubMenu: null,
  counter: 0
};

Item.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  icon: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
  ]),
  to: PropTypes.string,
  counter: PropTypes.number,
  externalLink: PropTypes.bool,
  hasSubMenu: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  hasActiveChild: PropTypes.bool.isRequired,
  subMenuVisibility: PropTypes.bool.isRequired,
  toggleSubMenu: PropTypes.func,
  activateMe: PropTypes.func.isRequired,
  reduxStoreName: PropTypes.string.isRequired,
  reduxUid: PropTypes.number.isRequired,
};

Item.contextTypes = {
  classStore: PropTypes.object.isRequired,
  LinkComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
};

export default Item;
