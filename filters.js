/*
 * All the filters
 */

function noFilter(image, percent) {
}

function invertFilter(image, percent) {
    var x, y, pixel;

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            pixel = image.getPixel(x, y);
            image.setPixel(x, y, {
                r: parseInt(((255 - pixel.r)*percent) + (pixel.r*(1-percent))),
                g: parseInt(((255 - pixel.g)*percent) + (pixel.g*(1-percent))),
                b: parseInt(((255 - pixel.b)*percent) + (pixel.b*(1-percent)))
            });
        }
    }
}

function gridFilter(image, percent) {
    var x, y, pixel;
    var gridSize = parseInt(80*percent) + 3;

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            pixel = image.getPixel(x, y);
            if (x%gridSize == 0 || y%gridSize == 0) {
                image.setPixel(x, y, {
                    r: 255,
                    g: 255,
                    b: 255
                });
            }
            else{
                // do nothing to the pixel
            }
        }
    }
}

function motionBlurFilter(image, percent) {
    var x, y, pixel;
    var per = parseInt(15*percent)+6;
    if(per%2 == 0){
        per++;
    }

    var filter = new Array();

    for (var q = 0; q < per; q++){
        filter[q] = new Array();
        for (var r = 0; r < per; r++){
            if (q == r){
                 filter[q][r] = 1;
            }
            else{
                filter[q][r] = 0;
            }
        }
    }

    var filterSize = filter.length;
    var filterLen = (filterSize - 1) / 2;
    var counterR = 0;
    var counterG = 0;
    var counterB = 0;

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            for(var a = -filterLen; a < (filterLen+1); a++) {
            for (var b = -filterLen; b < (filterLen+1); b++) {
                if((x+a)>= 0 && (x+a)<= image.width && (y+b)>= 0 && (y+b)<= image.height){
                    pixel = image.getPixel(x+a, y+b);
                }
                else if((x+a)>= 0 && (x+a)<= image.width){
                    pixel = image.getPixel(x+a, y);
                }
                else if((y+b)>= 0 && (y+b)<= image.height){
                    pixel = image.getPixel(x, y+b);
                }
                else{
                    pixel = image.getPixel(x, y);
                }
                counterR = counterR + filter[filterLen+a][filterLen+b]*pixel.r;
                counterG = counterG + filter[filterLen+a][filterLen+b]*pixel.g;
                counterB = counterB + filter[filterLen+a][filterLen+b]*pixel.b;
            }
            }
            image.setPixel(x, y, {
                r: parseInt((1.0/per)*counterR),
                g: parseInt((1.0/per)*counterG),
                b: parseInt((1.0/per)*counterB)
            });
            counterR = 0;
            counterG = 0;
            counterB = 0;
        }
    }
}

function blurFilter(image, percent) {
    var x, y, pixel;
    var per = parseInt(15*percent)+1;
    if(per%2 == 0){
        per++;
    }

    var filter = new Array();

    for (var q = 0; q < per; q++){
        filter[q] = new Array();
        for (var r = 0; r < per; r++){
             filter[q][r] = 1;
        }
    }

    var filterSize = filter.length;
    var filterLen = (filterSize - 1) / 2;
    var counterR = 0;
    var counterG = 0;
    var counterB = 0;

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            for(var a = -filterLen; a < (filterLen+1); a++) {
            for (var b = -filterLen; b < (filterLen+1); b++) {
                if((x+a)>= 0 && (x+a)<= image.width && (y+b)>= 0 && (y+b)<= image.height){
                    pixel = image.getPixel(x+a, y+b);
                }
                else if((x+a)>= 0 && (x+a)<= image.width){
                    pixel = image.getPixel(x+a, y);
                }
                else if((y+b)>= 0 && (y+b)<= image.height){
                    pixel = image.getPixel(x, y+b);
                }
                else{
                    pixel = image.getPixel(x, y);
                }
                counterR = counterR + filter[filterLen+a][filterLen+b]*pixel.r;
                counterG = counterG + filter[filterLen+a][filterLen+b]*pixel.g;
                counterB = counterB + filter[filterLen+a][filterLen+b]*pixel.b;
            }
        }
            image.setPixel(x, y, {
                r: parseInt((1.0/(per*per))*counterR),
                g: parseInt((1.0/(per*per))*counterG),
                b: parseInt((1.0/(per*per))*counterB)
            });
            counterR = 0;
            counterG = 0;
            counterB = 0;
        }
    }
}

