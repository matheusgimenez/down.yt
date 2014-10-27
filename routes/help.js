/*
 *  * GET help page.
 */

exports.help = function(req, res){
  css = 'style-help.css';
  res.render('help', { url: siteinfo.url });
};
