import useCollection, { CollectionData } from "@/hooks/useCollection"
import React, { createContext, useEffect, useState } from "react"

export type CollectionContextType = {
  apiKey: string
  setApiKey: React.Dispatch<React.SetStateAction<string>>
  collectionId: string
  setCollectionId: React.Dispatch<React.SetStateAction<string>>
  refresh: () => void
  collectionData: CollectionData | undefined
  isLoading: boolean
  error: string
}

export const CollectionContext = createContext<CollectionContextType>({
  apiKey: "",
  setApiKey: () => {},
  collectionId: "",
  setCollectionId: () => {},
  refresh: () => {},
  collectionData: undefined,
  isLoading: false,
  error: "",
})

export const CollectionContextProvider = ({ children }: { children: any }) => {
  const [apiKey, setApiKey] = useState("")
  const [collectionId, setCollectionId] = useState("")
  const [isRefresh, setRefresh] = useState(false)

  const refresh = () => {
    setRefresh(!isRefresh)
  }

  const { collectionData, isLoading, error } = useCollection(
    apiKey,
    collectionId,
    [isRefresh],
  )

  useEffect(() => {
    if (typeof window !== "undefined") {
      setApiKey(localStorage.getItem("api_key") || "")
      setCollectionId(localStorage.getItem("collection_id") || "")
    }
  }, [])

  return (
    <CollectionContext.Provider
      value={{
        apiKey,
        setApiKey,
        collectionId,
        setCollectionId,
        refresh,
        collectionData,
        isLoading,
        error,
      }}
    >
      {children}
    </CollectionContext.Provider>
  )
}
