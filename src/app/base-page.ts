import { Injector, NgZone } from "@angular/core";
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, getDocs, collectionData, query, DocumentData } from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import { map } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

export abstract class BasePage {

    public auth: Auth;
    public firestore: Firestore;
    public router: Router;
    public activatedRoute: ActivatedRoute;
    public readonly user: Observable<User | null> = EMPTY;
    public ngZone: NgZone;
    public loggedInObserver: any;
    public userData: any;

    public ngFireStore: AngularFirestore;

    public fireUserId: string | undefined;
    public isLoggedIn: boolean;

    constructor(injector: Injector) {

        this.isLoggedIn = false;

        this.auth = injector.get(Auth);
        this.firestore = injector.get(Firestore);
        this.router = injector.get(Router);
        this.activatedRoute = injector.get(ActivatedRoute);
        this.ngZone = injector.get(NgZone);

        this.ngFireStore = injector.get(AngularFirestore);

        if(this.auth){
            this.user = authState(this.auth);
            this.user.subscribe((data) => {
                this.fireUserId = data?.uid;
                this.getUserData();
            })
        }

        this.loggedInObserver = authState(this.auth).pipe(
            traceUntilFirst('auth'),
            map(u => !!u)
        );
    }

    getUserData() {

        let path = 'users/' + this.fireUserId;
        console.log(path)
        this.getFireData(path).subscribe((uData) => {
            this.userData = uData;
        })
    }

    navigateTo(url: string, data = {}) {
        console.log('here', url, data);
        this.ngZone.run(() => {
            this.router.navigate([url, data]).then((data) => {
                console.log(data, '-----------');
            }).catch((error) => {
                console.log(error, '----------')
            });
        });
    }


    fireSignIn(email: string, password: string) {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(this.auth, email, password).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error)
            })
        })
    }

    fireSignUp(email: string, password: string) {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(this.auth, email, password).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error)
            })
        })
    }

    fireSignOut() {
        signOut(this.auth).then(() => {
            this.navigateTo('login');
        }).catch((e) => {
            console.log('signout error', e)
        });
    }


    getFireData(path: string) {
        const ref = doc(this.firestore, path);
        
        return docData(ref).pipe(
            traceUntilFirst('firestore')
        );
    }    
    

    setFireData(path: string, data: any){
        const ref = doc(this.firestore, path);
        return setDoc(ref, data);
    }

    notification(message: string) {
        alert(message);
    }

    confirmNotification(message: string) {

        return confirm(message)
    }

    deleteDocument(path: string) {
        let itemsCollection = this.ngFireStore.doc<any>(path);
        return itemsCollection.delete();
    }
}

