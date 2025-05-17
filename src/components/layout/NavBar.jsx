import Logo from '../common/Logo'

const NavBar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  )
}

export default NavBar