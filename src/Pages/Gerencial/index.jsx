import React, { Fragment, useContext } from 'react'
import Footer from '../../Components/Footer'
import TopBar from '../../Components/TopBar'
import { AuthContext } from '../../contexts/auth';

const Gerencial = () => {
const {user, logout } = useContext(AuthContext);
  return (
      <Fragment>
          <TopBar user={user} logout={logout} />
          <div className="flex flex-col flex-grow px-2">
              <div>Gerencial</div>
          </div>
          
          <Footer/>
      </Fragment>
    
  )
}

export default Gerencial