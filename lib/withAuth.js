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

export const withAuth = async (ctx, permissions) => {
  const token = getCookie('auth', ctx.req);
  if (appUtils.isNullOrUndefined(token)) {
    if (ctx.res && typeof ctx.res.writeHead === 'function') {
      ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end();
    } else {
      Router.push('/');
    }
    return {};
  }
  const res = await fetch(`${apiUrl}conta/papeis/`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
    mode: 'cors',
    cache: 'default',
  });
  const serverPermissions = await res.json();
  const haveAccess = validarPermissoes(serverPermissions, permissions);
  if (ctx.res && !haveAccess) {
    if (typeof ctx.res.writeHead === 'function' && typeof ctx.res.end === 'function') {
      ctx.res.writeHead(302, { Location: '/erro/nao-autorizado' });
      ctx.res.end();
    }
  }
  if (!ctx.res && !haveAccess) {
    Router.push('/');
    return {};
  }
  return token;
};


export default withAuth;
