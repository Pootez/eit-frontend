import { useEffect, useState } from "react"
import { CollectionsApi, Configuration } from "@lab5e/ts-fetch-spanapi"
import { z } from "zod"

export const collectionDataSchema = z.object({
  data: z
    .array(
      z.object({
        payload: z.string(),
      }),
    )
    .min(1),
})

export type CollectionData = z.infer<typeof collectionDataSchema>

const useCollection = (
  apiKey: string,
  collectionId: string,
  enabled: boolean,
  deps?: any[],
) => {
  const [collectionData, setCollectionData] = useState<
    CollectionData | undefined
  >(undefined)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(
    () => {
      if (!enabled) return
      const controller = new AbortController()

      const api = new CollectionsApi(new Configuration({ apiKey }))

      setLoading(true)
      setCollectionData(undefined)
      setError("")

      api
        .listCollectionData({
          collectionId,
        })
        .then((data) => {
          const result = collectionDataSchema.safeParse(data)
          if (result.success) {
            setCollectionData(result.data)
          } else {
            setCollectionData(undefined)
          }
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })

      return () => controller.abort()
    },
    deps ? [...deps] : [],
  )

  return { collectionData, isLoading, error }
}

export default useCollection
