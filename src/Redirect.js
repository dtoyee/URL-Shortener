import { useParams } from "react-router"
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, orderBy, limit, query, where } from 'firebase/firestore/lite';
import firebaseConfig from './firebaseconfig';

async function Redirect() {
    const { id } = useParams()

    const config = firebaseConfig
    const app = initializeApp(config);
    const db = getFirestore(app);
    const urlCol = collection(db, 'url')

    const urlQuery = query(urlCol, where('short', '==', id))
    const urlSnapshot = await getDocs(urlQuery)

    return (
        urlSnapshot.forEach((doc) => {
            window.location.replace(doc.data().url)
        })
    )
}

export default Redirect