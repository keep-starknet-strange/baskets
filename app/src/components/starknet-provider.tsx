"use client";

import { sepolia } from "@starknet-react/chains";
import {
  argent,
  braavos,
  publicProvider,
  StarknetConfig,
  starkscan,
  useInjectedConnectors,
} from "@starknet-react/core";
import React from "react";

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors",
  });

  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={publicProvider()}
      connectors={connectors}
      explorer={starkscan}
    >
      {children}
    </StarknetConfig>
  );
}
