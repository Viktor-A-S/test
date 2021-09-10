import types from './action-types'

const dataRequested = () => {
  return {
    type: types.GET_DATA
  }
};

const dataLoaded = data => {
  return {
    type: types.FETCH_DATA_SUCCESS,
    data: data
  };
};

const dataError = error => {
  return {
    type: types.FETCH_DATA_ERROR,
    data: error
  };
};

const onMoveItem = data => {
    return {
        type: types.MOVE_ITEM,
        data: data
    }
}

const fetchData = ({ withService, dispatch }) => () => {
  dispatch(dataRequested())
  withService.getData()
      .then((data) => dispatch(dataLoaded(data)))
      .catch((err) => dispatch(dataError(err)))
}

export { fetchData, onMoveItem }