var kolba = require('kolba');
var app = new kolba.App();

app.resource('^/$', function() {
    return 'DERP';
});

app.run(5000);
