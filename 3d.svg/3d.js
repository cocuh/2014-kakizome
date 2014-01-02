/**
 * Created by cocu on 1/2/14.
 */
var Offset={'x':0,'y':0};

Point = function (vec) {
    this.vec = vec;
    this.ScaleFunction = 1000;
    this.pos = {};

    this.move = function (xx, yy, zz) {
        this.vec.x = xx;
        this.vec.y = yy;
        this.vec.z = zz;
    };
    this.calc_pos = function (matrix) {
        var res = [0,0];
        for (var i = 0; i < 2 ; i++) {
            var line = matrix[i];
            res[i]=line[0]*this.vec.x+line[1]*this.vec.y+line[2]*this.vec.z;
        }
        this.pos = {'x':res[0],'y':res[1]};
        return this.pos;
    };
    this.get_str_pos = function(matrix){
        var pos = this.calc_pos(matrix);
        var x = Math.floor(pos.x*this.ScaleFunction)/this.ScaleFunction+Offset.x;
        var y = Math.floor(pos.y*this.ScaleFunction)/this.ScaleFunction+Offset.y;
        return ''+x+','+y
    };
};


gen_tranformMatrix = function(view_vec){
    view_vec.normalize();
    var a = view_vec.x;
    var b = view_vec.y;
    var c = view_vec.z;
    var zoom = 75;
    var v1 = new Vector3d(c,0,-a);
    var v2_x = (a*b)/Math.sqrt(Math.abs(Math.pow(view_vec.size(),2)-2*a*a*b*b-2*b*b*c*c));
    var v2_y = -v2_x*(a*a+c*c)/(a*b);
    var v2_z = v2_x*c/a;
    if(a===0){v2_x=0;v2_y=-c;v2_z=b}
    if(b===0){v2_x=c;v2_y=0;v2_z=a}
    if(c===0){v2_x=b;v2_y=a;v2_z=0}
    var v2 = new Vector3d(v2_x,v2_y,v2_z);
    v1.normalize();
    v2.normalize();
    var matrix = [
        [v1.x,v1.y,v1.z],
        [v2.x,v2.y,v2.z],
        [a,b,c]
    ];
    for(var i = 0;i<3;i++){
        for(var j=0;j<3;j++){
            matrix[i][j]*=zoom;
        }
    }
    return matrix
};


Polygon = function (elem,point_array) {
    this.elem = elem;
    this.data = point_array;
    this.gen_d = function(matrix){
        var length = this.data.length;
        var res = '';
        for(var i = 0; i<length;i++){
            if(i===0){
                res+="M";
            }else{
                res+=" L";
            }
            res+=this.data[i].get_str_pos(matrix);
        }
        res+='Z';
        return res;
    };
    this.move=function(matrix){
        var d = this.gen_d(matrix);
        this.elem.setAttribute('d',d);
    };
};

Line = function(elem, point_array){
    this.elem = elem;
    this.data = point_array;
    this.move = function(matrix){
        var pos1 = this.data[0].calc_pos(matrix);
        var pos2 = this.data[1].calc_pos(matrix);
        this.elem.setAttrDict({
            'x1':pos1.x+Offset.x,
            'y1':pos1.y+Offset.y,
            'x2':pos2.x+Offset.x,
            'y2':pos2.y+Offset.y
        });
    };
};

Seane = function(iscript){
    var main_svg = document.getElementById('svg');
    var view_vec = new Vector3d(1,1,1);
    var script=iscript;
    var refresh = script.refresh;
    
    var points = [];
    var polygons = [];
    var lines = [];
    
    var count = 45;
    var main_g = null;
    
    this.init = function(){
        this.init_points(script.init_points());
        this.init_lines();
        this.init_polygons(script.init_polygons());
    };
    this.init_points = function(point_array){
        for(var i=0;i<point_array.length;i++){
            var line = point_array[i];
            var p = new Point(new Vector3d(line[0],line[1],line[2]));
            points.push(p);
        }
    };
    this.init_polygons = function(poly_array){
        var g = SVGObj.createElement('g');
        main_svg.appendChild(g());
        for(var i=0;i<poly_array.length;i++){
            var point_array = [];
            for(var j=0;j<poly_array[i].length;j++){
                point_array.push(points[poly_array[i][j]]);
            }
            var elem = SVGObj.createElement('path');
            elem.setAttribute('class','polygon');
            var p = new Polygon(elem,point_array);
            polygons.push(p);
            g.appendChild(elem());
        }
        main_g = g;
    };
    this.init_lines = function(){
        var elem_line_x = SVGObj.createElement('line');
        var elem_line_y = SVGObj.createElement('line');
        var elem_line_z = SVGObj.createElement('line');
        elem_line_x.setAttribute('class','line_x');
        elem_line_y.setAttribute('class','line_y');
        elem_line_z.setAttribute('class','line_z');
        var x1 = new Point(new Vector3d(100,0,0));
        var x2 = new Point(new Vector3d(-100,0,0));
        var y1 = new Point(new Vector3d(0,100,0));
        var y2 = new Point(new Vector3d(0,-100,0));
        var z1 = new Point(new Vector3d(0,0,100));
        var z2 = new Point(new Vector3d(0,0,-100));
        lines.push(new Line(elem_line_x,[x1,x2]))
        lines.push(new Line(elem_line_y,[y1,y2]))
        lines.push(new Line(elem_line_z,[z1,z2]))
        main_svg.appendChild(elem_line_x());
        main_svg.appendChild(elem_line_y());
        main_svg.appendChild(elem_line_z());
    };
    this.draw = function(){
        Offset.x = window.innerWidth/2;
        Offset.y = window.innerHeight/2;
        refresh(points);
        
        var s2 = Math.sqrt(2);
        count++;
        count %= 360;
        view_vec.set(s2 * Math.sin(2 * Math.PI * count / 360), 1, s2 * Math.cos(2 * Math.PI * count / 360));
        view_vec.normalize();
        
        var matrix = gen_tranformMatrix(view_vec);
        var i;
        for(i=polygons.length-1;i>=0;i--){
            polygons[i].move(matrix);
        }
        for(i=lines.length-1;i>=0;i--){
            lines[i].move(matrix);
        }
        
        if('next' in script){
            var next = script.next();
            if(next){
                return next;
            }
        }
        return null;
    };
    this.start = function(){
        this.init();
    };
    this.restart = function(inpscript){
        main_svg.removeChild(main_g())
        script = inpscript;
        polygons = [];
        points = [];
        refresh = script.refresh;
        this.init_points(script.init_points());
        this.init_polygons(script.init_polygons());
        this.draw()
    };
};