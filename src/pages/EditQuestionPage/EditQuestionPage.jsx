// EditQuestionPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { EditQuestion } from "./EditQuestion";
import { questions } from "../../data/questions";

const EditQuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const foundQuestion = questions.find((q) => q.id === id);
    if (foundQuestion) {
      setQuestion(foundQuestion);
    } else {
      navigate("/notfound");
    }
  }, [id, navigate]);

  return (
    <>
      {!question && <Loader />}
      {question && <EditQuestion initialState={question} />}
    </>
  );
};

export default EditQuestionPage;