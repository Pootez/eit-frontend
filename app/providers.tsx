"use client"

import { HeroUIProvider } from "@heroui/react"
import { CollectionContextProvider } from "@/contexts/CollectionContext"
import { CustomDataContextProvider } from "@/contexts/CustomDataContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <CollectionContextProvider>
        <CustomDataContextProvider>{children}</CustomDataContextProvider>
      </CollectionContextProvider>
    </HeroUIProvider>
  )
}
