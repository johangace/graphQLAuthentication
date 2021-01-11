import Link from 'next/link'
import PleaseSignIn from '../components/PleaseSignIn'
import User from '../components/User'
import Title from '../components/styles/Title'
const Home = (props) => (
  <div>
    <PleaseSignIn>
      {' '}
      <User>
        {({ data: { me } }) => (
          <div>
            {me && (
              <div key={me.id}>
                <Title>Profile </Title>
                <div>
                  {' '}
                  <img src={me.image} alt={me.name} />{' '}
                </div>
                <div> Email: {me.email} </div>
                <div> Name: {me.name} </div>
                <div> Password: {me.password}</div>
              </div>
            )}
          </div>
        )}
      </User>
    </PleaseSignIn>
  </div>
)

export default Home
