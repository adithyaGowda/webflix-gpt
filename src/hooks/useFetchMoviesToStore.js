import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchMoviesToStore = (api, options, reducer, selector) => {
  const dispatch = useDispatch();
  const data = useSelector(selector);

  const fetchTheMoviesFromAPI = async () => {
    try {
      const resp = await fetch(api, options);
      const data = await resp.json();
      dispatch(reducer(data.results));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!data || data.length === 0) {
      fetchTheMoviesFromAPI();
    }
  }, []);
};

export default useFetchMoviesToStore;
