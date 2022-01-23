import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';

import { Header } from 'app/components/Commons';
import { WAFFLE_TOKEN_ADDRESS, WAFFLE_TOKEN_ABI } from 'config';
import { WAFFLE_FLAVORS, WAFFLE_COLORS } from 'types';
import { useHistory } from 'react-router-dom';
import { useMainSlice } from './slice';
import { useDispatch } from 'react-redux';

export function MainPage() {
  const { actions } = useMainSlice();
  const dispatch = useDispatch();
  const history = useHistory();
  const [account, setAccount] = useState<string>('');
  const [waffleToken, setWaffleToken] = useState<Contract | null>(null);
  const [waffles, setWaffles] = useState<Waffle[]>([]);

  async function loadAccount() {
    const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545'); // local
    const accounts = await web3.eth.requestAccounts();
    // const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    return web3;
  }

  async function loadWaffles(web3: Web3) {
    const waffleTkn = new web3.eth.Contract(
      WAFFLE_TOKEN_ABI as AbiItem[],
      WAFFLE_TOKEN_ADDRESS,
    );
    setWaffleToken(waffleTkn);
    dispatch(actions.setContract(waffleTkn));
    // Then we get total number of contacts for iteration
    // TODO: 하드코딩된 부분 없애기 => 전체 토큰 개수 알 수 있는 method 필요
    for (let i = 0; i < 10; i++) {
      const wftk = await waffleTkn.methods.idToWaffle(3 * i).call();
      // add recently fetched contact to state variable.
      setWaffles(wftks => [...wftks, wftk]);
    }
  }

  useEffect(() => {
    async function load() {
      const w3 = await loadAccount();
      loadWaffles(w3);
    }
    load();
    return () => {
      setAccount('');
      setWaffles([]);
      setWaffleToken(null);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Waffle Tokens</title>
        <meta name="description" content="WaffleToken Main Page" />
      </Helmet>
      <Container>
        <Header />
        <Account draggable="true">your account is {account}</Account>
        <ListHeader>Waffle Tokens</ListHeader>
        <TokenList>
          {waffles.map((waffle, index) => (
            <TokenListRow
              key={`${waffle.name}-${index}`}
              onClick={e => {
                e.preventDefault();
                console.log(index);
                history.push(`/waffle/${index}`);
              }}
            >
              <H4 flavor={waffle.flavor}>{waffle.name}</H4>
              <Span flavor={waffle.flavor}>
                <B>Flavor: </B>
                {WAFFLE_FLAVORS[waffle.flavor]}
              </Span>
            </TokenListRow>
          ))}
        </TokenList>
      </Container>
    </>
  );
}

const Account = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: cornflowerblue;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListHeader = styled.h1`
  text-align: center;
  color: #705112;
`;

const TokenList = styled.ul`
  justify-content: center;
  align-item: center;
`;
const TokenListRow = styled.li`
  justify-content: center;
  cursor: pointer;
`;
const H4 = styled.h4<{ flavor: string }>`
  color: ${props => WAFFLE_COLORS[props.flavor]};
`;

const Span = styled.span<{ flavor: string }>`
  color: ${props => WAFFLE_COLORS[props.flavor]};
`;
const B = styled.b``;
