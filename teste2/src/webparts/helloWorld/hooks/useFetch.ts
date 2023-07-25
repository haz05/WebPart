import { useEffect, useState } from 'react';

export const useFetch = (url: string) => {
  const [data, setData] = useState<any | null>(null);
  const [idDel, setIdDel] = useState<string>('');
  // aula 5 refatorando post
  const [config, setConfig] = useState<RequestInit | null>(null);
  const [method, setMethod] = useState<string | null>(null);
  const [callFetch, setCallFetch] = useState<boolean>(false);
  // 6 loading
  const [loading, setLoading] = useState<boolean>(false);

  // 7 tratando erros
  const [error, setError] = useState<string | null>(null);

  const httpConfig = (data: any, method: string) => {
    if (method === "POST") {
      setConfig({
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      setMethod(method)
    }
    else if (method === "DELETE") {
      setConfig({
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        //body: JSON.stringify(data)
      });
      setMethod(method)
      setIdDel("/" + String(data))
    }
  };

  // aula 4 custom hook
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const res = await fetch(url)

        const json = await res.json()
        setData(json)
      } catch (error) {
        console.log(error.message);
        setError("Houve algum erro ao carregar os dados!")
      }
      setLoading(false)
    }
    fetchData()
  }, [url, callFetch]);

  // refatorando post
  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        let fetchOptions: [string, RequestInit] = [url, config!];

        const res = await fetch(...fetchOptions);
        const json = await res.json();
        setCallFetch(json); // serves no practical purpose; only to trigger the above useEffect
      }
      if (method === "DELETE") {
        let fetchOptions: [string, RequestInit] = [url + idDel, config!];

        const res = await fetch(...fetchOptions);
        const json = await res.json();
        setCallFetch(json); // serves no practical purpose; only to trigger the above useEffect
      }
    }
    httpRequest()
  }, [config, method, url, idDel]);

  return { data, httpConfig, loading, error };
}
