var firebaseConfig = {
    apiKey: "AIzaSyB8Lt1ac9D1UZOgtRv51QYUT8I4czzdsII",
    authDomain: "todo-app-fdac1.firebaseapp.com",
    projectId: "todo-app-fdac1",
    storageBucket: "todo-app-fdac1.appspot.com",
    messagingSenderId: "963276438766",
    appId: "1:963276438766:web:0ee4c6601930c5ebea47ff",
    measurementId: "G-VB2RL65WRN"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();