import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';

import Header from 'app/components/Commons/Header';
import { WAFFLE_TOKEN_ADDRESS, WAFFLE_TOKEN_ABI } from 'config';
import { WAFFLE_FLAVORS } from 'types';
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
  const [waffleToken, setWaffleToken] = useState<Contract>();
  const [waffles, setWaffles] = useState<Waffle[]>([]);

  async function loadAccount() {
    const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545'); // local
    const accounts = await web3.eth.requestAccounts();
    // const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  async function loadWaffles() {
    const web3 = new Web3(Web3.givenProvider || 'ws:/http://localhost:8545');
    const waffleTkn = new web3.eth.Contract(
      WAFFLE_TOKEN_ABI as AbiItem[],
      WAFFLE_TOKEN_ADDRESS,
    );
    setWaffleToken(waffleTkn);
    // Then we get total number of contacts for iteration
    // TODO: 하드코딩된 부분 없애기 => 전체 토큰 개수 알 수 있는 method 필요
    for (let i = 0; i < 10; i++) {
      const wftk = await waffleTkn.methods.idToWaffle(3 * i).call();
      console.log(wftk);
      // add recently fetched contact to state variable.
      setWaffles(wftks => [...wftks, wftk]);
    }
  }

  useEffect(() => {
    loadAccount();
    loadWaffles();
  }, []);

  const getFlavor = (flavor: string) => {
    const f: WAFFLE_FLAVOR = WAFFLE_FLAVORS[flavor];
    return f;
  };

  return (
    <>
      <Helmet>
        <title>MainPage</title>
        <meta name="description" content="WaffleToken Main Page" />
      </Helmet>
      <Container>
        <Header />
        <Account draggable="true">your account is {account}</Account>
        <h1>Waffle Tokens</h1>
        <ul>
          {waffles.map((waffle, index) => (
            <li key={`${waffle.name}-${index}`}>
              <h4>{waffle.name}</h4>
              <span>
                <b>Flavor: </b>
                {WAFFLE_FLAVORS[waffle.flavor]}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
