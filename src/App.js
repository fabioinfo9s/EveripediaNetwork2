import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UseWalletProvider } from "use-wallet";

import Error from "./features/error";
import Loading from "./features/loading";
import ErrorBoundary from "./components/errorBoundary";
import useGoogleAnalytics from "./hooks/useGoogleAnalytics";
import {
  UALProviderSwitch,
  WalletProvider
} from "./context/walletProvider/walletProviderFacade";
import { WrongChainContext } from "./context/wrongChainContext";
import {
  ethChainId,
  fortmaticApiKey,
  portisId,
  walletConnectRpcUrl,
  walletLinkUrl
} from "./config";

const HomePage = lazy(() => import("./features/home"));
const EthPage = lazy(() => import("./features/eth"));
const ReverseEthPage = lazy(() => import("./features/reverseEth"));
const LockPage = lazy(() => import("./features/Lock/lock"));
const VotingPage = lazy(() => import("./features/Voting/voting"));
const StatsPage = lazy(() => import("./features/Stats/stats"));

function App() {
  const [openWrongChainModal, setOpenWrongChainModal] = useState(false);

  const wrongChainCtx = {
    openWrongChainModal,
    setOpenWrongChainModal
  };
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <UseWalletProvider
          chainId={ethChainId} // 5 GOERLI
          connectors={{
            fortmatic: { apiKey: fortmaticApiKey },
            portis: { dAppId: portisId },
            walletconnect: { rpcUrl: walletConnectRpcUrl },
            walletlink: { url: walletLinkUrl }
          }}
        >
          <UALProviderSwitch>
            <WalletProvider>
              <WrongChainContext.Provider value={wrongChainCtx}>
                <Router>
                  <Routes />
                </Router>
              </WrongChainContext.Provider>
            </WalletProvider>
          </UALProviderSwitch>
        </UseWalletProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

const Routes = () => {
  useGoogleAnalytics();
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/eth" component={EthPage} />
      <Route exact path="/lock" component={LockPage} />
      <Route exact path="/reverseEth" component={ReverseEthPage} />
      <Route exact path="/voting" component={VotingPage} />
      <Route exact path="/stats" component={StatsPage} />
    </Switch>
  );
};

export default App;
