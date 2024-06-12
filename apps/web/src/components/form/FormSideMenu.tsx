import NavigationSideMenu, {
  NavigationSideMenuProps,
} from '@app/ui/components/NavigationSideMenu'

const FormSideMenu = ({ ...sidemenuProps }: NavigationSideMenuProps) => (
  <NavigationSideMenu
    classes={{
      root: 'fr-p-0 fr-pt-4v',
      // inner: styles.menuInner,
      // item: styles.menuItem,
      // link: styles.menuLink,
    }}
    sticky
    {...sidemenuProps}
  />
)

export default FormSideMenu
