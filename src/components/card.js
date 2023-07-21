import axios from "axios"

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  let cardDiv = document.createElement('div')
  let headline = document.createElement('div')
  let author= document.createElement('div')
  let imgDiv = document.createElement('div')
  let authorPhoto = document.createElement('img')
  let authorName = document.createElement('span')

  cardDiv.classList.add('card')
  headline.classList.add('headline')
  author.classList.add('author')
  imgDiv.classList.add('img-container')

  headline.textContent = article.headline
  authorPhoto.src = article.authorPhoto
  authorName.textContent = `By ${article.authorName}`

  cardDiv.appendChild(headline)
  cardDiv.appendChild(author)
  author.appendChild(imgDiv)
  imgDiv.appendChild(authorPhoto)
  author.appendChild(authorName)

  cardDiv.addEventListener('click', () => {
    console.log(article.headline)
  })

  return cardDiv

}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  let select = document.querySelector(selector)
  axios.get('http://localhost:5001/api/articles')
    .then((res) => {
      let articles = res.data.articles
      console.log(articles)
    for (let i in articles) {
      articles[i].forEach((article) => {
        let card = Card(article)
        select.appendChild(card)
      })
    }})
    .catch((err) => {
      console.log(err)
    })
}

export { Card, cardAppender }