function sharpFilter(image, percent) {
    var x, y, pixel;
    var per = parseInt(15*percent)+3;
    if(per%2 == 0){
        per++;
    }

    var filter = new Array();

    for (var q = 0; q < per; q++){
        filter[q] = new Array();
        for (var r = 0; r < per; r++){
             filter[q][r] = 1;
        }
    }

    var filterSize = filter.length;
    var filterLen = (filterSize - 1) / 2;
    var counterR = 0;
    var counterG = 0;
    var counterB = 0;

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            for(var a = -filterLen; a < (filterLen+1); a++) {
            for (var b = -filterLen; b < (filterLen+1); b++) {
                if((x+a)>= 0 && (x+a)<= image.width && (y+b)>= 0 && (y+b)<= image.height){
                    pixel = image.getPixel(x+a, y+b);
                }
                else if((x+a)>= 0 && (x+a)<= image.width){
                    pixel = image.getPixel(x+a, y);
                }
                else if((y+b)>= 0 && (y+b)<= image.height){
                    pixel = image.getPixel(x, y+b);
                }
                else{
                    pixel = image.getPixel(x, y);
                }
                counterR = counterR + filter[filterLen+a][filterLen+b]*pixel.r;
                counterG = counterG + filter[filterLen+a][filterLen+b]*pixel.g;
                counterB = counterB + filter[filterLen+a][filterLen+b]*pixel.b;
            }
            }
            image.setPixel(x, y, {
                r: 2*(pixel.r - parseInt((1.0/(per*per))*counterR)) + pixel.r,
                g: 2*(pixel.g - parseInt((1.0/(per*per))*counterG)) + pixel.g,
                b: 2*(pixel.b - parseInt((1.0/(per*per))*counterB)) + pixel.b
            });
            counterR = 0;
            counterG = 0;
            counterB = 0;
        }
    }
}

function wavesFilter(image, percent) {
    var x, y, pixel;
    var per = parseInt(10*percent)+6;
    if(per%2 == 0){
        per++;
    }
    var mid = parseInt(per);

    var filter = new Array();

    for (var q = 0; q < per; q++){
        filter[q] = new Array();
        for (var r = 0; r < per; r++){
            if ((q+r) == (per-1)){
                 filter[q][r] = 0;
            }
            else if((q+r) > (per-1)){
                filter[q][r] = 1;
            }
            else{
                filter[q][r] = -1;
            }
        }
    }

    var filterSize = filter.length;
    var filterLen = (filterSize - 1) / 2;
    var counterR = 0;
    var counterG = 0;
    var counterB = 0;

    for (x = 0; x < image.width; x++) {
        for (y = 0; y < image.height; y++) {
            for(var a = -filterLen; a < (filterLen+1); a++) {
            for (var b = -filterLen; b < (filterLen+1); b++) {
                if((x+a)>= 0 && (x+a)<= image.width && (y+b)>= 0 && (y+b)<= image.height){
                    pixel = image.getPixel(x+a, y+b);
                }
                else if((x+a)>= 0 && (x+a)<= image.width){
                    pixel = image.getPixel(x+a, y);
                }
                else if((y+b)>= 0 && (y+b)<= image.height){
                    pixel = image.getPixel(x, y+b);
                }
                else{
                    pixel = image.getPixel(x, y);
                }
                counterR = counterR + filter[filterLen+a][filterLen+b]*pixel.r;
                counterG = counterG + filter[filterLen+a][filterLen+b]*pixel.g;
                counterB = counterB + filter[filterLen+a][filterLen+b]*pixel.b;
            }
            }
            image.setPixel(x, y, {
                r: parseInt((1.0/per)*counterR)+128,
                g: parseInt((1.0/per)*counterG)+128,
                b: parseInt((1.0/per)*counterB)+128
            });
            counterR = 0;
            counterG = 0;
            counterB = 0;
        }
    }
}


var filters = [
        {
            name: "No Filter",
            filter: noFilter
        },
        {
            name: "Inverted",
            filter: invertFilter
        },
        {
            name: "Grid",
            filter: gridFilter
        },
        {
            name: "Blur",
            filter: blurFilter
        },
        {
            name: "Sharpen",
            filter: sharpFilter
        },
        {
            name: "Motion Blur",
            filter: motionBlurFilter
        },
        {
            name: "Waves",
            filter: wavesFilter
        }
];
var selected_filter = 0;

/*
 * Page mess to apply filters
 */


function applyNextFilter() {
    selected_filter += 1;
    if (selected_filter === filters.length) {
        selected_filter = 0;
    }
    applyFilter();
}

function applyPrevFilter() {
    selected_filter -= 1;
    if (selected_filter < 0) {
        selected_filter = filters.length - 1;
    }
    applyFilter();
}

function applyFilter() {
    var f = filters[selected_filter],
        filter_percent = document.getElementById('filter_range').value / 100.0;
    document.getElementById('filter_name').innerHTML = f.name;
    window.image.reset();
    f.filter(window.image, filter_percent);
    window.image.render();
}


document.getElementById('filter_range').onchange = applyFilter;
document.getElementById('prev_filter').onclick = applyPrevFilter;
document.getElementById('next_filter').onclick = applyNextFilter;