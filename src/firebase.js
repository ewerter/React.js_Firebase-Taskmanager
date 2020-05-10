//import 'firebase-admin'
import * as firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

const config = {
	apiKey: "AIzaSyDSXraRPL_yPf-jj9iREKLIU1X4vJRuoQg",
    authDomain: "react-dashboard-88610.firebaseapp.com",
    databaseURL: "https://react-dashboard-88610.firebaseio.com",
    projectId: "react-dashboard-88610",
    storageBucket: "react-dashboard-88610.appspot.com",
    messagingSenderId: "836974457403",
    appId: "1:836974457403:web:0a7a902e906da482dea21e",
    measurementId: "G-1TGL926E08"

}
	firebase.initializeApp(config);

class Firebase {
	constructor() {
		
		this.auth = firebase.auth()
		this.db = firebase.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()