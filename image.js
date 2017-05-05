function SimpleImage(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.imageData = this.context.getImageData(0, 0, this.width, this.height);
    this.data = this.imageData.data;
    this.original_data = this.data.slice();
}

SimpleImage.prototype = {
    reset: function() {
        for (var i = 0; i < this.data.length; i++) {
            this.data[i] = this.original_data[i];
        }
    },

    render: function() {
        this.context.putImageData(this.imageData, 0, 0);
    },

    _getIndex: function (x, y) {
        return ((Math.floor(y) * this.width) + Math.floor(x)) * 4;
    },

    getPixel: function (x, y) {
        var i = this._getIndex(x, y);
        return {
            r: this.data[i],
            g: this.data[i+1],
            b: this.data[i+2],
            a: this.data[i+3]
        };
    },

    setPixel: function (x, y, pixel) {
        if (!("a" in pixel)) {
            pixel.a = 255;
        }

        var i = this._getIndex(x, y);
        this.data[i] = pixel.r;
        this.data[i+1] = pixel.g;
        this.data[i+2] = pixel.b;
        this.data[i+3] = pixel.a;
    }
};
