/**
 * Created by cocu on 1/2/14.
 */

Vector3d = function (xx, yy, zz) {
    this.x = xx;
    this.y = yy;
    this.z = zz;

    this.set = function(xx,yy,zz){
        this.x = xx;
        this.y = yy;
        this.z = zz;
    };
    this.size = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    this.normalize = function () {
        var size = this.size();
        if (size === 0) {
            return;
        }
        this.x /= size;
        this.y /= size;
        this.z /= size;
    };
    this.duplicate = function () {
        return new Vector3d(this.x, this.y, this.z);
    };
};

Vector2d = function (xx, yy) {
    this.x = xx;
    this.y = yy;
    this.size = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    };
    
    this.normalize = function () {
        var size = this.size();
        if (size === 0) {
            return;
        }
        this.x /= size;
        this.y /= size;
    };
    
    this.duplicate = function(){
        return new Vector2d(this.x,this.y);
    };
};