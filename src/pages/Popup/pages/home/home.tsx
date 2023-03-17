import React, { useCallback, useEffect } from 'react';
import {
  DataRequest,
  ZkConnect,
  ZkConnectClientConfig,
  ZkConnectResponse,
} from '@sismo-core/zk-connect-client';
import { ethers } from 'ethers';
import {
  getAccountEVMData,
  getAccountInfo,
  getActiveAccount,
} from '../../../Background/redux-slices/selectors/accountSelectors';
import {
  useBackgroundDispatch,
  useBackgroundSelector,
} from '../../../App/hooks';
import { useNavigate } from 'react-router-dom';


const zkConnectConfig: ZkConnectClientConfig = {
  // you will need to register an appId in the Factory
  appId: '0xc80efc569984bdcf3bb6cbd00c6cae97',
  devMode: {
    enabled: true,
  },
};

// create a new ZkConnect instance with the client configuration
const zkConnect = ZkConnect(zkConnectConfig);

const Home = () => {
  const navigate = useNavigate();
  const activeAccount = useBackgroundSelector(getActiveAccount);
  const openExpandedView = useCallback(() => {
    const url = chrome.runtime.getURL('app.html');
    chrome.tabs.create({
      url,
    });
  }, []);

  useEffect(() => {
    const zkConnectResponse = zkConnect.getResponse();
    console.log("zkConnectResponse", zkConnectResponse);
    if(zkConnectResponse) {
      const success = async () => {
        console.log('did we come here?', window.ethereum);
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [
              {
                from: activeAccount,
                to: "0x7d6703218ab83D5255e4532101deB294eA1b9d27",
                data: '0x',
                value: ethers.utils.parseEther('0.01'),
              },
            ],
          });
          console.log(txHash);
        }
        navigate("/sign-transaction")
      }
      success();
    } else {
      openExpandedView();
      window.close();
    }
  }, [openExpandedView]);

  return <div>Home</div>;
};

export default Home;
