import { useEffect, useState } from "react"

export const App = () => {
  const DOG_ENDPOINT_RANDOM_FACT = 'https://dog-api.kinduff.com/api/facts'
  const DOG_RANDOM_IMG_ENDPOINT = 'https://dog.ceo/api/breeds/image/random'
  const [fact, setFact] = useState('')
  const [words, setWords] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  const fetchFact = () => {

    fetch(DOG_ENDPOINT_RANDOM_FACT)
    .then(res => res.json())
    .then(data => {
      const hecho = data.facts[0]
      setFact(hecho)
      const words = hecho.split(' ').slice(0,2).join(' ')
      setWords(words)
      console.log(words)
    })
    .catch(error => console.error('Error del hecho:', error))
  }
  
  useEffect(() => {
    fetchFact()
  }, [])

  useEffect(() => {
    if (!words) return
      fetch(DOG_RANDOM_IMG_ENDPOINT)
      .then(res => {
        if (!res.ok){
          throw new Error (`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        setImgUrl(data.message)
      })
      .catch(error => console.error('Fetch error aqui esta el pedo:', error));
  }, [words])

  return (
    <main>
      <h1>App de Perrones</h1>
      <section>
        {fact && <p>{fact}</p>}
        {words && <p className="words">{words}</p>}
        {imgUrl ? <img className="img" src={imgUrl} alt="Cat saying something" /> : <p>Loading...</p>}
        <button type="button" onClick={fetchFact}>New Fact</button>
      </section>
    </main>
  )
}




// OTRA FORMA DE HACERLO

//   useEffect(() => {
//     fetch(CAT_ENDPOINT_RANDOM_FACT)
//       .then(res => res.json())
//       .then(data => {
//         setFact(data.fact)
//         const threeFirstWords = data.fact.split(' ').slice(0, 3).join(' ')
//         console.log(threeFirstWords)

//         fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=white`)
//         .then(res => res.blob())
//         .then(blob => {
//           const url = URL.createObjectURL(blob);
//           setImgUrl(url);
//         })
//         .catch(error => {
//           console.error('Error fetching the image:', error);
//         });
//     })
//     .catch(error => {
//       console.error('Error fetching the fact:', error);
//     });
// }, []);


//   return (
//     <main>
//       <h1>App de Gatos</h1>
//       <section>
//         {imgUrl && <img className="img" src={`${prefix}${imgUrl}`} alt="que asco"></img>}
//       </section>
//     </main>

//   )
// }
