import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const resources = {
  en: {
    translation: {
      // |||||||||||||||||||| SECTIONS ||||||||||||||||||||
      // EOS → pIQ
      swap: "Swap",
      login_info_eos: "Login on EOS Wallet to bridge your tokens",
      // pIQ → IQ
      swap_to_iq_erc20: "Swap to IQ ERC20",
      // ETH → EOS
      your_eos_address: "Your EOS Account",
      eos_account: "EOS account",
      swap_iq_to_eos: "Swap IQ to EOS",
      transactions_broadcasted: "Transactions broadcasted",
      // lock
      lock: "Lock",
      lock_description:
        "The longer you lock your IQ, the more hiIQ you will receive. You can also get additional hiIQ by locking more IQ or extending the lock period. hiIQ decays slowly over your locking period, eventually reaching 1-to-1 with IQ.",
      login_info_eth_locking: "Login on ETH Wallet to lock your tokens",
      confirming_tx: "Confirming transaction...",
      // ## lockHeader
      updating_balance: "Updating balance...",
      no_hiiq_tokens_locked: "No hiIQ tokens locked so far",
      loading: "Loading",
      disconnected: "Disconnected",
      // ## lockPeriod
      lock_period: "Lock period (days)",
      value_restriction: "Input value must be between 1 and 1460",
      // voting
      confirmed_tx: "Transaction confirmed!",
      voting: "voting",
      select_a_proposal: "Select a proposal",
      // error
      error: "Error",
      // ---------------------------------------------------------------

      // |||||||||||||||||||| COMMON ||||||||||||||||||||
      your_eth_address: "Your Ethereum Address",
      from: "from",
      tx_executed: "Tx executed",
      login_info_eth: "Login on ETH Wallet to swap your tokens",
      // ---------------------------------------------------------------

      // |||||||||||||||||||| COMPONENTS ||||||||||||||||||||
      // ethereumWalletModal
      select_wallet: "Select a wallet",
      // infoSwapCard
      time_locked: "Time Locked (days)",
      new_hiiq_balance: "New hiIQ",
      // proposalsModal
      details: "Details",
      see_on_snapshot: "See on Snapshot",
      current_proposals: "Current Proposals",
      // swapContainer
      balance: "balance",
      // txDetailsDialog
      transactions: "Transactions",
      txAlert:
        "Transaction details will be available depeding on how fast the network is",
      // txSuccessAlert
      transaction_executed: "Transaction Executed",
      go_to: "Go to",
      step_2: "Step 2",
      // wrongChainModal
      wrong_chain_modal_title: "Wrong Network",
      wrong_chain_modal_body:
        "Please connect to the appropiate Ethereum Network",
      // layout
      logout: "logout",
      eos_wallet: "EOS Wallet",
      ethereum_wallet: "Ethereum Wallet",
      // languageSeletcor
      language: "Language",
      select_a_language: "Select a Language",
      done: "Done",
      // ---------------------------------------------------------------

      en: "EN",
      ko: "한국어",
      zh: "中文"
    }
  },
  ko: {
    translation: {
      // |||||||||||||||||||| SECTIONS ||||||||||||||||||||
      // EOS → pIQ
      swap: "스왑",
      login_info_eos: "이오스 지갑에 로그인하여 토큰을 브리지합니다.",
      // pIQ → IQ
      swap_to_iq_erc20: "IQ ERC20으로 스왑",
      // ETH → EOS
      your_eos_address: "귀하의 EOS 주소",
      eos_account: "EOS 계정",
      swap_iq_to_eos: "IQ를 EOS로 스왑",
      transactions_broadcasted: "방송 된 거래",
      // lock
      lock: "자물쇠",
      lock_description:
        "IQ를 오래 잠글수록 더 많은 hiIQ를 받게됩니다. 더 많은 IQ를 잠 그거나 잠금 기간을 연장하여 추가 hiIQ를 얻을 수도 있습니다. hiIQ는 잠금 기간 동안 천천히 감소하여 결국 IQ와 1 : 1에 도달합니다.",
      login_info_eth_locking: "토큰을 잠 그려면 ETH 지갑에 로그인하세요.",
      confirming_tx: "거래 확인 중 ...",
      // ## lockHeader
      updating_balance: "잔액 업데이트 중 ...",
      no_hiiq_tokens_locked: "지금까지 잠긴 hiIQ 토큰이 없습니다.",
      loading: "로딩 중",
      disconnected: "연결 끊김",
      // ## lockPeriod
      lock_period: "잠금 기간 (일)",
      value_restriction: "입력 값은 1에서 1460 사이 여야합니다.",
      // voting
      confirmed_tx: "거래가 확인되었습니다!",
      voting: "투표",
      select_a_proposal: "제안 선택",
      // error
      error: "오류",
      // ---------------------------------------------------------------

      // |||||||||||||||||||| COMMON ||||||||||||||||||||
      your_eth_address: "귀하의 이더 리움 주소",
      from: "부터",
      tx_executed: "Tx 실행",
      login_info_eth: "ETH 지갑에 로그인하여 토큰 교환",
      // ---------------------------------------------------------------

      // |||||||||||||||||||| COMPONENTS ||||||||||||||||||||
      // ethereumWalletModal
      select_wallet: "지갑 선택",
      // infoSwapCard
      time_locked: "잠긴 시간 (일)",
      new_hiiq_balance: "새로운 hiIQ",
      // proposalsModal
      details: "세부",
      see_on_snapshot: "스냅 샷보기",
      current_proposals: "현재 제안",
      // swapContainer
      balance: "밸런스",
      // txDetailsDialog
      transactions: "업무",
      txAlert: "네트워크 속도에 따라 거래 세부 정보가 제공됩니다.",
      // txSuccessAlert
      transaction_executed: "거래 실행",
      go_to: "이동",
      step_2: "2 단계",
      // wrongChainModal
      wrong_chain_modal_title: "잘못된 네트워크",
      wrong_chain_modal_body: "적절한 이더 리움 네트워크에 연결하십시오",
      // layout
      logout: "로그 아웃",
      eos_wallet: "EOS 지갑",
      ethereum_wallet: "이더 리움 지갑",
      // languageSelector
      language: "언어",
      select_a_language: "언어 선택",
      done: "끝난",
      // ---------------------------------------------------------------

      en: "EN",
      ko: "한국어",
      zh: "中文"
    }
  },

  zh: {
    translation: {
      // |||||||||||||||||||| SECTIONS ||||||||||||||||||||
      // EOS → pIQ
      swap: "交换",
      login_info_eos: "登录 EOS 钱包以桥接您的代币",
      // pIQ → IQ
      swap_to_iq_erc20: "交换到 IQ ERC20",
      // ETH → EOS
      your_eos_address: "您的 EOS 账户",
      eos_account: "EOS账户",
      swap_iq_to_eos: "将 IQ 换成 EOS",
      transactions_broadcasted: "交易广播",
      // lock
      lock: "锁",
      lock_description:
        "锁定 IQ 的时间越长，您获得的 hiIQ 就越多。您还可以通过锁定更多 IQ 或延长锁定期来获得额外的 hiIQ。 hiIQ 在锁定期间缓慢衰减，最终与 IQ 达到 1 比 1。",
      login_info_eth_locking: "登录 ETH 钱包以锁定您的代币",
      confirming_tx: "正在确认交易...",
      // ## lockHeader
      updating_balance: "正在更新余额...",
      no_hiiq_tokens_locked: "到目前为止还没有锁定 hiIQ 代币",
      loading: "加载中",
      disconnected: "Disconnected",
      // ## lockPeriod
      lock_period: "锁定期（天）",
      value_restriction: "输入值必须在 1 到 1460 之间",
      // voting
      confirmed_tx: "交易确认！",
      voting: "表决",
      select_a_proposal: "选择提案",
      // error
      error: "错误",
      // ---------------------------------------------------------------

      // |||||||||||||||||||| COMMON ||||||||||||||||||||
      your_eth_address: "你的以太坊地址",
      from: "从",
      tx_executed: "已执行",
      login_info_eth: "Login on ETH Wallet to swap your tokens",
      // ---------------------------------------------------------------

      // |||||||||||||||||||| COMPONENTS ||||||||||||||||||||
      // ethereumWalletModal
      select_wallet: "选择钱包",
      // infoSwapCard
      time_locked: "锁定时间（天）",
      new_hiiq_balance: "新高智商",
      // proposalsModal
      details: "细节",
      see_on_snapshot: "在快照上查看",
      current_proposals: "当前提案",
      // swapContainer
      balance: "平衡",
      // txDetailsDialog
      transactions: "交易",
      txAlert: "交易详情将取决于网络的速度",
      // txSuccessAlert
      transaction_executed: "交易执行",
      go_to: "去",
      step_2: "第2步",
      // wrongChainModal
      wrong_chain_modal_title: "错误的网络",
      wrong_chain_modal_body: "请连接到合适的以太坊网络",
      // layout
      logout: "登出",
      eos_wallet: "EOS钱包",
      ethereum_wallet: "以太坊钱包",
      // languageSelector
      language: "语",
      select_a_language: "选择语言",
      done: "完毕",
      // ---------------------------------------------------------------

      en: "EN",
      ko: "한국어",
      zh: "中文"
    }
  }
};

const languageDetector = new LanguageDetector(null, {
  order: ["querystring", "localStorage", "navigator"],
  lookupLocalStorage: "storeLang",
  caches: ["localStorage"]
});

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    },
    supportedLngs: ["en", "ko", "zh"]
  });

export default i18n;
