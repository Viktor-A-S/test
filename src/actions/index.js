// const getData = data => {
//     return {
//         type: 'GET_DATA',
//         payload: data
//     }
// }

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

const fetchData = (withService, dispatch) => () => {
  dispatch(dataRequested())
  withService.getData()
      .then((data) => {
        const val = dispatch(dataLoaded(data))
        return val
      })
      .catch((err) => dispatch(dataError(err)))
}

export { fetchData, onMoveItem }

// const fetchData = (withService, dispatch) => () => {
//   return {
//     getData: () => {
//       withService.getData().then(
//         (data) => { dispatch( getData(data) ) }
//       )
//     }
//   }
// }

// export { getData, onMove, fetchData }