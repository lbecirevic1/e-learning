import SubjectPage from "../components/containers/SubjectPage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DataService from "../services/DataService";

const Subject = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    DataService.getSubjectById(id).then((res) => setData(res));
  }, []);

  return (
    <div className="conteiner-fluid">
      <SubjectPage id={id} subjectName={data.name} />
    </div>
  );
};

export default Subject;
