import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState([]);

  const doRequest = async () => {
    try {
      const response = await axios({
        url,
        method,
        data: body,
      });
      setData(response.data);
      setErrors(null);
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oooops...</h4>
          <ul className="my-0">
            {error.response.data.errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { data, errors, doRequest };
};
