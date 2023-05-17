import React, { memo, useEffect, useState, useRef } from "react";
import {
  Card,
  Button,
  Overlay,
  Tooltip,
  Spinner,
  Row,
  Col
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import * as Humanize from "humanize-plus";
import Countdown from "react-countdown";
import { QuestionCircle, JournalText, Calculator } from "react-bootstrap-icons";

import styled from "styled-components";
import { ethBasedExplorerUrl, hiIQRewardsAddress } from "../../config";
import {
  callCheckpoint,
  earned,
  getStats,
  getYield,
  defaultAPR
} from "../../utils/EthDataProvider/EthDataProvider";
import CardTitle from "../../components/ui/cardTitle";
import { CoinGeckoClient } from "../../utils/coingecko";
import StatsCharts from "../../components/ui/statsCharts";
import RewardsCalculatorDialog from "../../components/ui/rewardsCalculatorDialog";
import EthereumWalletModal from "../../components/ui/ethereumWalletModal";

const Stats = ({ wallet, lockedAlready }) => {
  const { t } = useTranslation();
  const [stats, setStats] = useState();
  const [apr, setApr] = useState();
  const [earnedRewards, setEarnedRewards] = useState();
  const [rewardsInDollars, setRewardsInDollars] = useState();
  const [isLoadingClaim, setLoadingClaim] = useState(false);
  const [ethModalShow, setEthModalShow] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [show, setShow] = useState(false);
  const [showCheckpointOverlay, setShowCheckpointOverlay] = useState(false);
  const [showBaseAprOverlay, setShowBaseAprOverlay] = useState(false);
  const [animateText, setAnimateText] = useState(false);
  const [countdown, setCountdown] = useState(Date.now() + 25000);
  const [isCallingCheckpoint, setIsCallingCheckpoint] = useState(false);
  const [openRewardsCalculator, setOpenRewardsCalculator] = useState(false);
  const target = useRef(null);
  const checkpointOverlayTarget = useRef(null);
  const baseAprOverlayTarget = useRef(null);
  const countDownComponentRef = useRef(null);

  const PriceSpan = styled.span`
    font-size: 12px;
    color: #aeabab;
  `;

  const handleClaim = async () => {
    setLoadingClaim(true);
    const result = await getYield(wallet);
    await result.wait();
    setLoadingClaim(false);
  };

  const renderer = ({ seconds, completed }) => (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <hr />
      <small className="font-italic text-muted text-center">
        {completed ? "Loading rewards..." : <>Retrieving in: {seconds} s</>}
      </small>
    </div>
  );

  const handleCallCheckpoint = async () => {
    setIsCallingCheckpoint(true);
    const checkpointResult = await callCheckpoint(wallet);
    await checkpointResult.wait();

    setIsCallingCheckpoint(false);
  };

  const getOverlay = (showOverlay, overlayTarget, tooltipText) => (
    <Overlay
      style={{
        display: showOverlay ? "block" : "none"
      }}
      target={overlayTarget.current}
      show={showOverlay}
      placement="bottom"
    >
      {props => <Tooltip {...props}>{tooltipText}</Tooltip>}
    </Overlay>
  );

  useEffect(() => {
    if (wallet.status !== "connected") {
      setIsLoadingStats(false);
      return;
    }

    setInterval(() => {
      setAnimateText(true);

      setTimeout(async () => {
        const rewards = await earned(wallet);

        const result = await CoinGeckoClient.coins.fetch("everipedia", {});

        setRewardsInDollars(Number(rewards) * result.data.tickers[7].last);

        setEarnedRewards(Number(rewards));

        setEarnedRewards(Number(rewards));

        setCountdown(Date.now() + 25000);
        if (countDownComponentRef && countDownComponentRef.current)
          countDownComponentRef.current.start();
      }, 1500);
    }, 26000);
  }, [wallet]);

  useEffect(() => {
    if (animateText) {
      setTimeout(() => {
        setAnimateText(false);
      }, 1500);
    }
  }, [animateText]);

  useEffect(() => {
    if (wallet.status !== "connected") {
      setIsLoadingStats(false);
      return;
    }

    (async () => {
      setIsLoadingStats(!isLoadingStats);
      const rewards = await earned(wallet);
      const { tvl, lockedByUser, hiIQSupply, rewardsAcrossLockPeriod } =
        await getStats(wallet);

      const aprDefault = await defaultAPR(); // TODO: move to right place (user is not logged). example to get APR without wallet connected: use value for base APR (rename to just APR)
      console.log(aprDefault);

      const yearsLock = 4; // assuming a 4 year lock

      const amountLocked = lockedByUser > 0 ? lockedByUser : 100000;

      const rewardsBasedOnLockPeriod = amountLocked * (1 + 0.75 * yearsLock);
      const poolRatio =
        rewardsBasedOnLockPeriod / (hiIQSupply + rewardsBasedOnLockPeriod);

      const userRewardsAtTheEndOfLockPeriod =
        rewardsAcrossLockPeriod * yearsLock * poolRatio;
      const userRewardsPlusInitialLock =
        userRewardsAtTheEndOfLockPeriod + amountLocked;

      const aprAcrossLockPeriod = userRewardsPlusInitialLock / amountLocked;
      const aprDividedByLockPeriod = (aprAcrossLockPeriod / yearsLock) * 100;
      setApr(aprDividedByLockPeriod);

      const result = await CoinGeckoClient.coins.fetch("everipedia", {});

      setRewardsInDollars(Number(rewards) * result.data.tickers[7].last);

      setEarnedRewards(Number(rewards));

      setStats({
        tvl,
        lockedByUser,
        hiIQSupply,
        yearsLock,
        rewardsBasedOnLockPeriod,
        poolRatio,
        rewardsAcrossLockPeriod
      });
      setIsLoadingStats(!isLoadingStats);
    })();
  }, [wallet, lockedAlready]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <CardTitle title="Stats" aria-label="lock" icon="📈" />
      <Card
        style={{ width: 500, minHeight: 450 }}
        className="shadow-sm m-auto p-1"
      >
        <Card.Body className="p-3 d-flex flex-column justify-content-center">
          <div className="container d-flex flex-row justify-content-center align-items-center">
            <h3 className="text-center font-weight-normal mb-0">
              {t("Stats")}
            </h3>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark ml-2"
              href={`${ethBasedExplorerUrl}address/${hiIQRewardsAddress}`}
            >
              <JournalText size="20px" />
            </a>
          </div>
          <hr />
          <Row>
            <Col
              sm={8}
              className="p-0 d-flex flex-column justify-content-center"
            >
              <StatsCharts />
            </Col>
            <Col
              sm={4}
              className="p-0 d-flex flex-column justify-content-center"
            >
              {stats !== undefined ? (
                <div className="container d-flex flex-column justify-content-between">
                  <div className="mb-4 mt-2 text-center">
                    <Button
                      onClick={() => {
                        setOpenRewardsCalculator(!openRewardsCalculator);
                      }}
                      className="shadow-sm"
                      variant="outline-dark"
                      size="sm"
                    >
                      {t("rewards_calculator")}
                      <Calculator />
                    </Button>
                  </div>
                  <>
                    <div className="m-0 text-center">
                      <div className="d-flex flex-row justify-content-center align-items-center">
                        <strong className="mr-3">APR</strong>
                        <Button
                          variant="light"
                          size="sm"
                          ref={target}
                          onClick={event => {
                            event.preventDefault();
                            setShow(!show);
                          }}
                        >
                          <QuestionCircle />
                        </Button>
                        {getOverlay(
                          show,
                          target,
                          t("calculation_based_on_4_years")
                        )}
                      </div>
                      <span className="text-info">
                        {Number(apr).toFixed(2)}%
                      </span>
                    </div>
                    <hr />
                  </>

                  <p className="m-0 text-center">
                    {" "}
                    <strong>TVL</strong>
                    <br />
                    <span>
                      <span className="text-info">
                        {Humanize.intComma(stats.tvl)}{" "}
                        <strong className="text-dark">IQ</strong>
                      </span>
                    </span>
                  </p>
                  <hr />
                  <div className="container p-0 d-flex flex-column mt-2 text-center">
                    {earnedRewards && earnedRewards > 0 ? (
                      <>
                        <p className="m-0 text-center d-flex flex-column">
                          {" "}
                          <strong>{t("rewards")}</strong>
                          <br />
                          <span>
                            <span className={animateText ? "animate" : ""}>
                              {Humanize.toFixed(earnedRewards, 4)}{" "}
                              <strong className="text-dark">IQ</strong>
                            </span>{" "}
                          </span>
                          <PriceSpan>
                            ${Humanize.toFixed(rewardsInDollars, 2)}{" "}
                          </PriceSpan>
                        </p>
                        <Countdown
                          ref={countDownComponentRef}
                          autoStart
                          date={countdown}
                          renderer={renderer}
                        />
                        <hr className="shadow m-0 mt-4" />
                      </>
                    ) : null}
                    <div className="container mt-2 text-center">
                      {earnedRewards && earnedRewards > 0 ? (
                        <Button
                          disabled={isLoadingClaim || earnedRewards <= 0}
                          onClick={handleClaim}
                          size="sm"
                          className="shadow-sm"
                          variant="success"
                        >
                          {!isLoadingClaim ? t("claim") : `${t("loading")}...`}
                        </Button>
                      ) : (
                        <div className="d-flex flex-row justify-content-center align-items-center">
                          <Button
                            onClick={handleCallCheckpoint}
                            size="sm"
                            className="shadow-sm"
                            variant="warning"
                          >
                            {isCallingCheckpoint ? "Loading..." : "Checkpoint"}
                          </Button>
                          <Button
                            variant="light"
                            size="sm"
                            className="ml-2"
                            ref={checkpointOverlayTarget}
                            onClick={event => {
                              event.preventDefault();
                              setShowCheckpointOverlay(!showCheckpointOverlay);
                            }}
                          >
                            <QuestionCircle />
                          </Button>
                          {getOverlay(
                            showCheckpointOverlay,
                            checkpointOverlayTarget,
                            "Needed to keep track of the HIIQ supply within our rewards system"
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {!isLoadingStats && wallet.status !== "connected" ? (
                    <div className="d-flex flex-column p-4">
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <span className="text-center">Base APR: 100%</span>
                        <Button
                          variant="light"
                          size="sm"
                          className="ml-2 mb-4"
                          ref={baseAprOverlayTarget}
                          onClick={event => {
                            event.preventDefault();
                            setShowBaseAprOverlay(!showBaseAprOverlay);
                          }}
                        >
                          <QuestionCircle />
                        </Button>
                        {getOverlay(
                          showBaseAprOverlay,
                          baseAprOverlayTarget,
                          "i.e: if you lock 1Q for 1 year you will get 1Q in return"
                        )}
                      </div>
                      <span className="text-center font-italic">
                        Login to see more stats
                      </span>
                      <Button
                        onClick={() => setEthModalShow(true)}
                        variant="light"
                        className="rounded-0 mt-2 font-weight-bold"
                      >
                        Login
                      </Button>
                    </div>
                  ) : (
                    <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
                      <Spinner animation="grow" variant="primary" />
                    </div>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Card.Body>
        {stats && stats.hiIQSupply ? (
          <RewardsCalculatorDialog
            openRewardsCalculator={openRewardsCalculator}
            setOpenRewardsCalculator={setOpenRewardsCalculator}
            hiIQSupply={stats.hiIQSupply}
            rewardsAcrossLockPeriod={stats.rewardsAcrossLockPeriod}
          />
        ) : null}
      </Card>
      <EthereumWalletModal show={ethModalShow} setShow={setEthModalShow} />
    </div>
  );
};

Stats.defaultProps = {
  wallet: undefined,
  lockedAlready: false
};

Stats.propTypes = {
  wallet: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  lockedAlready: PropTypes.bool
};

export default memo(Stats);
