// Google analytics

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-9335012-2', 'mpc-hc.org');
ga('set', 'anonymizeIp', true);
ga('send', 'pageview');

//{% if page.name == "downloads" or page.name == "home" %}
(function() {
    var el = document.createElement('script');
    el.src = '//sourceforge.net/accelerator/js?partner_id=72';
    el.defer = true;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(el, s);
})();
//{% endif %}
