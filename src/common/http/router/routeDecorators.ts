import * as Koa from 'koa';
import { HttpMethod } from './httpMethodEnum';
import { RouteManager } from './routeManager';

export interface IRouteItem {
  target?: any;
  method: string;
  path: string;
  ctrlHandle: (ctx: Koa.ParameterizedContext, next: Koa.Next) => void;
  middlewares?: ((ctx: Koa.ParameterizedContext, next: Koa.Next) => void)[];
}

export function route(
  method: HttpMethod,
  path: string,
  ...middlewares: ((ctx: Koa.Context, next: Koa.Next) => void)[]
) {
  return (target, name: string, value: PropertyDescriptor) => {
    const item: IRouteItem = {
      target,
      method,
      path,
      ctrlHandle: target[name],
    };
    if (middlewares && middlewares.length) {
      item.middlewares = middlewares;
    }

    RouteManager.Current.AddRoute(item);
  };
}
