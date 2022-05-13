import React, { memo, useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Alert
} from "react-bootstrap";
import { ArrowDownShort, QuestionCircle } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useWallet } from "use-wallet";

import LockPeriod from "./lockPeriod";
import LockHeader from "./lockHeader";
import Layout from "../../components/layouts/layout";
import SwapContainer from "../../components/ui/swapContainer";
import CardTitle from "../../components/ui/cardTitle";
import InfoAlert from "../../components/ui/infoAlert";
import {
  getTokensUserBalanceLocked,
  increaseAmount,
  withdraw,
  getLockedEnd,
  lockTokensTx
} from "../../utils/EthDataProvider/EthDataProvider";
import InfoSwapCard from "../../components/ui/infoSwapCard";
import { TransactionContext } from "../../context/transactionContext";

const HeaderText = styled.div`
  background-color: #f7f7f9;
`;

const IconWrapper = styled(Button)`
  margin: 15px;
  color: rgb(86, 90, 105);
  text-align: center;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
`;

const Lock = () => {
  const { t } = useTranslation();
  const methods = useForm({ mode: "onChange" });
  const wallet = useWallet();
  const { hashes, setHashes, setTxDone } = useContext(TransactionContext);
  const [updatingBalance, setUpdatingBalance] = useState(false);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [loadBalance, setLoadBalance] = useState(true);
  const [balance, setBalance] = useState();
  const [lockValue, setLockValue] = useState(7);
  const [currentHiIQ, setCurrentHiIQ] = useState(undefined);
  const [filledAmount, setFilledAmount] = useState();
  const [lockEnd, setLockEnd] = useState();
  const [expired, setExpired] = useState();
  const [token1] = useState({
    icon: `${window.location.origin}/tokens/iq.png`,
    name: "IQ",
    precision: 3,
    chain: "Ethereum"
  });

  const handleConfirmation = async result => {
    if (result === "success") {
      setCurrentHiIQ(await getTokensUserBalanceLocked(wallet));
    }

    setUpdatingBalance(false);
  };

  const onSubmit = async data => {
    if (!wallet.account) return;

    if (currentHiIQ !== 0) {
      setHashes([
        ...hashes,
        ...(await increaseAmount(data.FromAmount, wallet, handleConfirmation))
      ]);
    } else {
      setHashes(await lockTokensTx(data.FromAmount, lockValue, wallet));
    }

    setUpdatingBalance(true);

    setTxDone(true);
  };

  const handleSetLockValue = lv => {
    setLockValue(lv);
  };

  const handleWithdraw = () => {
    (async () => {
      const result = await withdraw(wallet);
      if (result) {
        await result.wait();
        setLoadBalance(true);
      }
    })();
  };

  useEffect(() => {
    if (currentHiIQ && currentHiIQ > 0)
      (async () => {
        const result = await getLockedEnd(wallet);
        setLockEnd(result);
        setExpired(new Date().getTime() > result.getTime());
      })();
  }, [currentHiIQ]);

  useEffect(() => {
    if (!loadBalance) return;

    if (wallet.status === "connected" && wallet.ethereum)
      (async () => {
        setLoadingBalance(true);
        setCurrentHiIQ(Number(await getTokensUserBalanceLocked(wallet)));
        setLoadingBalance(false);
        setLoadBalance(false);
      })();
  }, [wallet.status, loadBalance]);

  return (
    <Layout>
      <Container className="p-2 mt-3" fluid>
        <FormProvider {...methods}>
          <Row>
            <Col>
              <CardTitle title="IQ Bridge" aria-label="lock" icon="🔒" />
              <Card className="mx-auto shadow-sm">
                <Card.Body>
                  <Accordion>
                    <div className="d-flex flex-row justify-content-end">
                      {currentHiIQ !== undefined && (
                        <LockHeader
                          wallet={wallet}
                          currentHiIQ={currentHiIQ}
                          updatingBalance={updatingBalance}
                          loadingBalance={loadingBalance}
                        />
                      )}
                      <Accordion.Toggle
                        as={Button}
                        variant="light"
                        eventKey="0"
                        className="d-flex flex-row justify-content-center align-middle"
                      >
                        <Button variant="light">
                          <QuestionCircle />
                        </Button>
                      </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                      <HeaderText className="shadow-sm rounded p-3 text-justify m-3 highlight">
                        {t("lock_description")}
                      </HeaderText>
                    </Accordion.Collapse>
                  </Accordion>
                  <br />
                  <>
                    {currentHiIQ > 0 && expired === true && (
                      <div className="text-center p-3">
                        <Button
                          onClick={handleWithdraw}
                          size="md"
                          variant="outline-success"
                        >
                          Withdraw
                        </Button>
                      </div>
                    )}
                  </>
                  {lockEnd && expired !== undefined && (
                    <Alert
                      className="text-center"
                      variant={expired ? "danger" : "info"}
                    >
                      {expired
                        ? "Expired"
                        : `Expiring on ${lockEnd.toLocaleString()}`}
                    </Alert>
                  )}
                  <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    <SwapContainer
                      token={token1}
                      header={t("from")}
                      setParentBalance={setBalance}
                      setFilled={setFilledAmount}
                    />
                    <div className="d-flex justify-content-center">
                      <IconWrapper bsPrefix="switch" onClick={() => {}}>
                        <ArrowDownShort />
                      </IconWrapper>
                    </div>
                    <br />
                    <LockPeriod
                      wallet={wallet}
                      updateParentLockValue={handleSetLockValue}
                    />
                    <br />
                    <Button
                      disabled={
                        !wallet.account ||
                        !balance ||
                        balance === 0 ||
                        lockValue === 0 ||
                        !filledAmount
                      }
                      variant="primary"
                      className="text-capitalize"
                      type="submit"
                      size="lg"
                      block
                    >
                      {t("lock")}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>

              {lockValue !== 0 && filledAmount && balance && balance !== 0 && (
                <InfoSwapCard
                  tokensLocked={Number(filledAmount)}
                  timeLocked={Number(lockValue)}
                />
              )}
            </Col>
          </Row>
          {!wallet.account && (
            <Row>
              <Col>
                <InfoAlert text={t("login_info_eth_locking")} />
              </Col>
            </Row>
          )}
        </FormProvider>
      </Container>
    </Layout>
  );
};

export default memo(Lock);
