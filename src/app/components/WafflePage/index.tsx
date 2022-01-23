/**
 *
 * WafflePage
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Header } from 'app/components/Commons';

interface Props {}

export const WafflePage = memo((props: Props) => {
  return (
    <Div>
      <Header />
      Waffle !
    </Div>
  );
});

const Div = styled.div``;
