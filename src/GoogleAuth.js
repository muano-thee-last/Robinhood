import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD5aPXd4DjzXI-zU4_CbOur2q8BtJ1tr1Y",
  authDomain: "fir-sd-22d1a.firebaseapp.com",
  databaseURL: "https://fir-sd-22d1a-default-rtdb.firebaseio.com",
  projectId: "fir-sd-22d1a",
  storageBucket: "fir-sd-22d1a.appspot.com",
  messagingSenderId: "526172429927",
  appId: "1:526172429927:web:51ae427f7acfa1d925bec2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "it";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
const db = getDatabase();
const dbref = ref(db);
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("continueWithGoogle");
googleLogin.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      sessionStorage.setItem("user", JSON.stringify(user));
      let uid = user.uid;
      sessionStorage.setItem('firstLogin', false);
      // Check if the user exists in the FundManagers table
      get(child(dbref, "FundManagers/" + uid))
        .then((snapshot) => {
          if (snapshot.exists()) {
            if (snapshot.val().status == "Blocked") {
              alert("User is blocked");
              Notification.requestPermission().then((perm) => {
                if (perm === "granted") {
                  const notification = new Notification(
                    "Application Submission",
                    {
                      body: "Your profile has been blocked",
                      data: {
                        url: "https://www.youtube.com/results?search_query=firebase+push+notification+with+php+and+javascript+for+web+development",
                      },
                      icon: "FRM.png",
                      tag: "this is new",
                    }
                  );
                  notification.addEventListener("error", (err) => {
                    alert("error");
                  });
                }
              });
              window.location.href = "./blocked.html";
            }
            else if (snapshot.val().status == "Violation") {
              alert("You are in violation of the rules and your account will be blocked");
              Notification.requestPermission().then((perm) => {
                if (perm === "granted") {
                  const notification = new Notification(
                    "Application Submission",
                    {
                      body: "You are in violation of the rules and your account will be blocked",
                      data: {
                        url: "https://www.youtube.com/results?search_query=firebase+push+notification+with+php+and+javascript+for+web+development",
                      },
                      icon: "FRM.png",
                      tag: "this is new",
                    }
                  );
                  notification.addEventListener("error", (err) => {
                    alert("error");
                  });
                }
              });
              window.location.href = "./fundManager/fundingmenager.html";
            } else {
              // User is a fund manager, redirect to the fund manager dashboard
              window.location.href = "./fundManager/fundingmenager.html";
            }
          } else {
            // Check if the user exists in the Students table
            get(child(dbref, "Applicants/" + uid))
              .then((snapshot) => {
                if (snapshot.exists()) {
                  if (snapshot.val().status == "Blocked") {
                    alert("User is blocked");
                    Notification.requestPermission().then((perm) => {
                      if (perm === "granted") {
                        const notification = new Notification(
                          "Application Submission",
                          {
                            body: "Your profile has been blocked",
                            data: {
                              url: "https://www.youtube.com/results?search_query=firebase+push+notification+with+php+and+javascript+for+web+development",
                            },
                            icon: "FRM.png",
                            tag: "this is new",
                          }
                        );
                        notification.addEventListener("error", (err) => {
                          alert("error");
                        });
                      }
                    });
                    window.location.href = "./blocked.html";
                  } else {
                    if (snapshot.val().status == "Violation") {
                      alert(
                        "You are in violation of the rules and your account will be blocked"
                      );
                      Notification.requestPermission().then((perm) => {
                        if (perm === "granted") {
                          const notification = new Notification(
                            "Application Submission",
                            {
                              body: "You are in violation of the rules and your account will be blocked",
                              data: {
                                url: "https://www.youtube.com/results?search_query=firebase+push+notification+with+php+and+javascript+for+web+development",
                              },
                              icon: "FRM.png",
                              tag: "this is new",
                            }
                          );
                          notification.addEventListener("error", (err) => {
                            alert("error");
                          });
                        }
                      });
                    }

                    window.location.href =
                      "./Sprint/fundApplicant/dash_board.html";
                  }
                } else {
                  // User not found, redirect to registration page
                  console.log("please register");
                  sessionStorage.setItem('firstLogin', true);
                  window.location.href = "createacc.html";
                }
              })
              .catch((error) => {
                console.error("Error getting student data:", error);
                // Handle errors
              });
          }
        })
        .catch((error) => {
          console.error("Error getting fund manager data:", error);
          // Handle errors
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log("Error:", error.message);
    });
});
