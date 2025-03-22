import { StrictMode } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { createRoot } from 'react-dom/client'
import './index.css'
import { Navigate } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Rootlayout from './components/RootLayout.jsx'
import Home from './components/common/Home.jsx'
import Signin from './components/common/Signin.jsx'
import Signup from './components/common/Signup.jsx'
import UserProfile from './components/user/UserProfile.jsx'
import AuthorProfile from './components/author/AuthorProfile.jsx'
import Articles from './components/common/Articles.jsx'
import ArticleByID from './components/common/ArticleByID.jsx'
import PostArticle from './components/author/PostArticle.jsx'
import UserAuthorContext from './contexts/UserAuthorContext.jsx';
import AdminProfile from './components/admin/AdminProfile.jsx'
import Both from './components/admin/Both.jsx'
// import Authors from './components/admin/Authors.jsx'
// import Blocked from './components/admin/Blocked.jsx'

const browserRouterObj=createBrowserRouter([
  {
    path:"/",
    element:<Rootlayout />,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"signin",
        element:<Signin/>
      },
      {
        path:"signup",
        element:<Signup/>
      },
      {
        path:"user-profile/:email",
        element:<UserProfile/>,
        children:[
          {
            path:"articles",
            element:<Articles/>
          },
          {
            path:":articleId",
            element:<ArticleByID/>
          },
          {
            path:"",
            element:<Navigate to="articles" />
          }
        ]
      },
      {
        path:"author-profile/:email",
        element:<AuthorProfile/>,
        children:[
          {
            path:"articles",
            element:<Articles/>
          },
          {
            path:":articleId",
            element:<ArticleByID/>
          },
          {
            path:"article",
            element:<PostArticle/>
          },
          {
            path:"",
            element:<Navigate to="articles" />
          }
        ]
      },
      {
        path:"admin-profile/:email",
        element:<AdminProfile/>,
          children:[
            {
              path:"",
              element:<Both/>

            },
            {
              path:"both",
              element:<Both/>
            }
            // {
            //   path:"blocked",
            //   element:<Blocked/>
            // }
          ]
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthorContext>
    <RouterProvider router={browserRouterObj}/>
    </UserAuthorContext>
  </StrictMode>,
)
