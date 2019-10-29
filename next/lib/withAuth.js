import React from 'react';
import Router from 'next/router';
import { getCookie } from 'utils/cookie';

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component => Component.displayName || Component.name || 'Component';

export const auth = ctx => new Promise((resolve) => {
  const token = getCookie('auth', ctx.req);
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
    return;
  }
  if (!token) {
    Router.push('/');
  }
  resolve(token);
});


const withAuth = WrappedComponent => {
  const WithAuth = (props) => <WrappedComponent {...props} />;
  WithAuth.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;
  WithAuth.getInitialProps = async (ctx) => {
    const token = await auth(ctx);
    // TODO pingar no servidor e verificar se o token é valido
    const componentProps = WrappedComponent.getInitialProps
    && (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, token };
  };
  return WithAuth;
};


export default withAuth;