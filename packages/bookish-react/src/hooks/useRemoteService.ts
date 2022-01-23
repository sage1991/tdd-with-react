import { useCallback, useEffect, useState } from "react"


type Service<Data> = () => Promise<Data>

export const useRemoteService = <Data, Payload = void> (service: Service<Data>, initial: Data, dependency: any[]) => {
  const [ data, setData ] = useState<Data>(initial)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ error, setError ] = useState<boolean>(false)

  const _service = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      setData(await service())
    } catch (e) {
      console.error(e)
      setError(true)
    } finally {
      setLoading(false)
    }
  }, dependency)

  useEffect(() => {
    _service()
  }, [ _service ])

  return { data, loading, error }
}
