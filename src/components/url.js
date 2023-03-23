import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import '../style.css'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, orderBy, limit, query } from 'firebase/firestore/lite';
import firebaseConfig from '../firebaseconfig';

function URL() {
    const config = firebaseConfig
    const app = initializeApp(config);
    const db = getFirestore(app);
    const input = useRef()
    const urlCol = collection(db, 'url')

    let [show, setShow] = useState(false)
    let [shortUrl, setShortUrl] = useState()
    let [lastRow, setLastRow] = useState([])

    const shorten = async () => {
        let userInput = input.current.value

        if(!userInput) return
        
        if(userInput) {
            addDoc(collection(db, "url"), {
                url: userInput,
                short: uuidv4().slice(0,8),
                created: new Date()
            })
            setShow(true)
            setLastRow(query(urlCol, orderBy("created", "desc"), limit(1)))
            const urlSnapshot = await getDocs(lastRow)
            urlSnapshot.forEach((doc) => {
                setShortUrl(doc.data().short)
            })
        }

    }
    return (
        <main className='main-holder'>
            <div className='title'>
                <h1>URL Shortener</h1>
            </div>

            <div className='input'>
                <input type="text" ref={input}></input>
            </div>

            <div className='button'>
                <button onClick={shorten}>Shorten</button>
            </div>

            <div className='output' style={{ display: show ? 'block' : 'none' }}>
                <p><h4>http://localhost:3000/{shortUrl}</h4></p>
            </div>
        </main>
    )
}

export default URL