const METHODS = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
];

class Route {
  constructor(pathname, handler) {
    this.pathname = pathname;
    this.handler = handler;
  }
}

class Router {
  constructor() { 
    this._routes = {};
    METHODS.forEach(method => {
      this._routes[method] = [];
      /**
       * Adding registering methods for all HTTP-methods in METHODS variable
       */
      this[method.toLowerCase()] = (pathname, handler) => {
        const route = new Route(pathname, handler);

        this._routes[method].push(route);
      };
    });
  }

  _routeExists(pathname, method) {
    return this._routes[method]
      .filter(route => route.pathname === pathname).length > 0;
  }
  
  handle(req, res) {
    const { url, method } = req;

    if (this._routeExists(url, method)) {
      const { handler } = this._routes[method]
        .find(route => route.pathname === url);

      handler(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: '404 Route not found' }));
    }
  }
};

module.exports = Router;
