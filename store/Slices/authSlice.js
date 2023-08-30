import { createSlice } from "@reduxjs/toolkit";
import { accountId, secretToken, secretTokenKey } from "../../secretToken";
import { uiActions } from "../UI";
import { Notifier } from "./notificationSlice";
import { TimeOut } from "../TimeOut";

export const AuthSlice = createSlice({
  name: "user",
  initialState: {
    tempToken: null,
    sessionId: null, //session id stored in.
    isLoggedIn: null, //if token available
    isSuccess: null, //if session available
    errBody: { error: null, message: "" },
    user: {
      username: "",
      id: "",
      country: "",
      userImg: null,
    },
    userFeatures: {
      lengthOfFeature: null,
      lastPage: 1,
      list: [],
      currentPage: 1,
      type: "",
      feature: "",
    },
    isLoading: false,
    error: { error: false, message: "" },
  },
  reducers: {
    errorHandler(state, action) {
      state.errBody = { ...action.payload };
    },
    requestToken(stat, action) {
      stat.tempToken = action.payload.token;
    },
    //login,AccessStuff
    validateToken(state, action) {
      state.hourToken = action.payload.token;
    },
    successHandler(state, action) {
      state.isSuccess = action.payload;
    },
    loginHandler(state, action) {
      state.isLoggedIn = action.payload;
    },
    createNewSession(state, action) {
      state.sessionId = action.payload;
    },

    UpdateUser(state, user) {
      state.user = { ...user.payload };
    },
    UpdateUserList(state, action) {
      state.userFeatures = { ...action.payload };
    },
    userErrorHandler(state, action) {
      state.error = { ...action.payload };
    },
    userLoaderHander(state, action) {
      state.isLoading = action.payload;
    },
  },
});
export const AuthAction = AuthSlice.actions;
export const AuthActionThunk = (
  requestType,
  tokenString = "",
  user = {},
  session
) => {
  return async (dispatch) => {
    const RequestToken = async () => {
      const url = "https://api.themoviedb.org/3/authentication/token/new";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${secretToken}`,
        },
      };
      const fetchData = await fetch(url, options);

      const res = await fetchData.json();

      if (!res.success) {
        dispatch(AuthAction.loginHandler(false));
        dispatch(
          Notifier({
            isOpened: true,
            message: " Something Went Wrong. ",
          })
        );

        return;
      }

      if (requestType === "requestToken") {
        window.open(
          `https://www.themoviedb.org/authenticate/${res.request_token}?redirect_to=http://moviedepth.web.app`,
          "_blank",
          "norefferal"
        );
      }

      dispatch(AuthAction.loginHandler(true));

      return res;
    };

    //log in
    const ValidateRequest = async () => {
      const token = await RequestToken();

      const url =
        "https://api.themoviedb.org/3/authentication/token/validate_with_login";
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${secretToken}`,
        },
        body: JSON.stringify({
          ...user,
          request_token: `${token.request_token}`,
        }),
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          //   console.log(json);
          if (!json.success) {
            dispatch(
              AuthAction.errorHandler({
                error: true,
                message: json.status_message || "Invalid Credential",
              })
            );
            dispatch(uiActions.toggleAuthHandler(true));
            dispatch(AuthAction.requestToken({ token: null }));

            dispatch(AuthAction.loginHandler(false));
            return;
          }
          dispatch(UserDetail(session));
          dispatch(AuthAction.errorHandler({ error: null, message: "" }));
          dispatch(AuthAction.loginHandler(true));
          dispatch(uiActions.toggleAuthHandler(false));
          localStorage.setItem(
            "MovieDepthTokenExpiration",
            String(json.expires_at)
          );

          //   dispatch(AuthAction.requestToken({ token:token.request_token  }));

          localStorage.setItem("MovieDepthToken", String(json.request_token));
          dispatch(AuthAction.requestToken({ token: json.request_token }));
        })
        .catch(() => {
          dispatch(AuthAction.requestToken({ token: null }));

          dispatch(AuthAction.loginHandler(false));
          dispatch(
            AuthAction.errorHandler({
              error: true,
              message: "Something Went Wrong",
            })
          );
        });
    };

    //sign up
    const SessionIdRequest = async () => {
      //Get New Session Id
      const Session = await fetch(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${secretTokenKey}&request_token=${tokenString}`,
        {
          method: "POST",
        }
      );

      const SessionData = await Session.json();
      if (!SessionData.success) {
        //modal
        dispatch(uiActions.toggleAuthHandler(false));
        //notification
        dispatch(
          Notifier({ isOpened: true, message: "Unable to Authorize User" })
        );
        dispatch(AuthAction.requestToken({ token: null }));
        // Succession
        dispatch(AuthAction.successHandler(false));
        //clear Token
        dispatch(AuthAction.loginHandler(false));
        localStorage.clear();

        return;
      }

      if (SessionData.success) {
        const userDetail = JSON.stringify({
          userId: SessionData.session_id,
        });

        dispatch(
          Notifier({ isOpened: true, message: "Account Created Successfully" })
        );
        dispatch(uiActions.toggleAuthHandler(false));
        dispatch(AuthAction.successHandler(true));
        dispatch(UserDetail(SessionData.session_id));
        dispatch(AuthAction.createNewSession(SessionData.session_id));

        dispatch(AuthAction.errorHandler({ error: null, message: "" }));

        dispatch(AuthAction.requestToken({ token: tokenString }));

        //islogged in
        dispatch(AuthAction.loginHandler(true));
        //Store in LocalStorage
        localStorage.setItem("MovieDepthUser", userDetail);
        return;
      }
      //console.log(SessionData);

      //LocalStarage......
    };
    try {
      if (requestType === "requestToken") {
        const token = await Promise.race([TimeOut(5), RequestToken()]);
        localStorage.setItem("MovieDepthToken", String(token.request_token));
        localStorage.setItem(
          "MovieDepthTokenExpiration",
          String(token.expires_at)
        );

        dispatch(AuthAction.requestToken({ token }));
      }
      if (requestType === "session") {
        await Promise.race([TimeOut(5), SessionIdRequest()]);
      }
      if (requestType === "loginValidation") {
        await Promise.race([TimeOut(6), ValidateRequest(user)]);
      }
    } catch (err) {
      typeof err === "string"
        ? dispatch(
            AuthAction.errorHandler({
              error: true,
              message:
                typeof err === "string" && err.includes("too")
                  ? err
                  : "Something went wrong!",
            })
          )
        : dispatch(
            AuthAction.errorHandler({
              error: true,
              message: "An Error has Occured",
            })
          );

      dispatch(uiActions.toggleAuthHandler(false));
      dispatch(Notifier({ isOpened: true, message: "Something Went Wrong" }));
      localStorage.removeItem("MovieDepthToken");
      dispatch(AuthAction.requestToken({ token: null }));

      localStorage.removeItem("MovieDepthTokenExpiration");
    }
  };
};
export const UserDetail = (session) => {
  return async (dispatch) => {
    const AccountInfo = async () => {
      const fetchData = await fetch(
        `https://api.themoviedb.org/3/account/${accountId}?api_key=${secretTokenKey}&session_id=${session}`,
        {
          method: "get",
        }
      );
      if (!fetchData.ok) {
        dispatch(
          Notifier({
            isOpened: true,
            message: "Could not get User. Something Went Wrong",
          })
        );
        return;
      }

      const fetchDetail = await fetchData.json();
      return {
        userImg: fetchDetail.avatar.tmdb.avatar_path,
        username: fetchDetail.username,
        country: fetchDetail.iso_3166_1,
      };
    };
    try {
      const data = await Promise.race([TimeOut(7), AccountInfo()]);
      dispatch(AuthAction.createNewSession(session));
      dispatch(AuthAction.UpdateUser({ id: session, ...data }));
    } catch (e) {
      typeof err === "string"
        ? dispatch(
            Notifier({
              isOpened: true,
              message: "Could not Fetch User Info",
            })
          )
        : dispatch(
            Notifier({
              isOpened: true,
              message: " Something Went Wrong",
            })
          );
    }
  };
};
