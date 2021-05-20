import React, { Suspense } from "react";
import { isMobile, isTablet } from 'react-device-detect';

import PcRouter from './PcRouter';
import MobileRouter from './MobileRouter';

const routing = () => {
  if (isMobile && !isTablet) {
    return <MobileRouter />
  }
  return <PcRouter />
}

const Router = () => {
  return (
      <Suspense>
        {routing()}
      </Suspense>
  );
};

export default Router