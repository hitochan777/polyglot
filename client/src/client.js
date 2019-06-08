import * as sapper from "@sapper/app";

import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjiUl8vNuxrh284VEi-42PIX4bFtCBOxo",
  authDomain: "polyglot-3f093.firebaseapp.com",
  databaseURL: "https://polyglot-3f093.firebaseio.com",
  projectId: "polyglot-3f093",
  storageBucket: "polyglot-3f093.appspot.com",
  messagingSenderId: "1045048195124",
  appId: "1:1045048195124:web:41e1fe0602adcf69"
};

firebase.initializeApp(firebaseConfig);

sapper.start({
  target: document.querySelector("#sapper")
});
