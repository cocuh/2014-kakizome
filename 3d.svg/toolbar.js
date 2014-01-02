/**
 * Created by cocu on 1/2/14.
 */
Toolbar = {};
Toolbar.init = function(){
    Toolbar.create();
    Toolbar.set_handler();
};
Toolbar.create = function(){
    var main_svg = document.getElementById('svg');
    var g = SVGObj.createElement('g');
    g.setId('toolbar');
    main_svg.appendChild(g());
    var toggle_width = 18;
    
    var elem_background = SVGObj.createElement('use');
    var elem_link = SVGObj.createElement('use');
    var elem_title = SVGObj.createElement('use');
    var elem_toggle = SVGObj.createElement('use');
    elem_background.setAttributeNS(SVGObj.xlinkns,'xlink:href','#toolbar_background');
    elem_link.setAttributeNS(SVGObj.xlinkns,'xlink:href','#toolbar_link');
    elem_link.setAttribute('clip-path',"url(#toolbar_clip)");
    elem_title.setAttributeNS(SVGObj.xlinkns,'xlink:href','#toolbar_title');
    elem_title.setAttribute('clip-path',"url(#toolbar_clip)");
    elem_toggle.setAttributeNS(SVGObj.xlinkns,'xlink:href','#toolbar_toggle');
    elem_toggle.setAttribute('transform','translate('+(135-toggle_width)+','+(175-toggle_width)+') rotate(0)');
    
    g.appendChild(elem_background());
    g.appendChild(elem_link());
    g.appendChild(elem_title());
    g.appendChild(elem_toggle());
};
Toolbar.set_handler = function(){
    var dx = 0;
    var Max_count = 10;
    var count = Max_count;
    var d_background = {d_width:(135-18)/Max_count,d_height:(175-18)/Max_count};
    var loop = function(){
        var elem = document.getElementById("toolbar_background");
        var x=parseFloat(elem.getAttribute('width'))+dx*d_background.d_width;
        var y = parseFloat(elem.getAttribute('height'))+dx*d_background.d_height;
        elem.setAttributeNS(null,'width',x);
        elem.setAttributeNS(null,'height',y);
        elem = document.getElementById("toolbar_clip_rect");
        elem.setAttributeNS(null,'width',parseFloat(elem.getAttribute('width'))+dx*d_background.d_width);
        elem.setAttributeNS(null,'height',parseFloat(elem.getAttribute('height'))+dx*d_background.d_height);
        elem = document.getElementById('toolbar_toggle');
        elem.setAttributeNS(null,'transform','translate('+(x-135)+','+(y-175)+')');
        elem.setAttribute('dx',x);elem.setAttribute('dy',y);
        elem = document.getElementById('toolbar_toggle_path');
        count+=dx;
        if(count==0){elem.setAttributeNS(null,'transform','translate(18,18) rotate(180)')}
        if(count==Max_count){elem.setAttributeNS(null,'transform','rotate(0)')}
        if(count!=0 && count !=Max_count){
            setTimeout(loop,30)
        }
    };
    var callback = function(evnt){
        if(count == Max_count){
            dx = -1;
            setTimeout(loop,30)
        }else if(count == 0){
            dx = 1;
            setTimeout(loop,30)
        }else{
            dx = 0;
            return null;
        }
        
    };
    document.getElementById('toolbar_toggle').onclick=callback
};
