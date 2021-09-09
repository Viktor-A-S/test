const dataRequested = () => {
  return {
    type: 'GET_DATA'
  }
};

const dataLoaded = data => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    data: data
  };
};

const dataError = error => {
  return {
    type: 'FETCH_DATA_ERROR',
    data: error
  };
};

const onMoveItem = data => {
    return {
        type: 'MOVE_ITEM',
        data: data
    }
}

const fetchData = ( withService, dispatch ) => () => {
  dispatch(dataRequested())
  withService.getData()
      .then((data) => {
        const val = dispatch(dataLoaded(data))
        return val
      })
      .catch((err) => dispatch(dataError(err)))
}

export { fetchData, onMoveItem }