module.exports = {
    devServer: {
      setupMiddlewares: (middlewares, devServer) => {
        // your setup logic for before
        middlewares.unshift((req, res, next) => {
          // Custom middleware for before setup
          next();
        });
  
        // your setup logic for after
        middlewares.push((req, res, next) => {
          // Custom middleware for after setup
          next();
        });
  
        return middlewares;
      }
    }
  };
  