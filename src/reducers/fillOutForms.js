const form = (state = {}, action) => {
  switch (action.type) {
    case 'FILLED_REGISTER_FORM':
      return {
        form: action.form
      }
    default:
      return state
  }
}

export default form