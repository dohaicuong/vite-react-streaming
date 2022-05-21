import { Link, Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to='/'>
        Home
      </Link>
      {' '}
      <Link to='/posts'>
        Posts
      </Link>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
