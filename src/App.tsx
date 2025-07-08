import React, { useState } from 'react';
import CustomerPortal from './components/CustomerPortal';
import OrdersView from './components/OrdersView';
import AccountView from './components/AccountView';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <CustomerPortal />
    </div>
  );
}

export default App;