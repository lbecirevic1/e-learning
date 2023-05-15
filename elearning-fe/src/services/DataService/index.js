import axios from "axios";
import { Request } from "../Request";

const DATA_API = "http://localhost:8080/subject";

const ALL_SUBJECTS_PATH = "/all";
const SUBJECT_BY_ID = "/byid"
const SUBJECTS_FOR_STUDENT_PATH = "";
const SUBJECT_BY_SEMESTER_PATH = "/bysemester";
const SUBJECT_BY_SEMESTER_AND_YEAR_PATH = "";

function mapParams(paramObject) {
  const paramsArray = []
  Object.keys(paramObject).forEach((key) => {
    paramsArray.push(`${key}=${paramObject[key]}`)
  }) 
  return paramsArray.join('&')
}

class DataService {
  getAllSubjects = async () => {
    return Request(`${DATA_API}${ALL_SUBJECTS_PATH}`, "GET", [], {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    }).then((res) => res.data);
  };

  getSubjectById = async (subjectId) => {
    return Request(`${DATA_API}${SUBJECT_BY_ID}/${subjectId}`, "GET", [], {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    }).then((res) => res.data);
  };

  getSubjectsForStudent = async (studentId) => {
    return await axios.get(`${DATA_API}${SUBJECTS_FOR_STUDENT_PATH}/${studentId}`);
  };

  getSubjectsBySemester = async (semester) => {
    const params = mapParams(semester)
    return Request(`${DATA_API}${SUBJECT_BY_SEMESTER_PATH}?${params}`, "GET", [], {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    }).then((res) => res.data);

  };

  getSubjectsBySemesterAndYear = async (semester, year) => {
    return await axios.get(
      `${DATA_API}${SUBJECT_BY_SEMESTER_AND_YEAR_PATH}/${semester}/${year}`
    );
  };
}

export default new DataService();
