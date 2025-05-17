import Logo from '../common/Logo'
import Search from '../common/Search'
import NumResults from '../common/NumResults'

const NavBar = ({ movies }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults movies={movies} />
    </nav>
  )
}

export default NavBar