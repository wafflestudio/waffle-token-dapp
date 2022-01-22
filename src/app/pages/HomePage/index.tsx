import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import Header from 'app/components/Commons/Header';

export function HomePage() {
  const Account = styled.div`
    font-size: 1.5em;
    text-align: center;
    color: cornflowerblue;
  `;

  const Container = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const [account, setAccount] = useState<string>('');

  async function loadAccount() {
    // const web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545'); // local
    const web3 = new Web3(
      Web3.givenProvider ||
        'ws://https://ropsten.infura.io/v3/e5a2aa837b5b4b02b4a2a4acaa09e6ca',
    );
    const accounts = await web3.eth.requestAccounts();
    console.log(accounts);

    setAccount(accounts[0]);
  }

  async function loadBalance() {}

  useEffect(() => {
    loadAccount();
  }, []);

  return (
    <>
      <Helmet>
        <title>MainPage</title>
        <meta name="description" content="WaffleToken Main Page" />
      </Helmet>
      <Container>
        <Header />
        <Account draggable="true">your account is {account}</Account>
      </Container>
    </>
  );
}
