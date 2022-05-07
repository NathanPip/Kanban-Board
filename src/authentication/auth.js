import { currentUser } from "../data-state";
import { auth } from "./firebase";

auth.onAuthStateChanged((user) => {
  currentUser = user;
});

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
//login function - signs user in if valid credentials are inputed
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
//signout function -- signs currentUser out
export const signout = () => {
  return signOut(auth);
};
