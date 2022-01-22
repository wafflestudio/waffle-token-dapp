import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

import { Helmet } from 'react-helmet-async';

export function HomePage() {
  const [account, setAccount] = useState<string>(''); // state variable to set account.

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
      const accounts = await web3.eth.requestAccounts();

      setAccount(accounts[0]);
    }

    load();
  }, []);

  return (
    <>
      <Helmet>
        <title>MainPage</title>
        <meta name="description" content="WaffleToken Main Page" />
      </Helmet>
      <span>My HomePage</span>
    </>
  );
}
