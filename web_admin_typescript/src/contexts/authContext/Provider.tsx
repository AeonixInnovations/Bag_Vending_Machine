import initialState from "./store";
import actions from "./actions";
import reducer from "./reducer";
import { useCallback, useEffect, useReducer } from "react";
import AuthContext from "./authContext";
import { ContextProviderProps } from "../../@types/contexts/context.types";

const AuthContextProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const value = {
  // 	user: state.user,
  // 	// eslint-disable-next-line react-hooks/exhaustive-deps
  // 	setUser: useCallback((user: UserStudent | UserTeacher) =>

  // 	dispatch({
  // 		 type: actions.SET_USER, payload: { ...state, user } }), [])
  // };

  const fetchUserFromStorage = useCallback(async () => {
    try {
      const storedData = await localStorage.getItem("@user");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log("------->parseData", parsedData);
        const userWithNumbers = {
          ...parsedData,
          phone_number: parseInt(parsedData?.phone_number, 10),
          reward: parseInt(parsedData?.reward, 10),
          total_reward: parseInt(parsedData?.total_reward, 10),
        };

        dispatch({
          type: actions.SET_USER,
          payload: { ...state, user: userWithNumbers },
        });
      }
    } catch (error) {
      console.error("Error fetching user from storage:", error);
    }
  }, [dispatch]);

  const value = {
    user: state.user,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setUser: useCallback((user: any) => {
      dispatch({ type: actions.SET_USER, payload: { ...state, user } });
      try {
        localStorage.setItem("@user", JSON.stringify(user));
      } catch (err) {
        console.log("failed to store");
      } finally {
        console.log("Data Added Successfully");
      }
    }, []),
  };

  useEffect(() => {
    fetchUserFromStorage();
  }, [fetchUserFromStorage]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
