/*
 *  * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { url: siteinfo.url });
};
