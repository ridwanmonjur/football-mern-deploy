import React from 'react';
import { Route } from 'react-router-dom';


import Home from './Home';
import Cart from './Cart';
import SignIn from './SignIn';
import CheckOut from './CheckOut';
import SignUp from './SignUp';
import Profile from './Profile';
import DescriptionPartTwo from './Description';
import JerseysPartTwo from './Listing';
import Purchases from './Purchases';

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
      <Route path="/checkOut">
        <CheckOut />
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
        <DescriptionPartTwo />
      </Route>
    </>

  )
}

export default Routes
