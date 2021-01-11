import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import User from './User'
import Signout from './Signout'
import Signin from './Signin'
const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <div style={{ float: 'right' }}>
          {' '}
          {!me && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {' '}
              <Link href="/signup"> Sign up</Link> /
              <Link href="/signin"> Sign in</Link>{' '}
            </div>
          )}
        </div>

        {me && (
          <>
            <div> {me.name}</div>
            <Signout />
          </>
        )}
      </NavStyles>
    )}
  </User>
)

export default Nav
