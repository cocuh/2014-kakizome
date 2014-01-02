data = {};

(function () {



    var count = 0;
    var s2 = Math.sqrt(2);
    var s5 = Math.sqrt(5);
    var sin = function(ratio){return Math.sin(ratio)};
    var cos = function(ratio){return Math.cos(ratio)};
    var PI = Math.PI;
    data.triangle = {
        'init_points': function () {
            return [
                [0, 0, 1],
                [0, 1, 0],
                [1, 0, 0],
            ]
        },
        'init_polygons': function () {
            return [
                [0, 1, 2],
            ]
        },
        'refresh': function ( points) {
            points[1].vec.x = Math.cos(6 * Math.PI * count / 360);
            points[1].vec.z = Math.sin(6 * Math.PI * count++ / 360);
            count++;
            count %= 3600;
        },
        'next':function(){
            
        }
    };


    data.cube = {
        'init_points': function () {
            return [
                [1, 1, 1],
                [1, 1, -1],
                [1, -1, 1],
                [1, -1, -1],
                [-1, 1, 1],
                [-1, 1, -1],
                [-1, -1, 1],
                [-1, -1, -1]
            ]
        },
        'init_polygons': function () {
            return [
                [0, 1, 3, 2],
                [0, 2, 6, 4],
                [0, 1, 5, 4],
                [7, 3, 1, 5],
                [7, 3, 2, 6],
                [6, 7, 5, 4]
            ]
        },
        'refresh': function ( points) {
        },
        'next':function(){
        }
    };

    
    data.tsuru = {
        'init_points':function(){
            return [
                [5,0,0],
                [0,0,5],
                [-5,0,0],
                [0,0,-5]
            ]
        },
        'init_polygons':function(){
            return [[0,1,2,3]]
        },
        'refresh':function(points){
        },
        'next':function(){
            if(count>10){
                count = 0;
                return data.tsuru1;
            }else{
                count++;
            }
        }
    };
    

    data.tsuru1 = {
        'init_points': function () {
            return [
                [0, 0, 0],        //0
                [5, 0, 0],        //1
                [-5, 0, 0],        //2
                
                [0, 0, 5],        //3
                [5/2,0,5/2],      //4
                [-5/2,0,5/2],      //5
                
                [0, 0, -5],        //6
                [5/2,0,-5/2],      //7
                [-5/2,0,-5/2],      //8
            ];
        },
        'init_polygons': function () {
            return [
                [0, 1, 4],
                [0, 4, 3],
                [0,3,5],
                [0,5,2],
                
                [0, 1, 7],
                [0, 7, 6],
                [0,6,8],
                [0,8,2],
            ];
        },
        'refresh': function (points) {
            count++;
            var Max = 100;
            var n_Max = 130;
            
            if(count>n_Max){return}
            
            if(count>Max){
                var t = (count - Max)/(n_Max - Max);
                var r = Math.sqrt(25/4);
                var s = sin(PI/4+t*PI/4);
                var c = cos(PI/4+t*PI/4);
                points[4].vec.x =  s*r;
                points[4].vec.z =  c*r;
                points[5].vec.x = -s*r;
                points[5].vec.z =  c*r;
                points[7].vec.x =  s*r;
                points[7].vec.z = -c*r;
                points[8].vec.x = -s*r;
                points[8].vec.z = -c*r;
                
                return;
            }
            
            var t = count/Max;
            var top_y = t*5/2;
            points[0].vec.y = top_y;
            
            var y = top_y-5*sin(t*PI/2);
            var x = 5*cos(t*PI/2);
            var r = Math.sqrt(25/2-top_y*top_y);
            
            points[1].vec.y = y;
            points[2].vec.y = y;
            points[3].vec.y = y;
            points[6].vec.y = y;
            
            points[1].vec.x = x;
            points[2].vec.x = -x;
            points[3].vec.z = x;
            points[6].vec.z = -x;
            
            points[4].vec.x = r/s2;
            points[4].vec.z = r/s2;
            points[5].vec.x = -r/s2;
            points[5].vec.z = r/s2;
            points[7].vec.x = r/s2;
            points[7].vec.z = -r/s2;
            points[8].vec.x = -r/s2;
            points[8].vec.z = -r/s2;
            
        },
        'next':function(){
            if(count == 140){
                count = 0;
                return data.tsuru2;
            }
        }
    };
    
    data.tsuru2 = {
        'init_points':function(){
            return [
                [0,5/2,0],
                
                [5/4,5/4,0],//1
                [-5/4,5/4,0],//2
                [-5/4,5/4,0],//3
                [5/4,5/4,0],//4
                
                [5/2,0,0],//5
                [-5/2,0,0],//6
                [-5/2,0,0],//7
                [5/2,0,0],//8
                
                [0,-5/2,0],//9
                [0,-5/2,0],//10
                [0,-5/2,0],//11
                [0,-5/2,0]//12
            ]
        },
        'init_polygons':function(){
            return [
                [0,1,2],
                [0,3,4],
                
                [0,9,1],
                [0,9,4],
                [0,11,2],
                [0,11,3],
                
                [1,2,10],
                [3,4,12],
                
                [1,5,9],
                [1,5,10],
                [2,6,10],
                [2,6,11],
                [3,7,11],
                [3,7,12],
                [4,8,12],
                [4,8,9],
            ]
        },
        'refresh':function(points){count++;
            var Max = 100;
            var ratio = count/Max;
            if(count>Max){return}
            
            var base_y=(1-ratio)*5/4;
            
            var by = -cos(PI*ratio)*5*3/4+base_y;
            var bx = sin(PI*ratio)*5*3/4;
            points[10].vec.y = by;
            points[12].vec.y = by;
            points[10].vec.z = bx;
            points[12].vec.z = -bx;
            
            var mx = cos(PI*ratio)*5/4+5/4;
            var my = 0;
            var mz = points[10].vec.z/2;
            points[5].vec.x = mx;
            points[6].vec.x = -mx;
            points[7].vec.x = -mx;
            points[8].vec.x = mx;
            
            points[5].vec.y = my;
            points[6].vec.y = my;
            points[7].vec.y = my;
            points[8].vec.y = my;
            
            points[5].vec.z = mz;
            points[6].vec.z = mz;
            points[7].vec.z = -mz;
            points[8].vec.z = -mz;
            
            points[0].vec.y = 5/4+base_y;
            points[1].vec.y = base_y;
            points[2].vec.y = base_y;
            points[3].vec.y = base_y;
            points[4].vec.y = base_y;
            points[9].vec.y = -5/2-5/4+base_y;
            points[11].vec.y = -5/2-5/4+base_y;
        },
        'next':function(){
            if(count == 110){
                count = -3;
                return data.tsuru3
            }
        }
    }
    
    data.tsuru3 = {
        'init_points':function(){
            var i = 0.54;
            var j = 0.45;
            return[
                [0,5/4,0],          //0
                
                [5/4,0,0],          //1
                [-5/4,0,0],         //2
                [-5/4,0,0],         //3
                [5/4,0,0],          //4
                
                [0,-5*3/4,0],       //5
                [0,5*3/4,0],        //6
                [0,-5*3/4,0],       //7
                [0,5*3/4,0],        //8
                
                [ i*5/4,(1-i)*5*3/4,0],        //9
                [-i*5/4,(1-i)*5*3/4,0],      //10
                [-i*5/4,(1-i)*5*3/4,0],      //11
                [ i*5/4,(1-i)*5*3/4,0],        //12
                
                [ j*5/4,(1-j)*5/4,0],          //13
                [-j*5/4,(1-j)*5/4,0],        //14
                [-j*5/4,(1-j)*5/4,0],        //15
                [ j*5/4,(1-j)*5/4,0],          //16
                
                [ 0.4*5/4,0,0],     //17
                [-0.4*5/4,0,0],    //18
                [-0.4*5/4,0,0],    //19
                [ 0.4*5/4,0,0],     //20
                
                [0,0,0]
            ]
        },
        'init_polygons':function(){
            return [
                [0,15,19,21,20,16],
                [0,13,17,21,18,14],
                
                [1,13,17],
                [2,14,18],
                [3,15,19],
                [4,16,20],
                
                [1,9,17],
                [2,10,18],
                [3,11,19],
                [4,12,20],
                
                [6,9,17,21],
                [6,10,18,21],
                [8,11,19,21],
                [8,12,20,21],
                
                [1,17,5],
                [2,18,7],
                [3,19,7],
                [4,20,5],
            ]
        },
        'refresh':function(points){count++;
            if(count<0){return}
            var Max = 100;
            var Max2 = 200;
            var min2 = 110;
            if(Max > count){
                var t = count/Max;
                var mx = cos(PI*t)*(5/8)+5/8;
                var my = t*5/16
                var mz = sin(PI*t)*(5/8);
                points[1].vec.x = mx;
                points[2].vec.x = -mx;
                points[3].vec.x = -mx;
                points[4].vec.x = mx;
                points[1].vec.y =  my;
                points[2].vec.y =  my;
                points[3].vec.y =  my;
                points[4].vec.y =  my;
                points[1].vec.z =  mz;
                points[2].vec.z =  mz;
                points[3].vec.z = -mz;
                points[4].vec.z = -mz;
            }else if(Max2-6>count && min2<count){
                var t = (count-min2)/(Max2-min2);
                var bx = 5*3/4*sin(t*PI);
                var by = -5*3/4*cos(t*PI);
                points[5].vec.x=bx;
                points[5].vec.y=by;
                points[7].vec.x=-bx;
                points[7].vec.y=by;
                
                var mz = 0.5*sin((count-min2)/(Max2-min2-6)*PI);
                points[9].vec.z =  mz;
                points[10].vec.z =  mz;
                points[11].vec.z = -mz;
                points[12].vec.z = -mz;
                points[13].vec.z =  mz;
                points[14].vec.z =  mz;
                points[15].vec.z = -mz;
                points[16].vec.z = -mz;
                points[17].vec.z =  mz;
                points[18].vec.z =  mz;
                points[19].vec.z = -mz;
                points[20].vec.z = -mz;
            }else{
                return;
            }
        },
        'next':function(){
            if(count>210){
            count = 0;
                return data.tsuru4}
        }
    }
     
    data.tsuru4 = {
        'init_points':function(){
            var i = 0.54;
            var j = 0.45;
            var x = 0.6;
            var y = 0.7;
            return[
                [0,5/4,0],          //0
                
                [ 0,5/16,0],          //1
                [ 0,5/16,0],         //2
                [ 0,5/16,0],         //3
                [ 0,5/16,0],          //4
                
                [0.9,3.638,0],       //5
                [0,5*3/4,0],        //6
                [-0.9,3.638,0],       //7
                [0,5*3/4,0],        //8
                
                [ i*5/4,(1-i)*5*3/4,0.018],        //9
                [-i*5/4,(1-i)*5*3/4,0.018],      //10
                [-i*5/4,(1-i)*5*3/4,-0.018],      //11
                [ i*5/4,(1-i)*5*3/4,-0.018],        //12
                
                [ j*5/4,(1-j)*5/4,0.018],          //13
                [-j*5/4,(1-j)*5/4,0.018],        //14
                [-j*5/4,(1-j)*5/4,-0.018],        //15
                [ j*5/4,(1-j)*5/4,-0.018],          //16
                
                [ 0.4*5/4,0,0.018],     //17
                [-0.4*5/4,0,0.018],    //18
                [-0.4*5/4,0,-0.018],    //19
                [ 0.4*5/4,0,-0.018],     //20
                
                [0,0,0],
                
                [0.88*x,3.638*x,0], //22
                [0.9*y+(1-y)*0.4*5/4,3.638*y,0],//23
                
                [0,(5/4)/4,0],//24
                [0,(5/4)/4,0]//25
            ]
        },
        'init_polygons':function(){
            return [
                [0,15,19,21,20,16],
                [0,13,17,21,18,14],
                
                [1,13,17],
                [2,14,18],
                [3,15,19],
                [4,16,20],
                
                [1, 9,13,17],
                [2,10,14,18],
                [3,11,15,19],
                [4,12,16,20],
                
                [6, 9,13,17,21],
                [6,10,14,18,21],
                [8,11,15,19,21],
                [8,12,16,20,21],
                
                [1,17,23,22],
                [2,18,7],
                [3,19,7],
                [4,20,23,22],
                [22,23,5],
                [22,23,5],
                
                [13,24,16,15,25,14]
            ]
        },
        'refresh':function(points){count++;
            var Max1 = 30;
            var Max2 = 120;
            if(Max1>count){
                var dx = 0.7;
                var dy = -1.6;
                
                points[5].vec.x += dx/Max1;
                points[5].vec.y += dy/Max1;
            }else if(Max2 > count){
                var t = (count-Max1)/(Max2-Max1);
                var ty = -sin(t*PI/2)*(5*3/4-0.6875)+5*3/4;
                var tz = sin(t*PI/2)*(5*3/4-0.6875);
                points[6].vec.y = ty;
                points[8].vec.y = ty;
                points[6].vec.z = tz;
                points[8].vec.z = -tz;
                
                var my = ty*(1.725/(5*3/4));
                var mz = 0.018+tz*(1.725/(5*3/4))
                
                points[9].vec.y = my
                points[9].vec.z = mz
                points[10].vec.y = my
                points[10].vec.z = mz
                points[11].vec.y = my
                points[11].vec.z = -mz
                points[12].vec.y = my
                points[12].vec.z = -mz
                
                var dz = 0.4/(Max2-Max1);
                points[13].vec.z+=dz;
                points[14].vec.z+=dz;
                points[15].vec.z-=dz;
                points[16].vec.z-=dz;
                
                var dy = 0.3/(Max2-Max1);
                points[0].vec.y-=dy*1;
                points[13].vec.y-=dy;
                points[14].vec.y-=dy;
                points[15].vec.y-=dy;
                points[16].vec.y-=dy;
                
                points[7].vec.y -= 1.2*dy;
                points[7].vec.x -= 1.2*dy;
            }
        }
    }
})();


main = function () {

    var data_set = null;
    if (window.location.search) {
        data_set = data[window.location.search.slice(1)];
    }
    if (!data_set) {
        data_set = data['tsuru'];
    }
    var s = new Seane(data_set);
    s.start();
    s.draw();
    Toolbar.init();
    
    drawer = function(){
        var next = s.draw();
        if(!next){
            setTimeout(drawer,30)
        }else{
            s.restart(next);
            setTimeout(drawer,30)
        }
    };
    drawer();
};