import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import Cart from './Cart';
import SignIn from './SignIn';
import CheckOutConfirm from './CheckOutConfirm';
import SignUp from './SignUp';
import Profile from './Profile';
import Listing from './Listing';
import Purchases from './Purchases';
import DescriptionPage from './Description';
import { useSelector } from 'react-redux';
import { selectProfileDetails } from '../redux/slices/ProfileSlice';
import { Manage } from './Manage';
import ProfileView from './ProfileView';
function Routes() {
  const user = useSelector(selectProfileDetails);

  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      {
        user?.role === "customer" &&
        <>
          <Route path="/purchases">
            <Purchases />
          </Route>
          <Route path="/confirmCheckOut">
            <CheckOutConfirm />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </>
      }
      {
        user?.role === "seller" &&
        <>
          <Route path="/manage">
            <Manage />
          </Route>
        </>
      }
      <Route path="/signIn">
        <SignIn />
      </Route>
      <Route path="/signUp">
        <SignUp />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/profile/:userId">
        <ProfileView />
      </Route>
      <Route exact path="/products/:productName">
        <Listing />
      </Route>
      <Route path="/products/:productName/:userId">
        <DescriptionPage />
      </Route>
    </>

  )
}

export default Routes
