/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface TimelockInterface extends ethers.utils.Interface {
  functions: {
    "addGrants(address[])": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "claim()": FunctionFragment;
    "decimals()": FunctionFragment;
    "getTimeUnlock()": FunctionFragment;
    "getTokenAndAmount()": FunctionFragment;
    "grantStatus(address)": FunctionFragment;
    "name()": FunctionFragment;
    "recover()": FunctionFragment;
    "symbol()": FunctionFragment;
    "timeReceiveGrant()": FunctionFragment;
    "timeRecoverGrant()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "addGrants", values: [string[]]): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "claim", values?: undefined): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getTimeUnlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenAndAmount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "grantStatus", values: [string]): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "recover", values?: undefined): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "timeReceiveGrant",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "timeRecoverGrant",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "addGrants", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTimeUnlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenAndAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "grantStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "recover", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "timeReceiveGrant",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "timeRecoverGrant",
    data: BytesLike
  ): Result;

  events: {
    "Claimed(address,uint256)": EventFragment;
    "GrantsAdded(address,address[])": EventFragment;
    "Recovered(address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Claimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GrantsAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Recovered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export class Timelock extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: TimelockInterface;

  functions: {
    addGrants(
      newRecipients: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "addGrants(address[])"(
      newRecipients: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    balanceOf(
      user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "balanceOf(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    claim(overrides?: Overrides): Promise<ContractTransaction>;

    "claim()"(overrides?: Overrides): Promise<ContractTransaction>;

    decimals(overrides?: CallOverrides): Promise<{
      0: number;
    }>;

    "decimals()"(overrides?: CallOverrides): Promise<{
      0: number;
    }>;

    getTimeUnlock(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "getTimeUnlock()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    getTokenAndAmount(overrides?: CallOverrides): Promise<{
      0: string;
      1: BigNumber;
    }>;

    "getTokenAndAmount()"(overrides?: CallOverrides): Promise<{
      0: string;
      1: BigNumber;
    }>;

    grantStatus(
      recipient: string,
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    "grantStatus(address)"(
      recipient: string,
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    name(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "name()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    recover(overrides?: Overrides): Promise<ContractTransaction>;

    "recover()"(overrides?: Overrides): Promise<ContractTransaction>;

    symbol(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "symbol()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    timeReceiveGrant(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "timeReceiveGrant()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    timeRecoverGrant(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "timeRecoverGrant()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;
  };

  addGrants(
    newRecipients: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "addGrants(address[])"(
    newRecipients: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  balanceOf(user: string, overrides?: CallOverrides): Promise<BigNumber>;

  "balanceOf(address)"(
    user: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  claim(overrides?: Overrides): Promise<ContractTransaction>;

  "claim()"(overrides?: Overrides): Promise<ContractTransaction>;

  decimals(overrides?: CallOverrides): Promise<number>;

  "decimals()"(overrides?: CallOverrides): Promise<number>;

  getTimeUnlock(overrides?: CallOverrides): Promise<BigNumber>;

  "getTimeUnlock()"(overrides?: CallOverrides): Promise<BigNumber>;

  getTokenAndAmount(overrides?: CallOverrides): Promise<{
    0: string;
    1: BigNumber;
  }>;

  "getTokenAndAmount()"(overrides?: CallOverrides): Promise<{
    0: string;
    1: BigNumber;
  }>;

  grantStatus(recipient: string, overrides?: CallOverrides): Promise<number>;

  "grantStatus(address)"(
    recipient: string,
    overrides?: CallOverrides
  ): Promise<number>;

  name(overrides?: CallOverrides): Promise<string>;

  "name()"(overrides?: CallOverrides): Promise<string>;

  recover(overrides?: Overrides): Promise<ContractTransaction>;

  "recover()"(overrides?: Overrides): Promise<ContractTransaction>;

  symbol(overrides?: CallOverrides): Promise<string>;

  "symbol()"(overrides?: CallOverrides): Promise<string>;

  timeReceiveGrant(overrides?: CallOverrides): Promise<BigNumber>;

  "timeReceiveGrant()"(overrides?: CallOverrides): Promise<BigNumber>;

  timeRecoverGrant(overrides?: CallOverrides): Promise<BigNumber>;

  "timeRecoverGrant()"(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    addGrants(
      newRecipients: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    "addGrants(address[])"(
      newRecipients: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOf(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    "balanceOf(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claim(overrides?: CallOverrides): Promise<void>;

    "claim()"(overrides?: CallOverrides): Promise<void>;

    decimals(overrides?: CallOverrides): Promise<number>;

    "decimals()"(overrides?: CallOverrides): Promise<number>;

    getTimeUnlock(overrides?: CallOverrides): Promise<BigNumber>;

    "getTimeUnlock()"(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenAndAmount(overrides?: CallOverrides): Promise<{
      0: string;
      1: BigNumber;
    }>;

    "getTokenAndAmount()"(overrides?: CallOverrides): Promise<{
      0: string;
      1: BigNumber;
    }>;

    grantStatus(recipient: string, overrides?: CallOverrides): Promise<number>;

    "grantStatus(address)"(
      recipient: string,
      overrides?: CallOverrides
    ): Promise<number>;

    name(overrides?: CallOverrides): Promise<string>;

    "name()"(overrides?: CallOverrides): Promise<string>;

    recover(overrides?: CallOverrides): Promise<void>;

    "recover()"(overrides?: CallOverrides): Promise<void>;

    symbol(overrides?: CallOverrides): Promise<string>;

    "symbol()"(overrides?: CallOverrides): Promise<string>;

    timeReceiveGrant(overrides?: CallOverrides): Promise<BigNumber>;

    "timeReceiveGrant()"(overrides?: CallOverrides): Promise<BigNumber>;

    timeRecoverGrant(overrides?: CallOverrides): Promise<BigNumber>;

    "timeRecoverGrant()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    Claimed(actor: null, amount: null): EventFilter;

    GrantsAdded(actor: null, newRecipients: null): EventFilter;

    Recovered(recipient: null, amount: null): EventFilter;

    Transfer(from: string | null, to: string | null, tokens: null): EventFilter;
  };

  estimateGas: {
    addGrants(
      newRecipients: string[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "addGrants(address[])"(
      newRecipients: string[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    balanceOf(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    "balanceOf(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claim(overrides?: Overrides): Promise<BigNumber>;

    "claim()"(overrides?: Overrides): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    "decimals()"(overrides?: CallOverrides): Promise<BigNumber>;

    getTimeUnlock(overrides?: CallOverrides): Promise<BigNumber>;

    "getTimeUnlock()"(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenAndAmount(overrides?: CallOverrides): Promise<BigNumber>;

    "getTokenAndAmount()"(overrides?: CallOverrides): Promise<BigNumber>;

    grantStatus(
      recipient: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "grantStatus(address)"(
      recipient: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    "name()"(overrides?: CallOverrides): Promise<BigNumber>;

    recover(overrides?: Overrides): Promise<BigNumber>;

    "recover()"(overrides?: Overrides): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    "symbol()"(overrides?: CallOverrides): Promise<BigNumber>;

    timeReceiveGrant(overrides?: CallOverrides): Promise<BigNumber>;

    "timeReceiveGrant()"(overrides?: CallOverrides): Promise<BigNumber>;

    timeRecoverGrant(overrides?: CallOverrides): Promise<BigNumber>;

    "timeRecoverGrant()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    addGrants(
      newRecipients: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "addGrants(address[])"(
      newRecipients: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    balanceOf(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "balanceOf(address)"(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claim(overrides?: Overrides): Promise<PopulatedTransaction>;

    "claim()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "decimals()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTimeUnlock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getTimeUnlock()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTokenAndAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getTokenAndAmount()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantStatus(
      recipient: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "grantStatus(address)"(
      recipient: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "name()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    recover(overrides?: Overrides): Promise<PopulatedTransaction>;

    "recover()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "symbol()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    timeReceiveGrant(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "timeReceiveGrant()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    timeRecoverGrant(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "timeRecoverGrant()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
