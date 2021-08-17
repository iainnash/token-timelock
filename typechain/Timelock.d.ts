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
    "claim()": FunctionFragment;
    "hasClaimed(uint256)": FunctionFragment;
    "recipients(uint256)": FunctionFragment;
    "recover()": FunctionFragment;
    "timeReceiveGrant()": FunctionFragment;
    "timeRecoverGrant()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "addGrants", values: [string[]]): string;
  encodeFunctionData(functionFragment: "claim", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "hasClaimed",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "recipients",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "recover", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "timeReceiveGrant",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "timeRecoverGrant",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "addGrants", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasClaimed", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "recipients", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "recover", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "timeReceiveGrant",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "timeRecoverGrant",
    data: BytesLike
  ): Result;

  events: {
    "Claimed(address)": EventFragment;
    "Recovered(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Claimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Recovered"): EventFragment;
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

    claim(overrides?: Overrides): Promise<ContractTransaction>;

    "claim()"(overrides?: Overrides): Promise<ContractTransaction>;

    hasClaimed(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "hasClaimed(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    recipients(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "recipients(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    recover(overrides?: Overrides): Promise<ContractTransaction>;

    "recover()"(overrides?: Overrides): Promise<ContractTransaction>;

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

  claim(overrides?: Overrides): Promise<ContractTransaction>;

  "claim()"(overrides?: Overrides): Promise<ContractTransaction>;

  hasClaimed(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  "hasClaimed(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  recipients(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "recipients(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  recover(overrides?: Overrides): Promise<ContractTransaction>;

  "recover()"(overrides?: Overrides): Promise<ContractTransaction>;

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

    claim(overrides?: CallOverrides): Promise<void>;

    "claim()"(overrides?: CallOverrides): Promise<void>;

    hasClaimed(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    "hasClaimed(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    recipients(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "recipients(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    recover(overrides?: CallOverrides): Promise<void>;

    "recover()"(overrides?: CallOverrides): Promise<void>;

    timeReceiveGrant(overrides?: CallOverrides): Promise<BigNumber>;

    "timeReceiveGrant()"(overrides?: CallOverrides): Promise<BigNumber>;

    timeRecoverGrant(overrides?: CallOverrides): Promise<BigNumber>;

    "timeRecoverGrant()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    Claimed(claimee: null): EventFilter;

    Recovered(sender: null, amount: null): EventFilter;
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

    claim(overrides?: Overrides): Promise<BigNumber>;

    "claim()"(overrides?: Overrides): Promise<BigNumber>;

    hasClaimed(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "hasClaimed(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    recipients(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "recipients(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    recover(overrides?: Overrides): Promise<BigNumber>;

    "recover()"(overrides?: Overrides): Promise<BigNumber>;

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

    claim(overrides?: Overrides): Promise<PopulatedTransaction>;

    "claim()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    hasClaimed(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "hasClaimed(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    recipients(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "recipients(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    recover(overrides?: Overrides): Promise<PopulatedTransaction>;

    "recover()"(overrides?: Overrides): Promise<PopulatedTransaction>;

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
