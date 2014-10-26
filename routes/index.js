/*
 *  * GET home page.
 */

exports.index = function(req, res){
  css = 'style.css';
  res.render('index', { url: siteinfo.url });
};
