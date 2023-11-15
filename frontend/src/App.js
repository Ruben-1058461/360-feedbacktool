import {React} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import {Overview} from "./pages/Overview/Overview"
import Login from "./pages/Login/Login"
import SignUp from "./pages/Register/Register"
import SurveyPage from "./pages/Survey/SurveyPage"
import MemberPage from "./pages/Members/MemberPage"
import TeamPage from "./pages/Teams/TeamPage"
import QuestionPage from "./pages/Questions/QuestionPage"
import {Reports} from "./pages/Reports/Reports"
import {NotFound} from "./pages/NotFound/NotFound"
import {Header} from "./components/Partials/Header/Header.js"
import AnswerPage from "./pages/Answer/AnswerPage"
import AnswerAdminPage from "./pages/Answer/AnswerAdminPage";
import './App.css';
import Logout from "./pages/Logout/Logout";

function App() {
  const location = useLocation();
  const isAnswerPage = location.pathname.startsWith("/vragenlijst/");

  return (
    <>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossOrigin="anonymous" />
    {!isAnswerPage && <Header />}
    <Routes>
      <Route path="/" index element={<Overview />} />
      <Route path="/inloggen" element={<Login />} />
      <Route path="/registreren" element={<SignUp/>}/>
      <Route path="/vragenlijsten" element={<SurveyPage />} />
      <Route path="/leden" element={<MemberPage />} />
      <Route path="/teams" element={<TeamPage />} />
      <Route path="/vragen" element={<QuestionPage />} />
      <Route path="/rapportages" element={<Reports />} />
      <Route path="/vragenlijst/*" element={<AnswerPage />} />
      <Route path="/antwoorden" element={<AnswerAdminPage/>}/>
      <Route path="/*" element={<NotFound />} />
      <Route path="/uitloggen" element={<Logout />} />
    </Routes>
    </>
  );
}

export default App;
