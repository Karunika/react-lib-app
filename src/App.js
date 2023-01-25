import { RouterProvider } from 'react-router-dom';
import router from './router';

import UsersContextProvider from './contexts/users';
import BooksContextProvider from './contexts/books';

const App = () => {
  return (
    <div className="App">
      <BooksContextProvider>
        <UsersContextProvider>
          <RouterProvider router={router} />
        </UsersContextProvider>
      </BooksContextProvider>
    </div>
  );
}

export default App;
