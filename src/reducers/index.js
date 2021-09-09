const initialState = {
  data : { }
}

const getKeys = data => Object.keys( data );

const getKey = ( data, id ) => {
  let cur = { 
      key : null, 
      oIdx : null, 
      iIdx : null
    }
  const keys = getKeys( data )

  keys.map(( key, index ) => {
    var idx = data[ key ].findIndex( el => el.id === getId( id ));

    if( idx > -1) {
      cur.key   = key
      cur.oIdx  = index  //object index
      cur.iIdx  = idx    //item index
      return
    }
  })
  return cur;
}

const getId = id => {
  return (( id < 0 && id != 0 ) ? id * -1 : id )
}

const onMoveItem = ( data, id ) => {
  const cur     = getKey( data, id );
  const toLeft  = Object.is( id, -0 ) || Math.sign( id ) == -1
  const toKey   = getKeys( data )[ cur.oIdx + ( toLeft ? -1 : 1 )]

  return {
    ...data ,
    [ toKey ]   : [...data[ toKey ], 
                      data[ cur.key ][ cur.iIdx ]],
    [ cur.key ] : [...data[ cur.key ].slice( 0, cur.iIdx ), 
                   ...data[ cur.key ].slice( cur.iIdx + 1 )]
  }
};

const reducer = ( state = initialState, action ) => {

    switch ( action.type ) { 
      case 'GET_DATA':
        return {
          state
        }
      
      case 'FETCH_DATA_SUCCESS':
        return {
            data: action.data,
        }

      case 'FETCH_DATA_ERROR':
        return {
            state
        }

      case 'MOVE_ITEM':
        return {
          data : onMoveItem( state.data, action.data.id )
        }

      default:
        return state;
    }
  };
  
  export default reducer;