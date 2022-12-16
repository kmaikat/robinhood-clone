// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const SET_PROFILE_IMAGE = 'session/SET_PROFILE_IMAGE'
const REMOVE_PROFILE_IMAGE = 'session/REMOVE_PROFILE_IMAGE'
const UPDATE_NICKNAME_AND_USERNAME = 'session/UPDATE_NICKNAME_ANDUSERNAME'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const setProfileImage = imageUrl => ({
  type: SET_PROFILE_IMAGE,
  imageUrl
})

const removeProfileImage = () => ({
  type: REMOVE_PROFILE_IMAGE
})

const updateNames = (nickname, username) => ({
  type: UPDATE_NICKNAME_AND_USERNAME,
  nickname,
  username
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }

};

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (firstName, lastName, email, password, buyingPower, username) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      buying_power: buyingPower,
      username
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

export const uploadProfileImage = (file) => async dispatch => {
  const formData = new FormData()
  formData.append('file', file)

  const options = {
    method: 'POST',
    body: formData
  }

  const result = fetch(`/api/file/upload`, options)
    .then(res => {
      if(res.ok)
        return res.json()
      else throw Error('couldn\'t upload profile image')
    })
    .then(res => {
      dispatch(setProfileImage(res.file))
      return true
    })
    .catch(e => {
      console.log(e)
      return false
    })

    return result
}

export const deleteProfileImage = () => async dispatch => {
  try{
    await fetch(`/api/file/upload`, {method: 'DELETE'})
    dispatch(removeProfileImage())
    return true
  }catch(e) {
    return false
  }
}

export const updateNicknameUsername = (nickname, username) => async dispatch => {
  try {
    const headers = {'Content-Type': 'application/json'}
    const options = {
      method: 'PUT',
      headers,
      body: JSON.stringify({nickname, username})
    }

    const response = await fetch('/api/users/update', options)
    if(response.ok){
      dispatch(updateNames(nickname, username))
      return true
    }else
      throw Error('Something went wrong')
  }catch(e){
    return false
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case SET_PROFILE_IMAGE:
      return { user: {
        ...state.user,
        imageUrl: action.imageUrl
      }}
    case REMOVE_PROFILE_IMAGE:
      return { user: {
        ...state.user,
        imageUrl: null
      }}
    case UPDATE_NICKNAME_AND_USERNAME:
      return { user: {
        ...state.user,
        nickname: action.nickname,
        username: action.username
      }}
    default:
      return state;
  }
}
