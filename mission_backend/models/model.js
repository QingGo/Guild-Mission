var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/db1", function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
        var schema = new mongoose.Schema({ num:Number, name: String, size: String});
        var MyModel = mongoose.model('MyModel', schema);
        var doc1 = new MyModel({ size: 'small' });
        doc1.save(function (err,doc) {
            //{ __v: 0, size: 'small', _id: 5970daba61162662b45a24a1 }
              console.log(doc);
            })
    }
});