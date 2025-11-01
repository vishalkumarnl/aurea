export const loggerMiddleware = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action); // forward to next middleware / reducer
  console.log('Next state:', store.getState());
  return result;
};