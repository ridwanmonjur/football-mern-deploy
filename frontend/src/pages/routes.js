import React, {useEffect} from 'react';
import { Route, useHistory, useParams } from 'react-router-dom';

import Home from './Home';
import Cart from './Cart';
import SignIn from './SignIn';
import CheckOutConfirm from './CheckOutConfirm';
import SignUp from './SignUp';
import Profile from './Profile';
import JerseysPartTwo from './Listing';
import Purchases from './Purchases';
import DescriptionPage from './Description';
function Routes() {
  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/purchases">
        <Purchases />
      </Route>
      <Route path="/confirmCheckOut">
        <CheckOutConfirm />
      </Route>
      <Route path="/signIn">
        <SignIn />
      </Route>
      <Route path="/signUp">
        <SignUp />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route exact path="/products/:productName">
        <JerseysPartTwo />
      </Route>
      <Route path="/products/:productName/:userId">
        <DescriptionPage/>
      </Route>
    </>

  )
}

export default Routes
