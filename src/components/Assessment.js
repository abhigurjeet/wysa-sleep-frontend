import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Assessment(props) {
  const location = useLocation();
  const token = location.state?.token;
  const nickName = location.state?.nickName;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/assessment`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              nickName,
            },
          }
        );
        setData(response.data.questions);
        console.log("Assessment Data:", response.data);
      } catch (error) {
        console.error("Error fetching assessment data:", error.message);
      }
    };
    fetchData();
  }, [nickName, token]);
  return (
    <div>
      Welcome to the assessment page -{nickName}
      {data.map((item) => (
        <div>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Assessment;
