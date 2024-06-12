'use client'

import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import { useNavigationSideMenu } from '@app/ui/hooks/useNavigationSideMenu'

/**
 * This component is a wrapper around the SideMenu component from DSFR.
 * It adds the active state to the items of the menu depending on scroll position.
 * This will use all the side menu items with an href starting with # to compute the active item
 */

const isItemActive = (activeHref: string, item: SideMenuProps.Item) =>
  'linkProps' in item && item.linkProps?.href === activeHref

const addActiveStateToItems = (
  items: SideMenuProps.Item[],
  activeHref?: string | null,
  isFirstRecursion = true,
): SideMenuProps.Item[] =>
  items.map((item, index) => {
    // Sub menu
    if ('items' in item) {
      return {
        expandedByDefault: activeHref
          ? item.items.some((subItem) => isItemActive(activeHref, subItem))
          : index === 0,
        ...item,
        items: addActiveStateToItems(item.items, activeHref, index === 0),
      }
    }

    return {
      ...item,
      isActive: activeHref
        ? isItemActive(activeHref, item)
        : index === 0 && isFirstRecursion,
    }
  })

export type NavigationSideMenuProps = {
  className?: string
  contentId: string
} & Omit<SideMenuProps, 'id'>

const NavigationSideMenu = ({
  contentId,
  items,
  ...sideMenuProps
}: NavigationSideMenuProps) => {
  const { activeHref } = useNavigationSideMenu({
    contentId,
    items,
  })

  return (
    <SideMenu
      {...sideMenuProps}
      items={addActiveStateToItems(items, activeHref)}
    />
  )
}

export default NavigationSideMenu
