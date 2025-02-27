import { useState } from "react";
import StudentPage from "./student/StudentPage";
import ProfessorPage from "./professor/ProfessorPage";

const Index = () => {
  
  const [userRole, setUserRole] = useState("professor");

  return (
    <>
      <button onClick={() => setUserRole("student")}>Switch to Student</button>
      <button onClick={() => setUserRole("professor")}>Switch to Professor</button>

      {userRole === "student" ? <StudentPage /> : <ProfessorPage />}
    </>
  );
};

export default Index;
