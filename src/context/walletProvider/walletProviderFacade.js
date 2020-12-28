import React, { useContext, useState, useEffect } from "react";
import { UALContext, UALProvider } from "ual-reactjs-renderer";
import {
  appName,
  supportedAuthenticators,
  supportedChains,
} from "../../utils/UalProvider";

export const WallerProviderContext = React.createContext(null);

/**
 * WalletProvider Proxies the local wallet provider or the parent's
 * @param children
 * @returns {*}
 * @constructor
 */
export const WalletProvider = ({ children }) => {

  let authContext = useContext(UALContext);

  const [walletState, setWalletState] = useState({
    // eslint-disable-next-line react/no-unused-state
    activeUser: authContext.activeUser,
    // eslint-disable-next-line react/no-unused-state
    showModal: () => {
      authContext.showModal();
    },
    // eslint-disable-next-line react/no-unused-state
    logout: () => authContext.logout(),
    tweaker: 0,
  });

  /**
   * when user is logged in/out update the provider's state
   */
  useEffect(() => {
    setWalletState({
      ...walletState,
      activeUser: authContext.activeUser,
      tweaker: walletState.tweaker + 1,
    });
  }, [authContext.activeUser]);

  return (
    <WallerProviderContext.Provider value={walletState}>
      {children}
    </WallerProviderContext.Provider>
  );
};

/**
 * if in an iframe then use parent wallet provider otherwise use local
 * @param children
 * @returns {*}
 * @constructor
 */
export const UALProviderSwitch = ({ children }) => {
  return (
      <UALProvider
          chains={supportedChains}
          authenticators={supportedAuthenticators}
          appName={appName}
      >
        {children}
      </UALProvider>
  );
};
