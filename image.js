function SimpleImage(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.img = this.context.getImageData(0, 0, this.width, this.height);
    this.original_data = this.img.data.slice();
}

SimpleImage.prototype = {
    reset: function() {
        for (var i = 0; i < this.img.data.length; i++) {
            this.img.data[i] = this.original_data[i];
        }
    },

    render: function() {
        this.context.putImageData(this.img, 0, 0);
    },

    _getIndex: function (x, y) {
        return ((y * this.width) + x) * 4;
    },

    getPixel: function (x, y) {
        var i = this._getIndex(x, y);
        return {
            r: this.img.data[i],
            g: this.img.data[i+1],
            b: this.img.data[i+2],
            a: this.img.data[i+3]
        };
    },

    setPixel: function (x, y, pixel) {
        if (!("a" in pixel)) {
            pixel.a = 255;
        }

        var i = this._getIndex(x, y);
        this.img.data[i] = pixel.r;
        this.img.data[i+1] = pixel.g;
        this.img.data[i+2] = pixel.b;
        this.img.data[i+3] = pixel.a;
    }
};
