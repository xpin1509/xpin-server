'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index)
  router.post('/login', controller.login.index)
  
  router.get('/packinfo/getinfo', controller.packinfo.getinfo);
  router.get('/packinfo/getAll', controller.packinfo.getAll);
  router.post('/packinfo/getAllByParam', controller.packinfo.getAllByParam);
  router.get('/packinfo/getList', controller.packinfo.getList);
  router.post('/packinfo/update', controller.packinfo.create);
  router.post('/packinfo/deleteItem', controller.packinfo.deleteItem);

  router.post('/send/dingdingMsg', controller.dingdingMsg.send);
};
