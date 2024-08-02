import { useEffect, useState } from "react"

export const App = () => {
  const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
  const [fact, setFact] = useState('')
  const [words, setWords] = useState('')
  const [imgUrl, setImgUrl] = useState('')


  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const hecho = data.fact
        setFact(hecho)
        const words = hecho.split(' ').slice(0, 3).join(' ')
        setWords(words)
      })
      .catch(error => console.error('Error del hecho:', error))
  }, [])

  useEffect(() => {
    if (words) {
      fetch(`https://cataas.com/cat/says/${words}?fontSize=60&fontColor=white
        `)
        .then(response => {
          if (response.ok) {
            setImgUrl(response.url)
          } else {
            console.error('Error fetching image:')
          }
        })
        .catch(error => console.error('Fetch error:', error))
    }
  }, [words])

  return (
    <main>
      <h1>App de Gatos</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imgUrl ? <img className="img" src={imgUrl} alt="Cat saying something" /> : <p>Loading...</p>}
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
