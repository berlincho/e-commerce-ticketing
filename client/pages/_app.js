import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

export default function AppComponent ({ Component, pageProps, currentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} /> 
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  //console.log(Object.keys(appContext));
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser');

  // Child component getInitialProps()
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }
    

  console.log(data);
  return {
    pageProps,
    ...data,
  };
};