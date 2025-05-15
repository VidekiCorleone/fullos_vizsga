import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './bootstrap.min.css'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [lista, setLista] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  function getAllArtwork() {
    const getRequest = new XMLHttpRequest()
    getRequest.open('get', 'http://127.1.1.1:3000/artworks')
    getRequest.send()
    getRequest.onreadystatechange = () => {
      if (getRequest.readyState == 4 && getRequest.status == 200) {
        const result = JSON.parse(getRequest.response)
        setLista(lista => result)
      }
    }
  }

  function login() {
    const postRequest = new XMLHttpRequest()
    postRequest.open('post', 'http://127.1.1.1:3000/login')
    postRequest.setRequestHeader('Content-Type', 'Application/JSON')
    postRequest.send(JSON.stringify({
      loginUser: loginUser.value,
      loginPass: loginPass.value
    }))
    postRequest.onreadystatechange = () => {
      if (postRequest.readyState == 4 && postRequest.status == 200) {
        const result = JSON.parse(postRequest.response)
        alert(result.message)
        setLoggedIn(true)
        sessionStorage.setItem('token', result.token)
      }
    }
  }

  function addArtwork() {
    const postRequest = new XMLHttpRequest()
    postRequest.open('post', 'http://127.1.1.1:3000/artworks')
    postRequest.setRequestHeader('Content-Type', 'Application/JSON')
    let token = sessionStorage.getItem('token')
    if (token) {
      postRequest.setRequestHeader("Authorization", `${token}`)
    }
    postRequest.send(JSON.stringify({
      newTitle: newTitle.value,
      newValue: newValue.value
    }))
    postRequest.onreadystatechange = () => {
      if (postRequest.readyState == 4 && postRequest.status == 200) {
        const result = JSON.parse(postRequest.response)
        alert(result.message)
      }
    }
  }

  function deleteArtwork(id) {
    const deleteRequest = new XMLHttpRequest()
    deleteRequest.open('delete', 'http://127.1.1.1:3000/artworks/' + id)
    let token = sessionStorage.getItem('token')
    if (token) {
      deleteRequest.setRequestHeader("Authorization", `${token}`)
    }
    deleteRequest.send()
    deleteRequest.onreadystatechange = () => {
      if (deleteRequest.readyState == 4 && deleteRequest.status == 200) {
        const result = JSON.parse(deleteRequest.response)
        console.log(result);
        alert(result.message)
      }
    }
  }

  return (
    <>
      <header>

        <h1>Műalkotás gyűjtemény</h1>

      </header>


      <main className='col-sm-8 col-md-8 col-lg-12 col-xl-12'>

          <div className='m-5 p-2'>
            <button onClick={() => getAllArtwork()}>Műalkotások lekérdezése</button>
            <ul>
              {lista.map(item => (
                <li key={item.id}>Műalkotás neve: {item.title}, műalkotás értéke: {item.value}.
                  {loggedIn ?
                    <button onClick={() => deleteArtwork(item.id)}>Törlés</button> : false}
                </li>
              ))}
            </ul>
          </div>



          <div className='m-5 p-2'>
            <label htmlFor="loginUser">Felhasználónév:</label> <input className='p-2' type="text" name='loginUser' id='loginUser' /><br />
            <label htmlFor="loginPass">Jelszó:</label> <input className='p-2' type="password" name='loginPass' id='loginPass' /><br />
            <button onClick={() => login()}>Bejelentkezés</button>
          </div>


          <div className='m-5 p-2'>
            {loggedIn ? <>
              <label htmlFor="newTitle">Cím: </label> <input className='p-2' type="text" name="newTitle" id="newTitle" /> <br />
              <label htmlFor="newValue">Érték: </label> <input className='p-2' type="text" name="newValue" id="newValue" /> <br />
              <button onClick={() => addArtwork()}>Hozzáadás</button>
            </> : false}
          </div>



      </main>



      <footer>Zsiros Máté Ferenc - 13K - Javító vizsga</footer>
    </>
  )
}

export default App
