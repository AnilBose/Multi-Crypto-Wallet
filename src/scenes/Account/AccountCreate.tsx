import React, { useCallback, useEffect, useState } from "react";
import { generateAccount } from "../../utils/AccountUtils";
import { Account } from "../../models/Account";
import AccountDetail from "./AccountDetail";
import { Chain, CHAINS_CONFIG } from "../../models/Chain";

const recoveryPhraseKeyName = "recoveryPhrase";

function AccountCreate() {
  const [seedphrase, setSeedphrase] = useState("");
  const [account, setAccount] = useState<Account | null>(null);
  const [showRecoverInput, setShowRecoverInput] = useState(false);
  const [generatedSeedphrase, setGeneratedSeedphrase] = useState<string | null>(null);
  const [selectedChain, setSelectedChain] = useState<Chain>(CHAINS_CONFIG['5']); // Default to Goerli

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSeedphrase(event.target.value);
  }

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      recoverAccount(seedphrase);
    }
  };

  const recoverAccount = useCallback(
    // recoverAccount could be used without recoveryPhrase as an arguement but then we would have to
    // put it in a deps array.
    async (recoveryPhrase: string) => {
      // Call the generateAccount function with the recovery phrase and selected chain
      const result = await generateAccount(recoveryPhrase, selectedChain);
      setAccount(result.account);

      if (localStorage.getItem(recoveryPhraseKeyName) !== recoveryPhrase) {
        localStorage.setItem(recoveryPhraseKeyName, recoveryPhrase);
      }
    },
    [selectedChain]
  );

  useEffect(() => {
    const localStorageRecoveryPhrase = localStorage.getItem(recoveryPhraseKeyName);
    if (localStorageRecoveryPhrase) {
      setSeedphrase(localStorageRecoveryPhrase);
      recoverAccount(localStorageRecoveryPhrase);
    }
  }, [recoverAccount]);

  async function createAccount() {
    const result = await generateAccount("", selectedChain);
    setAccount(result.account);
    setGeneratedSeedphrase(result.seedPhrase);
  }

  function handleChainChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newChain = CHAINS_CONFIG[event.target.value as keyof typeof CHAINS_CONFIG];
    setSelectedChain(newChain);
    if (account) {
      recoverAccount(localStorage.getItem(recoveryPhraseKeyName) || '');
    } else {
      setAccount(null);
      setGeneratedSeedphrase(null);
    }
  }

  return (
    <div className="AccountCreate p-5 m-3 card shadow">
      <h1>Aqua Wallet</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="form-group mb-3">
          <label htmlFor="chainSelect">Select Chain:</label>
          <select
            id="chainSelect"
            className="form-control"
            value={selectedChain.chainId}
            onChange={handleChainChange}
          >
            {Object.values(CHAINS_CONFIG).map((chain) => (
              <option key={chain.chainId} value={chain.chainId}>
                {chain.name}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={createAccount}>
          Create Account
        </button>
        <button
          type="button"
          className="btn btn-outline-primary ml-3"
          onClick={() => showRecoverInput ? recoverAccount(seedphrase) : setShowRecoverInput(true)}
          disabled={showRecoverInput && !seedphrase}
        >
          Recover account
        </button>
        {showRecoverInput && (
          <div className="form-group mt-3">
            <input
              type="text"
              placeholder="Seedphrase or private key for recovery"
              className="form-control"
              value={seedphrase}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
      </form>
      {account && (
        <>
          <hr />
          <AccountDetail account={account} selectedChain={selectedChain} />
          {generatedSeedphrase && (
            <div>
              <p>Seedphrase: {generatedSeedphrase}</p>
              <p>Please store this seedphrase securely. It will not be shown again.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AccountCreate;
