import React from 'react';
import Router from 'next/router';
import { getCookie } from 'utils/cookie';
import fetch from 'isomorphic-unfetch';
import { apiUrl } from 'services/api';
import { appUtils } from 'utils/appUtils';

export const validarPermissoes = (serverPermissions = [], permissions = []) => {
  if (appUtils.isNullOrUndefined(permissions) || permissions.length === 0) {
    return true;
  }
  if (appUtils.isNullOrUndefined(serverPermissions) || serverPermissions.length === 0) {
    return false;
  }
  return permissions.every(x => serverPermissions.find(y => y.nome === x));
};

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component => Component.displayName || Component.name || 'Component';

export const auth = async (ctx, permissions) => {
  const token = getCookie('auth', ctx.req);
  if (appUtils.isNullOrUndefined(token)) {
    if (ctx.req && typeof ctx.res.writeHead === 'function') {
      ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end();
      return null;
    }
    Router.replace('/');
    return null;
  }
  const res = await fetch(`${apiUrl}conta/Papeis/`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
    mode: 'cors',
    cache: 'default',
  });
  const serverPermissions = await res.json();
  const haveAccess = validarPermissoes(serverPermissions, permissions);
  if (ctx.req && !haveAccess) {
    if (typeof ctx.res.writeHead === 'function' && typeof ctx.res.end === 'function') {
      ctx.res.writeHead(302, { Location: '/erro/nao-autorizado' });
      ctx.res.end();
      return null;
    }
  }
  if (!haveAccess) {
    Router.replace('/erro/nao-autorizado');
    return null;
  }
  return token;
};


const withAuth = (WrappedComponent, permissions = ['usuario']) => {
  const WithAuth = (props) => <WrappedComponent {...props} />;
  WithAuth.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;
  WithAuth.getInitialProps = async (ctx) => {
    const token = await auth(ctx, permissions);
    const componentProps = WrappedComponent.getInitialProps
    && (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, token };
  };
  return WithAuth;
};


export default withAuth;
