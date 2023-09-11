"use client"
import { WalletAPIProvider } from "@ledgerhq/wallet-api-client-react"
import { Transport, WindowMessageTransport } from "@ledgerhq/wallet-api-client"

function TransportProvider({ children }: { children: React.ReactElement }) {
  function getWalletAPITransport(): Transport {
    if (typeof window === "undefined") {
      return {
        onMessage: undefined,
        send: () => {},
      }
    }

    const transport = new WindowMessageTransport()
    transport.connect()
    return transport
  }

  const transport = getWalletAPITransport()

  return <WalletAPIProvider transport={transport}>{children}</WalletAPIProvider>
}

export default TransportProvider
